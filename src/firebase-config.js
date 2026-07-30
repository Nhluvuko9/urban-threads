import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4F31clzqEAEmNG9ena5fy6ob3eCCxRzk",
  authDomain: "urban-threads-nhluvuko.firebaseapp.com",
  projectId: "urban-threads-nhluvuko",
  storageBucket: "urban-threads-nhluvuko.firebasestorage.app",
  messagingSenderId: "276110476778",
  appId: "1:276110476778:web:47f9226eb63f0311b21e93",
  measurementId: "G-6M6KG2923V"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);