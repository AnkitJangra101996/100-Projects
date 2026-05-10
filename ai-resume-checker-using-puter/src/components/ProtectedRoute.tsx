import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
import puter from "@heyputer/puter.js";

const ProtectedRoute = () => {
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = puter.auth.isSignedIn();
  // console.log(isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
