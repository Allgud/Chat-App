import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAO1tu9Qz7zF5BFAgjITjlWifLXfCdnVn4",
  authDomain: "chat-app-e2de2.firebaseapp.com",
  projectId: "chat-app-e2de2",
  storageBucket: "chat-app-e2de2.appspot.com",
  messagingSenderId: "844214133846",
  appId: "1:844214133846:web:df5459d091bc26d34107f7"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app)
export const db = getFirestore()
