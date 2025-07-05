import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

export const authSlicer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logoutUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthUser, logoutUser } = authSlicer.actions;

export default authSlicer.reducer;
