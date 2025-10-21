import { useEffect, useState } from "react";
import api from "../middleware/axiosConfig";
import myToken from "../context/TokenState";
import { useParams } from "react-router-dom";
import StatusButton from "../components/StatusButton";
const EditTaskPage = () => {
    const { id } = useParams();
    const [title, setTitle] = useState<string>("")
    const [createdDate, setCreatedDate] = useState<string>("")
    const [is_done, setIs_done] = useState<"TODO" | "ONGOING" | "REVIEW" | "DONE">("TODO")
    const [desc, setDesc] = useState<string>("")
    const data = {
            id: parseInt(id ?? ""),
            title: title,
            created_date: createdDate,
            is_done: is_done,
            desc: desc
        }

    const accessToken = myToken((state) => state.accessToken);
    const fetchData = async () => {
        try{
            const response = await api.get(`/tasks/${id}`, {
                headers: {Authorization: `Bearer ${accessToken}`}
            });
            const taskData = response.data;
            setTitle(taskData.title);
            setCreatedDate(taskData.created_date);
            setIs_done(taskData.is_done);
            setDesc(taskData.desc);
        }
        catch (error){
            console.error(error)
        }
    }

    const updateTaskStatus = async ({status}:{status:"TODO" | "ONGOING" | "REVIEW" | "DONE"}) => {
        try {
            await api.patch(`/tasks/${id}` ,{
                is_done: status
            },{
                headers: {Authorization: `Bearer ${accessToken}`}
            })
            setIs_done(status)
        }
        catch (error){
            alert("Error updating!")
            console.error(error)
        }
    }

    const putTask = async () => {
        try {
            await api.put(`/tasks/${id}`, data, {
                headers: {Authorization: `Bearer ${accessToken}`}
            })
        }
        catch (error){
            alert("Edit failed!");
            console.error(error)
        }
    }
    
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="h-[80vh] w-screen flex items-center justify-center">
            <div className="border-2 border-blue-400 w-120 p-5 flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <input type="text" value={title}
                    onChange={event => setTitle(event.target.value)}
                    placeholder="Edit title..."
                    className="border-2 pl-2"/>
                    <hr className="w-full" />
                    <div className="flex flex-col gap-2">
                        <h3 className="font-[BBH_Sans_Hegarty]">Id: {id}</h3> 
                        <h3>{createdDate}</h3>
                        <div className="flex flex-row">
                            <StatusButton text="TODO" updateStatus={updateTaskStatus} isStatus={is_done}/>
                            <StatusButton text="ONGOING" updateStatus={updateTaskStatus} isStatus={is_done}/>
                            <StatusButton text="REVIEW" updateStatus={updateTaskStatus} isStatus={is_done}/>
                            <StatusButton text="DONE" updateStatus={updateTaskStatus} isStatus={is_done}/>
                        </div>
                    </div>
                    <textarea value={desc} onChange={event => setDesc(event.target.value)}
                        placeholder="Edit Description..."
                        className="border-2 h-40 pl-4">
                        
                    </textarea>
                </div>
                <button onClick={() => putTask()}
                className="w-full rounded-[0.5rem] h-8 bg-blue-400 text-white">
                    Edit
                </button>
            </div>
        </div>
    );
}
export default EditTaskPage;