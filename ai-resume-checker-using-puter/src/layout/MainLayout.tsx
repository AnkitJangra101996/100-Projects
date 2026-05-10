import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Background from "../components/Background";
import Footer from "../components/Footer";
import { useEffect } from "react";

const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('navigate');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [location.pathname])

  return (
    <>
      <Header />
      <main className="relative min-h-screen flex flex-col pt-6 lg:pt-18 overflow-hidden">
        <Background />
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
