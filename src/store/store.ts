import { configureStore } from "@reduxjs/toolkit";
import { api } from "@/lib/queries";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export default store;

setupListeners(store.dispatch);
