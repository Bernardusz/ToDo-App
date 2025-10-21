import myToken from "../context/TokenState";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
export const ProtectedRoute = () => {
    const {isInitialized} = myToken.getState()
    const accessToken = myToken((state) => state.accessToken)
    if (!isInitialized) return <div>Loading...</div>
    return accessToken ? <Outlet /> : <Navigate to="/login" replace/>
}

export const PublicRoute = () => {
    const accessToken = myToken((state) => state.accessToken)
    return !accessToken ? <Outlet /> : <Navigate to="/tasks"/>
}