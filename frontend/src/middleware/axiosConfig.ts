import axios from "axios";
import myToken from "../context/TokenState";

export const waitForInitialized = () => new Promise<void>((resolve) => {
        const {isInitialized} = myToken.getState();
        if (isInitialized) return resolve();

        const unsubscribe = myToken.subscribe(
            (state) => {
                if (state.isInitialized){
                    unsubscribe();
                    resolve();
                }
            }
        )
    })


const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 10000
});

api.interceptors.request.use(async (config) => {
    // await waitForInitialized()
    const { accessToken} = myToken.getState();
    if (accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            await waitForInitialized();
            const { refreshToken, state, setToken } = myToken.getState()
            try {
                console.log("Refresh: ",refreshToken)
                const response = await axios.post("http://localhost:8000/api/token/refresh/", {refresh: refreshToken});
                setToken({
                    accessToken: response.data.access,
                    refreshToken: response.data.refresh,
                    state
                });
                originalRequest.headers.Authorization = `Bearer ${response.data.access}`
                return axios(originalRequest);
            }
            catch (_err){
                myToken.getState().clearTokens();
                window.location.href = "/login"
                return Promise.reject(_err)
            }
        }
        return Promise.reject(error)
    }
)

export default api;