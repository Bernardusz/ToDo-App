import axios from "axios";
import myToken from "../context/TokenState";
const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 10000
});

api.interceptors.request.use((config) => {
    const { accessToken } = myToken.getState();
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
            const { refreshToken, state, setToken } = myToken.getState()
            try {
                const response = await axios.post("http://localhost:8000/api/token/refresh", {refreshToken});
                setToken({
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken,
                    state
                });
                originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`   
                return axios(originalRequest);
            }
            catch (_err){
                window.location.href = "/login"
                return Promise.reject(_err)
            }
        }
        return Promise.reject(error)
    }
)

export default api;