import { setActiveChat } from "@/features/chats";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MessageBubble from "./MessageBubble";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { Send } from "lucide-react";
import { sendMessage } from "@/store/messageThunk";

const ChatWindow = ({ user }) => {
  const [message, setMessage] = useState(null);
  const { activeChat } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const handleResetChatWindow = () => {
    dispatch(setActiveChat(null));
    setMessage(null);
  };

  const handleMessageSend = () => {
    if (!message) return;
    dispatch(
      sendMessage({
        conversationId: activeChat.conversationId,
        content: message,
        senderId: user.id,
      }),
    );

    setMessage(null);
  };

  return (
    <>
      <div
        className={`
              ${activeChat ? "flex" : "hidden md:flex"}
              flex-col flex-1
            `}
      >
        {activeChat ? (
          <>
            {/* Header Area */}
            <div className="flex flex-col h-full">
              <div className="p-4 border-b flex items-center gap-3 dark:border-gray-700">
                <button className="md:hidden" onClick={handleResetChatWindow}>
                  ←
                </button>
                <Avatar>
                  <AvatarImage
                    src={activeChat?.participants?.[1]?.users?.avatar_url || ""}
                  />
                  <AvatarFallback>
                    {`${activeChat?.participants?.[1]?.users?.name?.charAt(0).toUpperCase() + activeChat?.participants?.[1]?.users?.name?.charAt(1).toUpperCase()}` ||
                      "User"}
                  </AvatarFallback>
                </Avatar>
                <p>
                  {activeChat?.participants?.[1]?.users?.name || "User Name"}
                </p>
              </div>

              {/* Message Window */}
              <div className="flex-1 p-4 overflow-y-auto space-y-2 chat-window">
                <MessageBubble text="Hello 👋" />
                <MessageBubble text="Hi!" isOwn />
              </div>

              {/* Sending Messages Area */}
              <div className="p-4 border-t flex gap-2 dark:border-gray-700">
                <Input
                  placeholder="Type message..."
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button
                  variant="outline"
                  size="icon-lg"
                  aria-label="Submit"
                  disabled={!message}
                  onClick={handleMessageSend}
                >
                  <Send />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="hidden md:flex items-center justify-center w-full">
            Select chat
          </div>
        )}
      </div>
    </>
  );
};

export default ChatWindow;
