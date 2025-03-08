import { configureStore } from "@reduxjs/toolkit";
import { entityApi } from "../services/entityApi";

export const store = configureStore({
  reducer: {
    [entityApi.reducerPath]: entityApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(entityApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
