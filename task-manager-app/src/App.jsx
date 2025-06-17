import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/sonner";

const Home = lazy(() => import("@/screens/Login"));

const App = () => {
  return (
    <>
      <Suspense fallback={"loading...."}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </Suspense>
      <Toaster />
    </>
  );
};

export default App;
