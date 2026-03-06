import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

const ProtectedRoute = ({ children }) => {
    const [cookies] = useCookies(["token"]);
    const token = cookies?.token?.data?.token;

    if (!token) {
        // Redirect to login if unauthenticated
        return <Navigate to="/login" replace />;
    }

    // Render children or nested routes
    return children ? children : <Outlet />;
};

export default ProtectedRoute;