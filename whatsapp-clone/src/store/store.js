import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@/features/theme";
import authReducer from "@/features/auth";
import tabsReducer from "@/features/tabs";
import friendsReducer from "@/features/friends";
import chatReducer from "@/features/chats";
import messagesReducer from "@/features/messages";
import conversationsReducer from "@/features/conversations";
import { chatApi } from "@/api/query";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    tabs: tabsReducer,
    friends: friendsReducer,
    chat: chatReducer,
    messages: messagesReducer,
    conversations: conversationsReducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatApi.middleware),
});
