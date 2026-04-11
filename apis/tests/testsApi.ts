import { api } from "../api";

const testApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTests: builder.query({
      query: () => "tests/all",
      providesTags: ["Tests"],
    }),
    getTestById: builder.query({
      query: (id) => `tests/${id}`,
      providesTags: ["Tests"],
    }),
    createTest: builder.mutation({
      query: (data) => ({
        url: "tests/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tests"],
    }),
    updateTest: builder.mutation({
      query: (data) => ({
        url: `tests/update/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Tests"],
    }),
    deleteTest: builder.mutation({
      query: (data) => ({
        url: `tests/delete/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tests"],
    }),
  }),
});

export const {
  useCreateTestMutation,
  useUpdateTestMutation,
  useDeleteTestMutation,
  useGetAllTestsQuery,
  useGetTestByIdQuery,
} = testApi;
