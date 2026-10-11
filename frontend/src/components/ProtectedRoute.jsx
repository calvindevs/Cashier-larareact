import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if(!token) return <Navigate to="/login" replace />;
  if(userRole !== role) return <Navigate to="/login" replace />;
  return <Outlet />;
}
