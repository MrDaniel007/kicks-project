// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmodw5qD8eaXjM60KkFHZ9n7kd552Slhs",
  authDomain: "auth-kicks.firebaseapp.com",
  projectId: "auth-kicks",
  storageBucket: "auth-kicks.firebasestorage.app",
  messagingSenderId: "457876763235",
  appId: "1:457876763235:web:a59ee93d0cfe93c18b7e56",
  measurementId: "G-1J93D44140"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);