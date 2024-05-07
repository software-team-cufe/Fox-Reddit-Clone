
import { initializeApp } from "firebase/app";
import firestore from '@firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyAswB3tqVpaDJdwbLpmczjJlrt0LENLHso",
  authDomain: "fox-app-e9b9f.firebaseapp.com",
  projectId: "fox-app-e9b9f",
  storageBucket: "fox-app-e9b9f.appspot.com",
  messagingSenderId: "24320835329",
  appId: "1:24320835329:web:730880693df634d17c6500",
  measurementId: "G-K1SV52MJTR"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const appFirestore = firestore.initializeFirestore(firebaseApp);