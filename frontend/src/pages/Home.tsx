import { useNavigate } from "react-router-dom";
const HomePage = () => {
    const navigate = useNavigate()
    return (
        <div className="w-screen flex flex-col h-screen items-center justify-center gap-5">
            <h1 className="text-6xl font-[BBH_Sans_Hegarty]">Welcome!</h1>
            <div className="max-w-110">
                <p className="font-[Nunito]">In this app you can <b>Create Read Update</b> and <b>Delete</b> Tasks.</p>
                <p className="font-[Nunito]">This was created to show case my skill in <br/> <b>Tailwind CSS, React, Django and Rest API</b></p>
            </div>
            <div className="flex flex-row gap-6">
                <a href="https://github.com/Bernardusz/ToDo-App" target="_blank" rel="noopener noreferrer">
                    <button
                        className="rounded-3xl border-2 border-blue-500 bg-blue-400 text-white w-35 h-12
                                    hover:text-blue-400 hover:bg-white">
                        Source Code
                    </button>
                </a>
                
                <button onClick={() => navigate("/signup")}
                    className="rounded-3xl border-2 border-blue-500 bg-blue-400 text-white w-35 h-12
                                hover:text-blue-400 hover:bg-white">
                    Try it out !
                </button>
            </div>
        </div>
    );
}

export default HomePage;