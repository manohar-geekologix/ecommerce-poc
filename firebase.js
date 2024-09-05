// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBvAYFh4EdEnJ3qO-3cdzPx5OPu87nhiw0",
  authDomain: "reacto-poc.firebaseapp.com",
  projectId: "reacto-poc",
  storageBucket: "reacto-poc.appspot.com",
  messagingSenderId: "160041334833",
  appId: "1:160041334833:web:592ee7b91d5596d2bd7d10",
  measurementId: "G-F4FPDC5C8T"
};

// Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

// export const auth = getAuth(firebaseApp);
export default firebaseApp
