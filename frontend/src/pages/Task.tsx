import type { task } from "./Tasks"

const TaskPage = ({id, title, desc, is_done, created_date}:task) => {
    return(
        <div className="w-screen flex flex-col h-screen items-center justify-center">
            <div className="bg-white w-[80vw]">
                <div>
                    <h3>{title}</h3>
                    <hr  className="w-full"/>
                </div>
            </div>
        </div>
    );
}