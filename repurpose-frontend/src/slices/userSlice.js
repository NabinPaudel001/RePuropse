"use client"; // Add this at the top

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: typeof window !== "undefined" && localStorage.getItem("Userinfo") 
    ? JSON.parse(localStorage.getItem("Userinfo")) 
    : null,
  token: typeof window !== "undefined" && localStorage.getItem("token") 
    ? localStorage.getItem("token") 
    : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      if (typeof window !== "undefined") {
        localStorage.setItem("Userinfo", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("Userinfo");
        localStorage.removeItem("token");
      }
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
