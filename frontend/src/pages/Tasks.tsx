import { useEffect, useState, useCallback } from "react"
import SearchIcon from "../assets/search.svg?react"
import TaskComponent from "../components/TaskComponent"
import api from "../middleware/axiosConfig"
import myToken from "../context/TokenState"
import { useNavigate } from "react-router-dom"
import { useSearchParams } from "react-router-dom"
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
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const accessToken = myToken((state) => state.accessToken);
    const page = searchParams.get("page");
    const statusTask = searchParams.get("status");
    const pageTask = searchParams.get("page");
    const searchTask = searchParams.get("search");
    const [searchValue, setSearchValue] = useState<string>("");
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
                const response = await api.get(`/tasks?page=${page || 1}`, {
                    headers: {Authorization: `Bearer ${accessToken}`},
                    params: {
                        status: statusTask ?? "",
                        page: pageTask ?? "",
                        search: searchTask ?? ""
                }
                })
                setTasks(response.data)

            }
            catch (error){
                console.error("Error:", error)
            }
        }, [statusTask, pageTask ,accessToken, page, searchTask]);

    useEffect(() => {
        if (accessToken) fetchTask();
    }, [fetchTask, accessToken])



    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= tasks.total_pages) {
            const currentStatus = statusTask;
            const currentSearch = searchValue;
            navigate(`/tasks?page=${newPage}&status=${currentStatus || ""}&search=${currentSearch || ""}`);
        }
    };

    return (
        <div className="w-screen flex flex-col h-screen items-center">
            <div className="flex flex-row gap-1 mt-10">
                <SearchIcon className="text-blue-400" onClick={() => handlePageChange(1)}/>
                <input type="text" className="ml-2 border-2 w-60" placeholder="Search..." value={searchValue}  onChange={event => setSearchValue(event.target.value)}/>
            </div>
            <div className="pt-5 gap-2 flex flex-col">
                {tasks.results.map((task) => (
                    <TaskComponent key={task.id} id={task.id} title={task.title} created_date={task.created_date} is_done={task.is_done}/>
                ))}
            </div>
            <div className="flex gap-2 mt-4 fixed right-8 bottom-8 flex-row">
                <button 
                    onClick={() => handlePageChange(1)}
                    disabled={!tasks.previous}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    First
                </button>
                <button 
                    onClick={() => handlePageChange(Number(page || 1) - 1)}
                    disabled={!tasks.previous}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="px-3 py-1">
                    Page {page || 1} of {tasks.total_pages}
                </span>
                <button 
                    onClick={() => handlePageChange(Number(page || 1) + 1)}
                    disabled={!tasks.next}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Next
                </button>
                <button 
                    onClick={() => handlePageChange(tasks.total_pages)}
                    disabled={!tasks.next}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Last
                </button>
            </div>
            <button onClick={() => navigate("/tasks/creation")} 
            className="fixed bottom-8 left-12 rounded-2xl bg-blue-600 w-12 h-12">
                +
            </button>
        </div>
    )
}

export default TasksPage