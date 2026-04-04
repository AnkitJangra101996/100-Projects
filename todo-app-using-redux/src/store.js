import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./features/todo";
import modalSlice from "./features/modal";

export const store = configureStore({
  reducer: {
    todo: todoSlice,
    modal: modalSlice,
  },
});
