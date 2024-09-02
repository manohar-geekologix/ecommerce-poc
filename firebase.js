// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDWGKp2lvkq7ZL-3Y1vpG8yJl930QWkKm4",
  authDomain: "react-poc-auth-app-899e1.firebaseapp.com",
  projectId: "react-poc-auth-app-899e1",
  storageBucket: "react-poc-auth-app-899e1.appspot.com",
  messagingSenderId: "148659226690",
  appId: "1:148659226690:web:08b6e76e4896a5fe9085db",
  measurementId: "G-F4FPDC5C8T"
};

// Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

// export const auth = getAuth(firebaseApp);
export default firebaseApp
