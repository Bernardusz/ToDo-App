import { useEffect } from "react";
import myToken from "../context/TokenState";
const logOut = () => {
    myToken.getState().clearTokens();
    window.location.href = "/login"
};

const LoggingOut = () => {
    useEffect(()=>{
        logOut()
    }, [])
    return <div> Logging you out....</div>
}

export default LoggingOut;