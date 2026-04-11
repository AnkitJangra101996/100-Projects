import { motion, AnimatePresence } from "framer-motion";

const MessageBubble = ({ text, isOwn }) => {
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
};

export default MessageBubble;
