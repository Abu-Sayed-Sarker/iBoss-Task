import { api } from "../api";

const examApi = api.injectEndpoints({
  endpoints: (builder) => ({
    startExam: builder.mutation({
      query: (testId) => ({
        url: "exams/start",
        method: "POST",
        body: { testId },
      }),
    }),
    submitAnswer: builder.mutation({
      query: (data) => ({
        url: "exams/submit-answer",
        method: "POST",
        body: data,
      }),
    }),
    finalizeExam: builder.mutation({
      query: (testId) => ({
        url: "exams/finalize",
        method: "POST",
        body: { testId },
      }),
    }),
    getMyResults: builder.query({
      query: () => "exams/my-results",
    }),
  }),
});

export const {
  useStartExamMutation,
  useSubmitAnswerMutation,
  useFinalizeExamMutation,
  useGetMyResultsQuery,
} = examApi;
