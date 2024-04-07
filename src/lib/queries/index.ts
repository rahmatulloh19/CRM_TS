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
      invalidatesTags: ["Subject", "Student", "Teacher", "Group"],
    }),
    editSubject: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/subject/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Subject", "Group", "Teacher"],
    }),
    removeSubject: builder.mutation({
      query: (id) => ({
        url: `/subject/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subject", "Group", "Teacher"],
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
    editGroup: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/group/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Group"],
    }),
    removeGroup: builder.mutation({
      query: (id) => ({
        url: `/group/delete/${id}`,
        method: "DELETE",
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
    editTeacher: builder.mutation({
      query: ({ id, ...builder }) => ({
        url: `/teacher/update/${id}`,
        method: "PUT",
        body: builder,
      }),
      invalidatesTags: ["Teacher", "Group"],
    }),
    removeTeacher: builder.mutation({
      query: (id) => ({
        url: `/teacher/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Teacher", "Group"],
    }),
    getStudents: builder.query({
      query: () => `/all-student`,
      providesTags: (result) => (result ? [...result.data.map(({ id }: { id: number }) => ({ type: "Student" as const, id })), "Student"] : ["Student"]),
    }),
    addStudent: builder.mutation({
      query: (body) => ({
        url: "/student/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Student"],
    }),
    removeStudent: builder.mutation({
      query: (id) => ({
        url: `/student/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Student"],
    }),
    editStudent: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/student/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Teacher"],
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
  useEditGroupMutation,
  useRemoveGroupMutation,
  useEditSubjectMutation,
  useRemoveSubjectMutation,
  useGetGroupsQuery,
  useAddTeachersMutation,
  useEditTeacherMutation,
  useRemoveTeacherMutation,
  useGetTeachersQuery,
  useAddStudentMutation,
  useRemoveStudentMutation,
  useEditStudentMutation,
  useGetStudentsQuery,
  useGetWeekDaysQuery,
} = api;
