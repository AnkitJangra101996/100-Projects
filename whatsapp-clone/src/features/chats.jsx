import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    activeChat: null,
    loading: false,
    error: null,
  },
  reducers: {
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
    sendingMessage: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setActiveChat } = chatSlice.actions;

export default chatSlice.reducer;
