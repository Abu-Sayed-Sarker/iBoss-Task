import { createSlice } from "@reduxjs/toolkit";
import { setCookie, removeCookie } from "@/utils/cookies";

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
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
      setCookie("role", action.payload?.role);
      // Update cookies if we have both user and token
      if (state.accessToken && typeof window !== "undefined") {
        const authData = JSON.stringify({
          access: state.accessToken,
          user: action.payload,
        });
        setCookie("auth", authData);
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
