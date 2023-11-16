import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  where,
  query,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../firebase";

interface IChatState {
  currentUser: DocumentData | null;
  searchUsers: DocumentData[] | null;
  onLoad: boolean;
  areUsersSearched: boolean;
}

export const getSearchUser = createAsyncThunk(
  "chat/getSearchUser",
  async (data: { [key: string]: string }) => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", data.text),
    );
    const snapShot = await getDocs(q);
    return snapShot.docs.map((doc) => doc.data());
  },
);

const initialState: IChatState = {
  currentUser: null,
  searchUsers: null,
  onLoad: false,
  areUsersSearched: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    clearSearchList: (state) => {
      state.searchUsers = null;
      state.areUsersSearched = false;
    },
    cleanSearchedFlag: (state) => {
      state.areUsersSearched = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchUser.pending, (state) => {
        state.onLoad = true;
      })
      .addCase(getSearchUser.fulfilled, (state, action) => {
        state.areUsersSearched = true;
        state.onLoad = false;
        state.searchUsers = action.payload;
      });
  },
});

export const { clearSearchList, cleanSearchedFlag } = chatSlice.actions;
export default chatSlice.reducer;
