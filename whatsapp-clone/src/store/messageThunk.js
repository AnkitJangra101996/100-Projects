import { supabase } from "@/services/supabase";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async ({ conversationId, content, senderId }) => {
    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          conversation_id: conversationId,
          content,
          sender_id: senderId,
        },
      ])
      .select()
      .single();
    if (error) throw error;
    return data;
  },
);
