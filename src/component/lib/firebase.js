// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChU1JVU533WXDZTA9DAC6hdhdvdI-Vjq0",
  authDomain: "movie-map-firebase.firebaseapp.com",
  projectId: "movie-map-firebase",
  storageBucket: "movie-map-firebase.appspot.com",
  messagingSenderId: "120823812497",
  appId: "1:120823812497:web:7b0e65887d63299189ca30",
  measurementId: "G-FEBC481415"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);