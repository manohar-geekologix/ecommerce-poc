// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD6FF0KMkLgq7DqYb81bvBbO2qPqyzLoQQ",
  authDomain: "react-poc-auth-app.firebaseapp.com",
  projectId: "react-poc-auth-app",
  storageBucket: "react-poc-auth-app.appspot.com",
  messagingSenderId: "873610693990",
  appId: "1:873610693990:web:c379458ed1c5a3e2ac0ca7",
  measurementId: "G-BLYV9FH7X1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);