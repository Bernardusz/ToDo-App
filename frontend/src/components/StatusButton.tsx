const StatusButton = ({updateStatus, isStatus, text}: 
    {updateStatus:({status}:{status:"TODO" | "ONGOING" | "REVIEW" | "DONE"}) => void,
    isStatus:string, text:"TODO" | "ONGOING" | "REVIEW" | "DONE"}) => {
    return (
        <div className={`w-40 h-10 border-2 hover:scale-125 flex items-center justify-center text-2xl
        ${isStatus === text.toUpperCase() ? "bg-blue-600 hover:bg-white border-blue-600 text-white hover:text-blue-600":
                     "bg-white hover:bg-blue-400 border-blue-400 hover:text-white"
        }`} onClick={() => updateStatus({status:text})}>
            {text}
        </div>
    );
}

export default StatusButton;