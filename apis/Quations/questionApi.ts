import { api } from "../api";

const questionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addQuestion: builder.mutation({
      query: (data) => ({
        url: "questions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tests"],
    }),
    updateQuestion: builder.mutation({
      query: ({ id, data }) => ({
        url: `questions/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Tests"],
    }),
    deleteQuestion: builder.mutation({
      query: ({ id }) => ({
        url: `questions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tests"],
    }),
  }),
});

export const {
  useAddQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = questionApi;
