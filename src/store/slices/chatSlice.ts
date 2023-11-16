import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  where,
  query,
  getDocs,
  DocumentData,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { RootState } from "..";
import { FirebaseError } from "firebase/app";
import { ICurrentChat } from "../../interfaces";

interface IChatState {
  searchUsers: DocumentData[] | null;
  onLoad: boolean;
  areUsersSearched: boolean;
  chats: DocumentData[];
  currentChatInfo: ICurrentChat | null,
  messages: string[]
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

export const fetchChats = createAsyncThunk(
  'chat/fetchChats',
  async (id: string) => {
    const res = await getDoc(doc(db, "userChats", id))
    return res.data()
  }
)

export const getCurrentChat = createAsyncThunk(
  "chat/getCurrentChat",
  async (data: { [key: string] :string }, { getState }) => {
    const state = getState() as RootState
    try {
      const combineId = state.user.user?.id > data ? state.user.user?.id + data.userId : data.userId + state.user.user?.id
      
      const res = await getDoc(doc(db, "chats", combineId))
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combineId), {
          messages: []
        })

        await updateDoc(doc(db, "userChats", state.user.user?.id), {
          [combineId + ".userInfo"]: {
            uid: data.userId,
            displayName: data.username,
            photoURL: data.avatar
          },
          [combineId+".date"]: serverTimestamp()
        })

        await updateDoc(doc(db, "userChats", data.userId), {
          [combineId + ".userInfo"]: {
            uid: state.user.user?.id,
            displayName: state.user.user?.displayName,
            photoURL: state.user.user?.photoURL
          },
          [combineId+".date"]: serverTimestamp()
        })
      }

      return res.data()
    } catch (err) {
      if (err instanceof FirebaseError) {
        throw Error(err.message)
      }
    }
  }
)

const initialState: IChatState = {
  searchUsers: null,
  onLoad: false,
  areUsersSearched: false,
  chats: [],
  currentChatInfo: null,
  messages: []
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
    updateChats: (state, action) => {
      state.chats = action.payload
    }
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
      })
      .addCase(getCurrentChat.fulfilled, (state, action) => {
        state.areUsersSearched = false
        state.searchUsers = null
        state.messages = action.payload?.messages
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
         console.log(action.payload)
      })
  },
});

export const { clearSearchList, cleanSearchedFlag } = chatSlice.actions;
export default chatSlice.reducer;
