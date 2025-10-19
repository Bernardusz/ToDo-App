import { useState } from "react";
import api from "../middleware/axiosConfig";
import { useNavigate } from "react-router-dom";
const SignUpPage = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("")
    const handleSignUp  = async () => {
        try{
            await api.post("/user/create/", {username, email, password});
            navigate("/login");
        }
        catch {
            alert("Sign up failed!")
        }
    }

    return (
        <div className="h-[80vh] w-screen flex items-center justify-center">
            <div className="border-2 border-blue-400 w-100 p-5">
                <div className="flex flex-col items-start gap-2 font-[BBH_Sans_Hegarty] text-2xl">
                    <h3>Welcome</h3>
                    <hr className="w-90" />
                </div>
                <div className="flex flex-col p-5 gap-2">
                    <input type="text" placeholder="Input your Username" value={username} onChange={event=> setUsername(event.target.value)} 
                    className="border-2 border-blue-400 pl-5 rounded-tl-md font-[Nuninto]"/>
                    <input type="email" placeholder="Input your Email" value={email} onChange={event=> setEmail(event.target.value)} 
                    className="border-2 border-blue-400 pl-5 rounded-tl-md font-[Nuninto]"/>
                    <input type="text" placeholder="Input your Password" value={password} onChange={event=> setPassword(event.target.value)}
                    className="border-2 border-blue-400 pl-5 rounded-br-md font-[Nuninto]"/>
                </div>
                <button className="w-full rounded-[0.5rem] h-8 bg-blue-400 text-white" onClick={handleSignUp}>Login</button>
            </div>
        </div>
    );
}

export default SignUpPage