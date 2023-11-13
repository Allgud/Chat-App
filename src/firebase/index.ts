import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOBb8GBSvleL3nKKUp8GisWWaeUHcyKb4",
  authDomain: "chat-app-9d46c.firebaseapp.com",
  projectId: "chat-app-9d46c",
  storageBucket: "chat-app-9d46c.appspot.com",
  messagingSenderId: "178396127086",
  appId: "1:178396127086:web:08f6920d398eb2e157ab7f",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore();
