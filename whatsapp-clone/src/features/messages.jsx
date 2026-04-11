import { sendMessage } from "@/store/messageThunk";
import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "messages",
  initialState: {
    byConversationId: {},
    sending: false,
    error: null,
  },
  reducers: {
    messageReceived: (state, action) => {
      const msg = action.payload;
      const convId = msg.conversation_id;

      if (!state.byConversationId[convId]) {
        state.byConversationId[convId] = [];
      }

      const exists = state.byConversationId[convId].some(
        (cId) => cId.id === msg.id,
      );

      if (!exists) {
        state.byConversationId[convId].push(msg);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendMessage.pending, (state) => {
      state.sending = true;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      const msg = action.payload;
      const convId = msg.conversation_id;

      if (!state.byConversationId[convId]) {
        state.byConversationId[convId] = [];
      }

      const exists = state.byConversationId[convId].some(
        (m) => m.id === msg.id,
      );

      if (!exists) {
        state.byConversationId[convId].push(msg);
      }

      state.sending = false;
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.sending = false;
      state.error = action.error.message;
    });
  },
});

export const { messageReceived } = messageSlice.actions;

export default messageSlice.reducer;
