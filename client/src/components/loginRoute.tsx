import { Navigate } from "react-router-dom";
import { getUser } from "../services/authStorage";

export default function PublicRoute({ children }: any) {
    const user = getUser();

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}