import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BASE_URL = "http://localhost:9090";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Subject", "Group", "Teacher", "Student"],
  endpoints: (builder) => ({
    getSubjects: builder.query({
      query: () => `/all-subject`,
      providesTags: (result) => (result ? [...result.data.map(({ id }: { id: number }) => ({ type: "Subject" as const, id })), "Subject"] : ["Subject"]),
    }),
    addSubject: builder.mutation({
      query: (body) => ({
        url: "/subject/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Subject"],
    }),
    getGroups: builder.query({
      query: () => `/all-group`,
      providesTags: (result) => (result ? [...result.data.map(({ id }: { id: number }) => ({ type: "Group" as const, id })), "Group"] : ["Group"]),
    }),
    addGroup: builder.mutation({
      query: (body) => ({
        url: "/group/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Group"],
    }),
    getTeachers: builder.query({
      query: () => `/all-teacher`,
      providesTags: (result) => (result ? [...result.data.map(({ id }: { id: number }) => ({ type: "Teacher" as const, id })), "Teacher"] : ["Teacher"]),
    }),
    addTeachers: builder.mutation({
      query: (body) => ({
        url: "/teacher/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Teacher"],
    }),
    getStudents: builder.query({
      query: () => `/all-student`,
      providesTags: (result) => (result ? [...result.data.map(({ id }: { id: number }) => ({ type: "Student" as const, id })), "Student"] : ["Student"]),
    }),
    addStudents: builder.mutation({
      query: (body) => ({
        url: "/student/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Student"],
    }),
    getWeekDays: builder.query({
      query: () => `/all-week`,
    }),
  }),
});

export const {
  useAddSubjectMutation,
  useGetSubjectsQuery,
  useAddGroupMutation,
  useGetGroupsQuery,
  useAddTeachersMutation,
  useGetTeachersQuery,
  useAddStudentsMutation,
  useGetStudentsQuery,
  useGetWeekDaysQuery,
} = api;
