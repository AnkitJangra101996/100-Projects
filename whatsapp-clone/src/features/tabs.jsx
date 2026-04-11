import { createSlice } from "@reduxjs/toolkit";

const tabsSlice = createSlice({
  name: "tabs",
  initialState: {
    tab: localStorage.getItem("whatsapp-clone-activeTab") || "chats",
  },
  reducers: {
    setActiveTab: (state, action) => {
      state.tab = action.payload;
      localStorage.setItem("whatsapp-clone-activeTab", action.payload);
    },
  },
});

export const { setActiveTab } = tabsSlice.actions;
export default tabsSlice.reducer;
