import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./slices/commonSlice";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import chatReducer from './slices/chatSlice'

export const store = configureStore({
  reducer: {
    common: commonReducer,
    authetication: authReducer,
    user: userReducer,
    chat: chatReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
