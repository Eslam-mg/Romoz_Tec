import React from "react";
import { Navigate } from "react-router-dom";
import LoginRequiredCard from "../AdvertisementsComponents/LoginRequiredCard/LoginRequiredCard";

/**
* Protected path: Displays content only to registered users
* @param {string} token - Authentication token
* @param {React.ReactNode} children - Content to be protected
* @param {"card"|"redirect"} fallback - Reaction type: Display card or redirect
*/

export default function PrivateRoute({ token, children, fallback = "card" }) {
    const isLoggedIn = Boolean(token && token !== "undefined");

    if (!isLoggedIn) {
        return fallback === "redirect" ? <Navigate to="/login" replace /> : <LoginRequiredCard />;
    }

    return children;
}
