// PublicRoute.jsx

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return <p>Loading...</p>;

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PublicRoute;
