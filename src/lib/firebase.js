import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace with your actual Firebase config from the Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBffh7CwaXs_7SGuOz5tgpNaVnBbCZb9R0",
  authDomain: "applyjob-3c681.firebaseapp.com",
  projectId: "applyjob-3c681",
  storageBucket: "applyjob-3c681.firebasestorage.app",
  messagingSenderId: "756660939811",
  appId: "1:756660939811:web:aa7cd6b59f4ff8f4af5596",
  measurementId: "G-88Z4H3YBML"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
