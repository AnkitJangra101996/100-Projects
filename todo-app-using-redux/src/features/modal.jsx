import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  type: null,
  title: "",
  body: "",
  onConfirm: null,
  editableTodo: {},
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { type, title, body, onConfirm, editableTodo } = action.payload;
      state.isOpen = true;
      state.type = type;
      state.title = title;
      state.body = body;
      state.onConfirm = onConfirm;
      state.editableTodo = editableTodo || {};
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.title = "";
      state.body = "";
      state.onConfirm = null;
      state.inputError = null;
      state.editableTodo = {};
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
