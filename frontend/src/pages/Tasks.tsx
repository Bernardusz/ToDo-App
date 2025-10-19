import { useState } from "react"
import SearchIcon from "../assets/search.svg?react"
type task = {
    id: number
    title:string,
    created_date:string,
    desc:string,
    is_done: "TODO" | "ONGOING" | "REVIEW" | "DONE"
}
const TasksPage = () => {
    const [tasks, setTasks] = useState<task[]>([
        {id:1,title: "Clear the kitchen", created_date:"22-10-2014", desc: "the kitchen is dirty, need to clean", is_done:"TODO"},
        {id:2,title: "Clear the kitchen", created_date:"22-10-2014", desc: "the kitchen is dirty, need to clean", is_done:"TODO"},
        {id: 3,title: "Clear the kitchen", created_date:"22-10-2014", desc: "the kitchen is dirty, need to clean", is_done:"TODO"},
        {id:4,title: "Clear the kitchen", created_date:"22-10-2014", desc: "the kitchen is dirty, need to clean", is_done:"TODO"},
    ])
    return (
        <div className="w-screen flex flex-col h-screen items-center justify-center gap-5">
            <div>
                <SearchIcon className="text-blue-400"/>
                <input type="text" placeholder="Search..." />
            </div>
        </div>
    )
}

export default TasksPage