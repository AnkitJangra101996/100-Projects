import { supabase } from "./supabase";

export const findConversation = async (userId, otherUserId) => {
  console.log("findConversation");
  console.log(userId, otherUserId);
  const { data, error } = await supabase
    .from("conversation_participants")
    .select("conversation_id, user_id")
    .in("user_id", [userId, otherUserId]);
  if (error) throw error;

  // group by conversation_id
  const map = {};

  data.forEach((item) => {
    if (!map[item.conversation_id]) {
      map[item.conversation_id] = [];
    }
    map[item.conversation_id].push(item.user_id);
  });

  // find conversation with both users
  for (let convId in map) {
    const users = map[convId];
    if (users.includes(userId) && users.includes(otherUserId)) {
      return convId;
    }
  }

  return null;
};

export const createConversation = async (userId, otherUserId) => {
  const { data, error } = await supabase
    .from("conversations")
    .insert([{}])
    .select()
    .single();

  if (error) throw error;

  const conversationId = data.id;

  await supabase.from("conversation_participants").insert([
    { conversation_id: conversationId, user_id: userId },
    { conversation_id: conversationId, user_id: otherUserId },
  ]);

  return conversationId;
};
