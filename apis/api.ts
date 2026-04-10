import { base_url } from "@/env";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type AuthState = {
  accessToken?: string | null;
};

const parseJSON = <T>(value: string | null): T | null => {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
};

const baseQuery = fetchBaseQuery({
  baseUrl: base_url,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as { auth?: AuthState };
    const token = state.auth?.accessToken || null;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    } else if (typeof window !== "undefined") {
      const authData = parseJSON<{ accessToken?: string }>(
        localStorage.getItem("auth"),
      );

      if (authData?.accessToken) {
        headers.set("authorization", `Bearer ${authData.accessToken}`);
      } else {
        const persistedData = parseJSON<{ auth?: string }>(
          localStorage.getItem("persist:root"),
        );
        const persistedAuth = parseJSON<{ accessToken?: string }>(
          persistedData?.auth ?? null,
        );

        if (persistedAuth?.accessToken) {
          headers.set("authorization", `Bearer ${persistedAuth.accessToken}`);
        }
      }
    }

    return headers;
  },
});

export const api = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: ["users"], // Define your tags here
  endpoints: () => ({}), // Define your API endpoints here
});
