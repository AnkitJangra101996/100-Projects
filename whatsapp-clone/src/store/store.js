import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@/features/theme";
import authReducer from "@/features/auth";
import tabsReducer from "@/features/tabs";
import friendsReducer from "@/features/friends";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    tabs: tabsReducer,
    friends: friendsReducer,
  },
});
