import type { task } from "./Tasks"
import StatusButton from "../components/StatusButton";
import api from "../middleware/axiosConfig";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import myToken from "../context/TokenState";
import { useNavigate } from "react-router-dom";

const TaskPage = () => {
    const { id } = useParams();
    const accessToken = myToken((state) => state.accessToken);
    const [status, setStatus] = useState<"TODO" | "ONGOING" | "REVIEW" | "DONE">("TODO");
    const navigate = useNavigate();
    const [data, setData] = useState<task>({
        id: parseInt(id ?? ""),
        title: "",
        created_date: "",
        is_done: status,
        desc: ""
    })
    const fetchData = useCallback(
        async () => {
        try{
            const response = api.get(`/tasks/${id}/`, {
                headers: {Authorization: `Bearer ${accessToken}`}
            })
            setData((await response).data)
        }
        catch (error){
            console.error(error)
        }
    }, [accessToken, id])
    const updateTaskStatus = async ({status}:{status:"TODO" | "ONGOING" | "REVIEW" | "DONE"}) => {
        try {
            await api.patch(`/tasks/${id}/` ,{
                is_done: status
            },{
                headers: {Authorization: `Bearer ${accessToken}`}
            })
            setStatus(status)
        }
        catch (error){
            alert("Error updating!")
            console.error(error)
        }
    }
    const deleteTask = async () => {
        try{
            await api.delete(`/tasks/${id}/`, {
                headers: {Authorization: `Bearer ${accessToken}`}
            })
            navigate("/tasks")
        }
        catch (error){
            console.error(error)
        }
    }
    useEffect(()=>{
        if (accessToken) fetchData()
    }, [accessToken, fetchData])
    return(
        <div className="w-screen flex flex-col h-screen gap-2 items-center justify-center">
            <div className="bg-white w-[80vw] p-10 gap-5 rounded-2xl border-blue-500 border-2 h-100 flex flex-col lg:flex-col">
                <div className="flex flex-col gap-3">
                    <div>
                        <h3 className="font-[BBH_Sans_Hegarty] text-5xl">{data.title}</h3>
                        <hr  className="w-full"/>
                    </div>
                    <div className="flex flex-col">
                        <ul className="list-item">
                            <li>
                                Id: {id}
                            </li>
                            <li>
                                Created date: {data.created_date}
                            </li>
                            
                        </ul>
                        <div className="flex flex-row max-w-full">
                                <StatusButton text="TODO" updateStatus={updateTaskStatus} isStatus={status}/>
                                <StatusButton text="ONGOING" updateStatus={updateTaskStatus} isStatus={status}/>
                                <StatusButton text="REVIEW" updateStatus={updateTaskStatus} isStatus={status}/>
                                <StatusButton text="DONE" updateStatus={updateTaskStatus} isStatus={status}/>
                        </div>
                    </div>
                </div>
                <div className="border-2 border-blue-500 rounded-2xl h-full">
                    <p>
                        {data.desc}
                    </p>
                </div>
            </div>
            <div className="flex flex-row gap-10">
                <button onClick={deleteTask}
                className="bg-white w-20 border-2 border-blue-500 rounded-xl
                hover:scale-110 hover:bg-blue-400 hover:text-white">
                    Delete</button>
                <button 
                className="bg-white w-20 border-2 border-blue-500 rounded-xl
                hover:scale-110 hover:bg-blue-400 hover:text-white"
                onClick={() => navigate(`/tasks/edit/${id}`)}>Update</button>
            </div>
        </div>
    );
};

export default TaskPage;