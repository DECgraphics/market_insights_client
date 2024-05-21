// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-ZUhwaflmbvuTHpv5sKmlEiOlp0jQeCU",
  authDomain: "house-search-55957.firebaseapp.com",
  projectId: "house-search-55957",
  storageBucket: "house-search-55957.appspot.com",
  messagingSenderId: "670976396484",
  appId: "1:670976396484:web:44af053a08d98047844d91",
  measurementId: "G-06TF0NRH6K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();