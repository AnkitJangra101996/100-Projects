import { sendMessage } from "@/store/messageThunk";
import { createSlice } from "@reduxjs/toolkit";
import { messageReceived } from "@/features/messages";

export const conversationSlice = createSlice({
  name: "conversations",
  initialState: {
    list: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    const updateConv = (state, msg) => {
      const conv = state.list.find((c) => c.id === msg.conversation_id);
      if (conv) {
        conv.last_message = msg.content;
        conv.last_message_at = msg.created_at;
      }
      state.list.sort(
        (a, b) => new Date(b.last_message_at) - new Date(a.last_message_at),
      );
    };
    builder
      .addCase(sendMessage.fulfilled, (state, action) => {
        updateConv(state, action.payload);
      })
      .addCase(messageReceived, (state, action) => {
        updateConv(state, action.payload);
      });
  },
});

export default conversationSlice.reducer;
