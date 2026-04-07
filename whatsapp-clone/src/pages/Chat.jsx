import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import Status from "./Friends";
import Setting from "./Settings";

// Avatar
function Avatar({ name }) {
  return (
    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white">
      {name.charAt(0)}
    </div>
  );
}

// Message Bubble
function MessageBubble({ text, isOwn }) {
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

function Chat() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [currentTab, setCurrentTab] = useState("chat");

  const chats = [1, 2, 3, 4, 5];

  return (
    <div className="h-screen flex bg-white dark:bg-gray-900 text-black dark:text-white w-full">
      {/* MAIN CONTENT */}
      <div className="flex flex-1">
        {/* CHAT LIST */}
        {currentTab === "chat" && (
          <div
            className={`
              ${selectedChat ? "hidden md:flex" : "flex"}
              flex-col w-full md:w-1/3 border-r dark:border-gray-700
            `}
          >
            <div className="p-4 border-b dark:border-gray-700 font-semibold">
              Chats
            </div>

            <div className="p-2">
              <Input placeholder="Search..." />
            </div>

            <div className="flex-1 overflow-y-auto">
              {chats.map((chat) => (
                <div
                  key={chat}
                  onClick={() => setSelectedChat(chat)}
                  className="flex items-center gap-3 p-4 border-b dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Avatar name={`U${chat}`} />
                  <div>
                    <p>User {chat}</p>
                    <p className="text-sm text-gray-500">Last message</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CHAT WINDOW */}
        {currentTab === "chat" && (
          <div
            className={`
              ${selectedChat ? "flex" : "hidden md:flex"}
              flex-col flex-1
            `}
          >
            {selectedChat ? (
              <div className="flex flex-col h-full">
                <div className="p-4 border-b flex items-center gap-3 dark:border-gray-700">
                  <button
                    className="md:hidden"
                    onClick={() => setSelectedChat(null)}
                  >
                    ←
                  </button>
                  <Avatar name={`User ${selectedChat}`} />
                  <p>User {selectedChat}</p>
                </div>

                <div className="flex-1 p-4 overflow-y-auto space-y-2 chat-window">
                  <MessageBubble text="Hello 👋" />
                  <MessageBubble text="Hi!" isOwn />
                </div>

                <div className="p-4 border-t flex gap-2 dark:border-gray-700">
                  <Input placeholder="Type message..." />
                  <button className="bg-blue-500 text-white px-4 rounded">
                    Send
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center justify-center w-full">
                Select chat
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
