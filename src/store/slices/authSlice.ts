import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../../firebase";
import { UserProps } from "../../interfaces";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

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
      const storageRef = ref(storage, data.displayName);
      const uploadTask = uploadBytesResumable(storage, data.avatar);
      uploadTask.on(
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
            await updateProfile(result.user, {
              displayName: storageRef,
              photoURL: downloadUrl,
            });
            await setDoc(doc(db, "users", result.user.uid), {
              uid: result.user.uid,
              displayName: data.displayName,
              email: data.email,
              avatar: downloadUrl,
            });
          });
        },
      );
      console.log(result.user);
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
});

export default AuthSlice.reducer;
