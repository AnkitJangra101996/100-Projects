import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { supabase } from "@/services/supabase";
import { useSelector } from "react-redux";
import ChatListItem from "@/components/ChatListItem";
import ChatWindow from "@/components/ChatWindow";
import { useGetPrevChatsQuery } from "@/api/query";
import SearchChatItem from "@/components/SearchChatItem";

function Chat() {
  const [searchResult, setSearchResult] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { activeChat } = useSelector((state) => state.chat);

  const { data: prevChatsData, loading: prevChatsLoading } =
    useGetPrevChatsQuery();
  console.log(prevChatsData);
  const handleSearch = async ({ target }) => {
    if (!target.value) {
      setSearchResult([]);
      return;
    }
    try {
      const { data } = await supabase
        .from("users")
        .select("*")
        .ilike("name", `%${target.value}%`)
        .neq("id", user.id)
        .limit(5)
        .order("created_at", { ascending: false });
      setSearchResult(data);
    } catch (error) {
      throw new Error(error?.message);
    }
  };

  return (
    <div className="h-screen flex bg-white dark:bg-gray-900 text-black dark:text-white w-full">
      {/* MAIN CONTENT */}

      <div className="flex flex-1">
        {/* CHAT LIST */}
        <div
          className={`
              ${activeChat ? "hidden md:flex" : "flex"}
              flex-col w-full md:w-1/3 border-r dark:border-gray-700
            `}
        >
          <div className="p-4 border-b dark:border-gray-700 font-semibold">
            Chats
          </div>

          <div className="p-2 pb-2">
            <Input
              placeholder="Search by email or name..."
              onChange={handleSearch}
            />
          </div>
          <hr />
          {/* Previous Chats */}
          <div className={searchResult.length ? "hidden" : "block"}>
            {prevChatsLoading ? (
              <h1 className="flex justify-center text-center mt-2 text-lg md:text-xl font-bold">
                Loading Previous Chats....
              </h1>
            ) : prevChatsData?.length === 0 ? (
              <h1 className="flex justify-center text-center mt-2 text-lg md:text-xl font-bold">
                No Previous Chats....
              </h1>
            ) : (
              <div>
                <h1 className="flex justify-center text-center my-2 text-lg md:text-xl font-bold">
                  Your Chats....
                </h1>
                <hr />
                {prevChatsData?.map((chat, index) => (
                  <ChatListItem user={user} data={chat} key={index} />
                ))}
              </div>
            )}
          </div>

          {/* Start New Chats */}
          {searchResult.map((chat, index) => (
            <SearchChatItem user={user} data={chat} key={index} />
          ))}
        </div>
        {/* CHAT WINDOW */}
        <ChatWindow user={user} />
      </div>
    </div>
  );
}

export default Chat;
