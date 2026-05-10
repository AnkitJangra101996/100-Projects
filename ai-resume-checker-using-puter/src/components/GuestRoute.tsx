import puter from "@heyputer/puter.js";
import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

const GuestRoute = () => {
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = puter.auth.isSignedIn();
  return !isAuthenticated ? <Outlet /> : <Navigate to="/home" replace />;
};

export default GuestRoute;
