import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, storage, db } from "../../firebase";
import { UserProps } from "../../interfaces";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  StorageError,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { FirebaseError } from "@firebase/util";
import { setUser, removeUser } from "./userSlice";

interface IAuthState {
  isAuth: boolean;
}

export const createUser = createAsyncThunk(
  "auth/createUser",
  async (data: UserProps, { dispatch }) => {
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
              uid: result.user.uid,
              displayName: data.displayName,
              email: data.email,
              photoURL: downloadUrl,
            });
            await setDoc(doc(db, "userChats", result.user.uid), {});
          });
        },
      );

      dispatch(setUser(result.user));
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        throw Error(err.message);
      }
    }
  },
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (data: { [key: string]: string }, { dispatch }) => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const { displayName, uid, email, photoURL } = result.user;
      dispatch(setUser({ displayName, id: uid, email, photoURL }));
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        throw Error(err.message);
      }
    }
  },
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    await signOut(auth);
    dispatch(removeUser());
  },
);

const initialState: IAuthState = {
  isAuth: true,
};

const authSlice = createSlice({
  name: "authetication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state) => {
        state.isAuth = true;
      })
      .addCase(signIn.fulfilled, (state) => {
        state.isAuth = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuth = false;
      });
  },
});

export default authSlice.reducer;
