import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/sonner";

const Login = lazy(() => import("@/screens/Login"));
const Register = lazy(() => import("@/screens/Register"));
const Dashboard = lazy(() => import("@/screens/Dashboard"));

const App = () => {
  return (
    <>
      <Suspense fallback={"loading...."}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
      <Toaster richColors position="bottom-right" expand={false} />
    </>
  );
};

export default App;
