import { useState } from "react";
import searchIcon from "../assets/search.png"
const Header = () => {
    const [search, setSearch] = useState<string>("")
    return(
        <header className="flex w-screen flex-col border-2 fixed top-0 left-0 p-5 items-center">
            <div className="justify-between flex flex-col md:flex-row gap-4">
                <div className="flex flex-row gap-5 h-10 w-[60vw] items-center">
                    <h1 className="text-2xl font-bold">To Do App</h1>
                    <div className="flex flex-row items-center gap-2 border-2">
                        <img className="h-8 w-8 invert-100" src={searchIcon} alt="" />
                        <input type="text" value={search} 
                            onChange={event => setSearch(event.target.value)}
                            placeholder="Search Title"/>
                    </div>
                </div>
                <div className="flex flex-row gap-2 justify-center">
                    <h3>To Do</h3>
                    <h3>On Going</h3>
                    <h3>Review</h3>
                    <h3>Done</h3>
                </div>
            </div>
            <div className="w-screen">
                Welcome Grinder ! Time to work !
            </div>
        </header>
    );
}

export default Header;