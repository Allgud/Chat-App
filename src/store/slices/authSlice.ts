import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../../firebase";
import { UserProps } from "../../interfaces";
import { ref, uploadBytesResumable, getDownloadURL, StorageError } from "firebase/storage";
import { doc, setDoc } from 'firebase/firestore'

interface IAuthState {
  isAuth: boolean;
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
      const storageRef = ref(storage, data.displayName)
      const uploadTask = uploadBytesResumable(storageRef, data.avatar)
      uploadTask.on("state_changed",
        (snapShot) => console.log(snapShot),
        (err: StorageError) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
            await updateProfile(result.user, {
              displayName: data.displayName,
              photoURL: downloadUrl
            })
            await setDoc(doc(db, 'users', result.user.uid), {
              id: result.user.uid,
              displayName: data.displayName,
              email: data.email,
              photoURL: downloadUrl
            })
          })
        }
      )
      console.log(result)
    } catch (err) {
      console.log(err);
    }
  },
);

const initialState: IAuthState = {
  isAuth: false,
};

const AuthSlice = createSlice({
  name: "authetication",
  initialState,
  reducers: {}
});

export default AuthSlice.reducer;
