import { supabase } from "./supabase";

export const fetchRequests = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("friend_requests")
      .select("*, sender:sender_id(name, avatar_url)")
      .eq("receiver_id", userId)
      .eq("status", "pending");

    if (error) throw error;
    return data;
  } catch (error) {
    console.log("error in fetch request [services/friends.js]", error?.message);
  }
};

export const sendRequest = async (userId, targetId) => {
  try {
    const { error } = await supabase.from("friend_requests").insert([
      {
        sender_id: userId,
        receiver_id: targetId,
        status: "pending",
      },
    ]);

    if (error) throw error;
  } catch (error) {
    console.log("error in fetch request [services/friends.js]", error?.message);
  }
};

export const acceptRequest = async (request) => {
  try {
    const { id, sender_id, receiver_id } = request;

    // 1. update request
    await supabase
      .from("friend_requests")
      .update({ status: "accepted" })
      .eq("id", id);

    // 2. create friendship
    await supabase.from("friendships").insert([
      {
        user1_id: sender_id,
        user2_id: receiver_id,
      },
    ]);
  } catch (error) {
    console.log("error in fetch request [services/friends.js]", error?.message);
  }
};

export const rejectRequest = async (id) => {
  try {
    await supabase
      .from("friend_requests")
      .update({ status: "rejected" })
      .eq("id", id);
  } catch (error) {
    console.log("error in fetch request [services/friends.js]", error?.message);
  }
};
