import { api } from "../api";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "user/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "user/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
