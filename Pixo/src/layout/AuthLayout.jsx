import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <section
      className="flex justify-center items-center min-h-[100dvh] min-w-[100dwh]"
      style={{
        backgroundImage: "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)",
      }}
    >
      <Outlet />
    </section>
  );
};

export default AuthLayout;
