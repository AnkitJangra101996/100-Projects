import React from "react";
import Avatar from "./Avatar";
import { useDispatch } from "react-redux";
import { setActiveChat } from "@/features/chats";
import { createConversation, findConversation } from "@/services/conversations";

function SearchChatItem({ user, data }) {
  const dispatch = useDispatch();
  const getOrCreateConversation = async (userId, otherUserId) => {
    if (!userId || !otherUserId) return;
    let conversationId = await findConversation(userId, otherUserId);
    console.log(conversationId);
    if (!conversationId) {
      conversationId = await createConversation(userId, otherUserId);
    }
    if (!conversationId) throw new Error();
    dispatch(setActiveChat({ ...data, conversationId }));
  };

  return (
    <>
      <div
        onClick={() => getOrCreateConversation(user.id, data.id)}
        className="flex items-center gap-3 p-4 border-b dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Avatar name={`${data?.name}`} />
        <div>
          <p>{data?.participants?.[1]?.users?.name || data?.name || "User"}</p>
          <div className="flex justify-between">
            {
              <p className="text-sm text-gray-500">
                {data?.last_message ? data.last_message : "Start New Chat...."}
              </p>
            }
            {data?.last_message_at && <p>{data.last_message_at}</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchChatItem;
