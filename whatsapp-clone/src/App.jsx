import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Chat from "./pages/Chat";
import { useAuthInit } from "./hooks/useAuthInit";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoutes";
import Friends from "./pages/Friends";
import Settings from "./pages/Settings";
import AppLayout from "@/layout/appLayout";

const App = () => {
  useAuthInit();

  return (
    <>
      <Router>
        <Routes>
          {/* //!! Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* //!! Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Chat />} />
            <Route path="friends" element={<Friends />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </>
  );
};

export default App;
