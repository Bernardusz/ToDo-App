import { useState } from "react";
import api from "../middleware/axiosConfig";
import myToken from "../context/TokenState";
import { useNavigate } from "react-router-dom";
const AddTaskPage = () => {
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("")
    const navigate = useNavigate();
    const accessToken = myToken((state) => state.accessToken);
    const createTask = async () => {
        try{
            await api.post("/tasks/", {
                title: title,
                desc: desc,
            }, {
                headers: {Authorization: `Bearer ${accessToken}`}
            })
        }
        catch (error){
            alert("Unable to create!")
            console.error(error)
        }
    }

    return (
        <div className="w-screen flex flex-col h-screen items-center justify-center">
            <div className="border-2 border-blue-400 w-100 p-5 flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <input type="text" value={title} 
                    onChange={event => setTitle(event.target.value)} 
                    placeholder="Inpuut the title"
                    className="border-2 border-blue-400 pl-4"/>
                    <textarea value={desc} 
                    onChange={event => setDesc(event.target.value)} 
                    placeholder="Input the description"
                    className="border-2 border-blue-400 pl-4"></textarea>
                </div>
                <button onClick={() => {createTask(); navigate("/tasks")}} 
                className="w-full rounded-[0.5rem] h-8 bg-blue-400 text-white">
                    Create Task
                </button>
            </div>
        </div>
    );
};

export default AddTaskPage;