import myToken from "../context/TokenState";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
    const accessToken = myToken((state) => state.accessToken)
    return accessToken ? <Outlet /> : <Navigate to="/login" replace/>
}

export const PublicRoute = () => {
    const accessToken = myToken((state) => state.accessToken)
    return !accessToken ? <Outlet /> : <Navigate to="/tasks"/>
}