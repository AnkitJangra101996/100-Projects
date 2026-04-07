import { motion, AnimatePresence } from "framer-motion";
import { TABS } from "@/data/menu";
import { NavLink } from "react-router-dom";

// Avatar
export function Avatar({ name }) {
  return (
    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white">
      {name.charAt(0)}
    </div>
  );
}

// Message Bubble
export function MessageBubble({ text, isOwn }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-2 rounded max-w-xs ${
        isOwn
          ? "bg-blue-500 text-white ml-auto"
          : "bg-gray-200 dark:bg-gray-700"
      }`}
    >
      {text}
    </motion.div>
  );
}

export const renderTabs = (type = "sidebar") =>
  TABS.map((tab) => {
    if (type === "sidebar") {
      return (
        <motion.button
          key={tab.key}
          whileTap={{ scale: 0.9 }}
          className={`rounded w-full text-start`}
        >
          <NavLink
            to={tab.key}
            className={({ isActive }) =>
              isActive
                ? "bg-blue-500 text-white p-2 rounded flex gap-2 items-center"
                : "p-2 rounded flex flex gap-2 items-center"
            }
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </NavLink>
        </motion.button>
      );
    }

    // bottom nav
    return (
      <motion.button
        key={tab.key}
        whileTap={{ scale: 0.9 }}
        className={`rounded w-full text-center`}
      >
        <NavLink
          to={tab.key}
          className={({ isActive }) =>
            isActive ? "bg-blue-500 text-white flex flex-col" : "flex flex-col"
          }
        >
          <span>{tab.icon}</span>
          <span>{tab.label}</span>
        </NavLink>
      </motion.button>
    );
  });
