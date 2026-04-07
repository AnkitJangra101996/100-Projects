import { createSlice } from "@reduxjs/toolkit";

const friendsSlice = createSlice({
  name: "frineds",
  initialState: {
    loading: false,
    requests: [],
    sentRequests: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setRequests: (state, action) => {
      state.requests = action.payload;
    },
    addRequest: (state, action) => {
      state.requests.unshift(action.payload);
    },
    removeRequest: (state, action) => {
      state.requests = state.requests.filter(
        (req) => req.id !== action.payload,
      );
    },
  },
});

export const { setLoading, setRequests, addRequest, removeRequest } =
  friendsSlice.actions;

export default friendsSlice.reducer;
