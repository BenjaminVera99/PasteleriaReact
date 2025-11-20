import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


export default function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = jwtDecode(token);
    const role = decoded.role;

    // Si requiere rol y el usuario no lo tiene → bloquear
    if (requiredRole && role !== requiredRole) {
      return <Navigate to="/" replace />;
    }

  } catch {
    return <Navigate to="/login" replace />;
  }

  return children;
}
