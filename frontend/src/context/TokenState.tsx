import { create } from "zustand";

interface tokenState {
    state: "local" | "session",
    accessToken: string | undefined,
    refreshToken: string | undefined,
    setToken: (tokens: {accessToken:string; refreshToken:string; state?:"local" | "session" }) => void;
}

const saveToken = ({accessToken, refreshToken ,state}: {accessToken:string, refreshToken:string ,state:string}) => {
    if (state === "local"){
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
    }
    else {
        sessionStorage.setItem("access_token", accessToken);
        sessionStorage.setItem("refresh_token", refreshToken);
    }
}

const myToken = create<tokenState>()((set) => ({
    state: "session",
    accessToken: "",
    refreshToken: "",
    setToken: ({accessToken, refreshToken, state}) => {
        const newState = state ?? myToken.getState().state
        set(() => ({accessToken:accessToken, refreshToken:refreshToken, state:newState}));
        saveToken({accessToken, refreshToken, state:newState})
    }
}))

export default myToken;