import type { task } from "./Tasks"
import StatusButton from "../components/StatusButton";
import api from "../middleware/axiosConfig";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import myToken from "../context/TokenState";
const TaskPage = () => {
    const { id } = useParams();
    const {accessToken} = myToken();
    const [status, setStatus] = useState<"TODO" | "ONGOING" | "REVIEW" | "DONE">("TODO");
    const [data, setData] = useState<task>({
        id: parseInt(id ?? ""),
        title: "",
        created_date: "",
        is_done: status,
        desc: ""
    })
    const fetchData = async () => {
        try{
            const response = api.get(`/tasks/${id}`, {
                headers: {Authorization: `Bearer ${accessToken}`}
            })
            setData((await response).data)
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
            setStatus(status)
        }
        catch (error){
            alert("Error updating!")
            console.error(error)
        }
    }
    useEffect(()=>{
        fetchData()
    })
    return(
        <div className="w-screen flex flex-col h-screen items-center justify-center">
            <div className="bg-white w-[80vw] h-100 flex flex-col lg:flex-col">
                <div>
                    <div>
                        <h3>{data.title}</h3>
                        <hr  className="w-full"/>
                    </div>
                    <div>
                        <ul className="list-item">
                            <li>
                                Id: {id}
                            </li>
                            <li>
                                Created date: {data.created_date}
                            </li>
                            <div className="flex flex-row">
                                <StatusButton text="TODO" updateStatus={updateTaskStatus} isStatus={status}/>
                                <StatusButton text="ONGOING" updateStatus={updateTaskStatus} isStatus={status}/>
                                <StatusButton text="REVIEW" updateStatus={updateTaskStatus} isStatus={status}/>
                                <StatusButton text="DONE" updateStatus={updateTaskStatus} isStatus={status}/>
                            </div>
                        </ul>
                    </div>
                </div>
                <div>
                    <p>
                        {data.desc}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TaskPage;