import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "./student/studentSlice";
import teacherSlice from "./teacher/teacher";
import groupSlice from "./group/groupSlice";
import subjectSlice from "./subject/subject";
import { api } from "@/lib/queries";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    student: studentSlice.reducer,
    teacher: teacherSlice.reducer,
    group: groupSlice.reducer,
    subject: subjectSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export default store;

setupListeners(store.dispatch);
