import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    authetication: AuthSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;