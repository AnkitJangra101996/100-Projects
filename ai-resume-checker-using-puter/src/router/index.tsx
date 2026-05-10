import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import GuestRoute from "../components/GuestRoute";
import MainLayout from "../layout/MainLayout";
import ResumeUpload from "../pages/ResumeUpload";
import ResumeDetails from "../pages/ResumeDetails";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        element: <GuestRoute />,
        children: [
          {
            path: "/",
            element: <Login />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/home",
            element: <Home />,
          },
          {
            path: "/upload-resume",
            element: <ResumeUpload />,
          },
          {
            path: "/resume/:id",
            element: <ResumeDetails />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);