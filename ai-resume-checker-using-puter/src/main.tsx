import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AuthProvider } from "./context/auth";
import { PricingModalProvider } from "./context/pricingModal";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <PricingModalProvider>
        <RouterProvider router={router} />
      </PricingModalProvider>
    </AuthProvider>
  </StrictMode>
);
