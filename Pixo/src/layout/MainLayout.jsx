import AppSidebar from "@/components/AppSidebar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <main className="">
      <Header />
      <section className="min-h-[100dvh] mt-10">
        <Outlet />
      </section>
      <Footer />
    </main>
  );
};

export default MainLayout;
