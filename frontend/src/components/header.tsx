import LogoApp from "../assets/To-Do-App.svg?react"
import MenuLogo from "../assets/menu.svg?react"
import hamburgerState from "../context/HamburgerState";
const Header = () => {
    const {toggleIsOpen} = hamburgerState()
    return(
        <header className="flex w-screen flex-row border-2 fixed h-20 top-0 left-0 p-7 items-center justify-between">
            <LogoApp className="max-w-30"/>
            <MenuLogo onClick={() => toggleIsOpen()}/>
        </header>
    );
}

export default Header;