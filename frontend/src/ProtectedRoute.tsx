import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import GlobalContext from "./GlobalContext";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { loggedInUserId } = useContext(GlobalContext);
	if (!loggedInUserId) {
		return <Navigate to="/" replace />;
	}
	return children;
}

export default ProtectedRoute;
