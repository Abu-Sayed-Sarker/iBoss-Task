import { createSlice } from "@reduxjs/toolkit";
import { setCookie, removeCookie } from "@/utils/cookies";

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      
      // Update cookies if we have both user and token
      if (state.accessToken && typeof window !== "undefined") {
        const authData = JSON.stringify({
          access: state.accessToken,
          user: action.payload,
        });
        setCookie("auth", authData);
        setCookie("role", action.payload?.role);
      }
    },
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      // Update cookies if we have both user and token
      if (state.user && typeof window !== "undefined") {
        const authData = JSON.stringify({
          access: action.payload.accessToken,
          user: state.user,
        });
        setCookie("auth", authData);
      }
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;

      // Clear cookies
      if (typeof window !== "undefined") {
        removeCookie("auth");
        removeCookie("role");
      }
    },
  },
});

export const { setUser, setTokens, logout } = authSlice.actions;
export default authSlice.reducer;
