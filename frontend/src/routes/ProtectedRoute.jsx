import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function ProtectedRoute({ children, role }) {

  const { user, loading } = useAuth();

  // ⏳ wait for Firebase to resolve auth state
  if (loading) return null;

  // ❌ not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // ❌ role mismatch (if roles are used later)
  if (role && user.role && user.role !== role) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

export default ProtectedRoute;
