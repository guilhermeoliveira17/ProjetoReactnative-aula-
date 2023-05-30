// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHNYpp4MT_dsWIrnZ7ZzMH8y8MV2lTwjQ",
  authDomain: "reactnativetestebd.firebaseapp.com",
  projectId: "reactnativetestebd",
  storageBucket: "reactnativetestebd.appspot.com",
  messagingSenderId: "1086481132376",
  appId: "1:1086481132376:web:53f747038d90c9c4fb132d",
  measurementId: "G-VZJL8SDHGZ"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const STORAGE = getStorage(FIREBASE_APP);
const analytics = getAnalytics(FIREBASE_APP);