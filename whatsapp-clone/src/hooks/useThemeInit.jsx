import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuthInit = () => {
  const { darkMode } = useSelector((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);
};
