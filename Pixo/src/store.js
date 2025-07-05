import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/AuthSlicer";
import sidebarReducer from "./redux/SidebarSlicer";

export const store = configureStore({
    reducer: {
        user: authReducer,
        sidebar: sidebarReducer
    }
})