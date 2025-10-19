
import type { task } from "../pages/Tasks"
import { useNavigate } from "react-router-dom";
type PartialTask = Partial<task>

const TaskComponent = ({id, title, is_done, created_date}: PartialTask) => {
    const navigate = useNavigate();
    return (
        <div className="w-full h-fit flex flex-col border-2 p-5 rounded-2xl gap-2" onClick={() => navigate(`/tasks/${id}`)}>
            <div className="w-80 text-left gap-1 flex flex-col">
                <h1 className="font-[BBH_Sans_Hegarty]">{title} - {id}</h1>
                <hr className="w-full"/>
            </div>
            <div className="flex flex-row justify-between">
                <h3>{created_date}</h3>
                <h3>{is_done}</h3>
            </div>
        </div>
    );
}

export default TaskComponent;