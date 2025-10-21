import { useState } from "react";
import api from "../middleware/axiosConfig";
import myToken from "../context/TokenState";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const setToken = myToken((state) => state.setToken);
    const navigate = useNavigate();
    const handleLogin  = async () => {
        try{
            const response = await api.post("/token/", {username, password});
            setToken({
                    accessToken: response.data.access,
                    refreshToken: response.data.refresh,
                    state: rememberMe ? "local" : "session"
                })
            navigate("/tasks")
            console.log(response.data.access)
        }
        catch {
            alert("Login failed!");
        }
    }

    return (
        <div className="h-[80vh] w-screen flex items-center justify-center">
            <div className="border-2 border-blue-400 w-100 p-5">
                <div className="flex flex-col items-start gap-2 font-[BBH_Sans_Hegarty] text-2xl">
                    <h3>Welcome Back!</h3>
                    <hr className="w-90" />
                </div>
                <div className="flex flex-col p-5 gap-2">
                    <input type="text" placeholder="Input your Username" value={username} onChange={event=> setUsername(event.target.value)} 
                    className="border-2 border-blue-400 pl-5 rounded-tl-md font-[Nuninto]"/>
                    <input type="text" placeholder="Input your Password" value={password} onChange={event=> setPassword(event.target.value)}
                    className="border-2 border-blue-400 pl-5 rounded-br-md font-[Nuninto]"/>
                    <div className="flex flex-row gap-3">
                        <input type="checkbox" onClick={() => {
                            setRememberMe(!rememberMe)

                        }}/>
                        <h5>Remember Me</h5>
                    </div>
                </div>
                <button className="w-full rounded-[0.5rem] h-8 bg-blue-400 text-white" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default LoginPage