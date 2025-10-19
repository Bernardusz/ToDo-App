import hamburgerState from "../context/HamburgerState";
import myToken from "../context/TokenState";
import HamburgerButton from "./hamburgerButton";


const HamburgerMenu = () => {
    const { isOpen }= hamburgerState();
    const { accessToken } = myToken();
    return (
        <div className={`border-blue-300 w-screen overflow-hidden transition duration-500 ease-in-out
                        ${isOpen ? "h-fit" : "h-0"} mt-20`}>
            {accessToken ? 
            <div>
                <HamburgerButton text="ToDo" link="/tasks/?status=TODO"/>
                <HamburgerButton text="OnGoing" link="/tasks/?status=ONGOING" />
                <HamburgerButton text="Review" link="/tasks/?status=REVIEW" />
                <HamburgerButton text="Done" link="/tasks/?status=DONE" />
            </div> : 
            <div>
                <HamburgerButton text="Login" link="/login" />
                <HamburgerButton text="Sign Up" link="/signup" />    
            </div>}
        </div>
    );
}

export default HamburgerMenu;