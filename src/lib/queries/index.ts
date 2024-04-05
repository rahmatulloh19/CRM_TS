import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9090",
  }),
  tagTypes: ["Subject"],
  endpoints: (builder) => ({
    addSubject: builder.mutation({
      query: (body) => ({
        url: "/subject/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Subject"],
    }),
    getSubjects: builder.query({
      query: () => `/all-subject`,
      providesTags: (result) => (result ? [...result.data.map(({ id }) => ({ type: "Subject" as const, id })), "Subject"] : ["Subject"]),
    }),
    // getStudents: builder.query({
    //   query: () => `/students`,
    // }),
    // getTeachers: builder.query({
    //   query: () => `/teachers`,
    // }),
  }),
});

export const { useAddSubjectMutation, useGetSubjectsQuery } = api;
