import { motion, AnimatePresence } from "framer-motion";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { TABS } from "@/data/menu";
import { renderTabs } from "@/helpers/layout";

function AppLayout() {
  return (
    <div className="h-screen flex bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* SIDEBAR (Tablet/Desktop) */}
      <div className="hidden md:flex flex-col w-40 border-r dark:border-gray-700 items-center py-4 gap-4 justify-start p-2">
        {renderTabs("sidebar")}
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-1">
        <Outlet />
      </div>

      {/* BOTTOM NAV (Mobile Only) */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden border-t bg-white dark:bg-gray-900 dark:border-gray-700 flex justify-around">
        {renderTabs("bottom")}
      </div>
    </div>
  );
}

export default AppLayout;
