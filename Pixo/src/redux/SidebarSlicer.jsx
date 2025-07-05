import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: localStorage.getItem("pixo-sidebar-state") || false,
};

export const sidebarSlicer = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleSidebar } = sidebarSlicer.actions;

export default sidebarSlicer.reducer;
