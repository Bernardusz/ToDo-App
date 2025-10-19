import { useEffect, useState, useCallback } from "react"
import SearchIcon from "../assets/search.svg?react"
import TaskComponent from "../components/TaskComponent"
import api from "../middleware/axiosConfig"
import myToken from "../context/TokenState"

type input = {
    total_pages: number,
    count: number,
    next: string,
    previous: string,
    results: task[]
}

export type task = {
    id: number
    title:string,
    created_date:string,
    desc:string,
    is_done: "TODO" | "ONGOING" | "REVIEW" | "DONE"
}
const TasksPage = () => {
    const {accessToken} = myToken();
    const [tasks, setTasks] = useState<input>({
        total_pages: 3,
        count: 23,
        next: "placeholder",
        previous: "placeholder",
        results: [
            {id: 1, title: "Clean kitchen", created_date: "22-10-2025", desc:"Clean kitchen, it is dirty", is_done:"REVIEW"},
            {id: 2, title: "Clean kitchen", created_date: "22-10-2025", desc:"Clean kitchen, it is dirty", is_done:"REVIEW"},
            {id: 3, title: "Clean kitchen", created_date: "22-10-2025", desc:"Clean kitchen, it is dirty", is_done:"REVIEW"}
        ]
    })
    const fetchTask = useCallback(
        async () => {
            try {
                const response = await api.get("/tasks", {
                    headers: {Authorization: `Bearer ${accessToken}`}
                })
                setTasks(response.data)
            }
            catch (error){
                console.error("Error:", error)
            }
        }, [accessToken]);

    useEffect(() => {
        fetchTask()
    }, [fetchTask])

    return (
        <div className="w-screen flex flex-col h-screen items-center">
            <div className="flex flex-row gap-1 mt-10">
                <SearchIcon className="text-blue-400"/>
                <input type="text" className="ml-2 border-2 w-60" placeholder="Search..." />
            </div>
            <div className="pt-5 gap-2 flex flex-col">
                {tasks.results.map((task) => (
                    <TaskComponent id={task.id} title={task.title} created_date={task.created_date} is_done={task.is_done}/>
                ))}
            </div>
        </div>
    )
}

export default TasksPage