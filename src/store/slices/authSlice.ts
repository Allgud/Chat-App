import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { auth, storage, db } from "../../firebase";
import { UserProps } from "../../interfaces";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  StorageError,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseError } from "@firebase/util"
import { setUser } from "./userSlice";

interface IAuthState {
  isAuth: boolean;
  loading: boolean,
  error: string | unknown
}

export const createUser = createAsyncThunk(
  "auth/createUser",
  async (data: UserProps) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const storageRef = ref(storage, data.displayName);
      const uploadTask = uploadBytesResumable(storageRef, data.avatar);
      uploadTask.on(
        "state_changed",
        (snapShot) => console.log(snapShot),
        (err: StorageError) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
            await updateProfile(result.user, {
              displayName: data.displayName,
              photoURL: downloadUrl,
            });
            await setDoc(doc(db, "users", result.user.uid), {
              id: result.user.uid,
              displayName: data.displayName,
              email: data.email,
              photoURL: downloadUrl,
            });
          });
        },
      );
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        throw Error(err.message)
      }
    }
  },
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (data: { [key: string]: string }, {dispatch}) => {
    try {
      const result = await signInWithEmailAndPassword(auth, data.email, data.password)
      const {displayName, uid, email, photoURL} = result.user
      dispatch(setUser({displayName, id: uid, email, photoURL}))
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        throw Error(err.message)
      }
    }
  }
)

const initialState: IAuthState = {
  isAuth: false,
  loading: false,
  error: ""
};

const authSlice = createSlice({
  name: "authetication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false
        state.isAuth = true
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true
      })
      .addCase(signIn.fulfilled, (state) => {
        state.loading = false
        state.isAuth = true
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.payload 
      })
  }
});

export default authSlice.reducer;
