import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces";

interface IUserState {
  user: IUser | null,
  loading: boolean,
}

const initialState: IUserState = {
  user: null,
  loading: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer