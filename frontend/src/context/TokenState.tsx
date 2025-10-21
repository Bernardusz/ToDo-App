import { create } from "zustand";

interface tokenState {
    state: "local" | "session",
    accessToken: string | undefined,
    refreshToken: string | undefined,
    isInitialized: boolean,
    setToken: (tokens: {accessToken:string; refreshToken:string; state?:"local" | "session" }) => void;
    initializeToken: () => void;
    clearTokens: () => void;
}

const saveToken = ({accessToken, refreshToken ,state}: {accessToken:string, refreshToken:string ,state:string}) => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    
    // Save to the determined location
    const storage = state === "local" ? localStorage : sessionStorage;
    storage.setItem("access_token", accessToken);
    storage.setItem("refresh_token", refreshToken);
}

const myToken = create<tokenState>()((set) => ({
    state: "session",
    accessToken: undefined,
    refreshToken: undefined,
    isInitialized: false,

    setToken: ({accessToken, refreshToken, state}) => {
        const newState = state ?? myToken.getState().state
        set(() => ({accessToken:accessToken, refreshToken:refreshToken, state:newState, isInitialized:true}));
        saveToken({accessToken, refreshToken, state:newState})
        
    },
    initializeToken: () =>{
        let storedAccess = localStorage.getItem("access_token");
        let storedRefresh = localStorage.getItem("refresh_token");
        let storageState: "local" | "session" = "local";

        // 2. If not found in Local Storage, check Session Storage
        if (!storedAccess || !storedRefresh) {
            storedAccess = sessionStorage.getItem("access_token");
            storedRefresh = sessionStorage.getItem("refresh_token");
            storageState = "session";
        }
        if (storedAccess && storedRefresh){
            set({
                accessToken: storedAccess,
                refreshToken: storedRefresh,
                isInitialized: true
            })
        }
        else {
            set({ isInitialized: true });
        }
    },
    clearTokens: () =>{
        localStorage.clear();
        sessionStorage.clear();
        set({
            accessToken: undefined,
            refreshToken: undefined,
            state: "session",
            isInitialized: true
        })
    }
}))

export default myToken;