import { RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { router } from "./router";
import { Toaster } from "sonner";
import { useSupabaseAuth } from "./hooks/useSupabaseAuth";

//! Lazy imports
const Register = lazy(() => import("@/pages/Register"));

function App() {
  useSupabaseAuth();

  return (
    <>
      <Suspense fallback="Loading....">
        <RouterProvider router={router} />
      </Suspense>
      <Toaster visibleToasts={1} richColors />
    </>
  );
}

export default App;
