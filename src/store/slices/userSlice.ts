import { createSlice } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";

interface IUserState {
  user: DocumentData | null;
  isUser: boolean;
}

const initialState: IUserState = {
  user: null,
  isUser: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem("userId", action.payload.id);
      localStorage.setItem("email", action.payload.email);
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null
    },
    handleIsUser: (state) => {
      if (localStorage.getItem("userId")) {
        state.isUser = true;
      } else {
        state.isUser = false;
      }
    },
  },
});

export const { setUser, handleIsUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
