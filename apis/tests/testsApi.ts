import { api } from "../api";

const testApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createTest: builder.mutation({
      query: (data) => ({
        url: "tests/add",
        method: "POST",
        body: data,
      }),
    }),
    updateTest: builder.mutation({
      query: (data) => ({
        url: `tests/update/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteTest: builder.mutation({
      query: (data) => ({
        url: `tests/delete/${data.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateTestMutation,
  useUpdateTestMutation,
  useDeleteTestMutation,
} = testApi;
