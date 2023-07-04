import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDBOA1tIRBKzypVTxmAJPmiKYIUmiTBHkE",
  authDomain: "pomodoro-4a4a3.firebaseapp.com",
  projectId: "pomodoro-4a4a3",
  storageBucket: "pomodoro-4a4a3.appspot.com",
  messagingSenderId: "365994415127",
  appId: "1:365994415127:web:7ae01f454bd4b8151ef852",
  measurementId: "G-LK89DXWE5W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);
