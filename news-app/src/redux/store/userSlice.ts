"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  name: "",
  email: "",
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ name: string; email: string;}>
    ) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isLoggedIn = true;
      localStorage.setItem("userData", JSON.stringify(action.payload));
      localStorage.setItem("isLoggedIn", "true");
    },
    logout: (state) => {
      state.name = "";
      state.email = "";
      state.isLoggedIn = false;
      localStorage.removeItem("userData");
      localStorage.removeItem("isLoggedIn");
    },
    setUserFromStorage: (state) => {
      const stored = localStorage.getItem("userData");
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (stored && loggedIn) {
        const parsed = JSON.parse(stored);
        state.name = parsed.name;
        state.email = parsed.email;
        state.isLoggedIn = true;
      }
    },
  },
});

export const { login, logout, setUserFromStorage } = userSlice.actions;
export default userSlice.reducer;
