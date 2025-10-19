import { useNavigate } from "react-router-dom";

const HamburgerButton = ({text, link}: {text:string, link:string}) => {
    const navigate = useNavigate()
    return (
        <button onClick={() => navigate(`${link}`)} className="w-full h-10 border-2 border-blue-400">
            {text}
        </button>
    );
}
export default HamburgerButton;