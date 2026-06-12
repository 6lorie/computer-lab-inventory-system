import { Navigate } from "react-router-dom";

import { getUser } from "../services/authStorage";

export default function ProtectedRoute({ children }: any) {
  const user = getUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}