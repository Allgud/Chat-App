import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { collection, where, query, getDocs, DocumentData } from 'firebase/firestore'
import { db }  from '../../firebase'

interface IChatState {
  currentUser: DocumentData | null
}

export const getSearchUser = createAsyncThunk(
  'chat/getSearchUser',
  async (data: { [key: string]: string }) => {
    const q = query(collection(db, 'users'), where('displayName', '==', data.text))
    const snapShot = await getDocs(q)
    return snapShot.docs[0].data()
  }
)

const initialState: IChatState = {
  currentUser: null
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getSearchUser.fulfilled, (state, action) => {
        state.currentUser = action.payload
      })
  }
})

export default chatSlice.reducer