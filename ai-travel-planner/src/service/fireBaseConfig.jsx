// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCZXuogFjimiuAm3-hxsVp44-oq1GUSLs",
  authDomain: "travel-ai-planner-b957b.firebaseapp.com",
  projectId: "travel-ai-planner-b957b",
  storageBucket: "travel-ai-planner-b957b.firebasestorage.app",
  messagingSenderId: "320790306326",
  appId: "1:320790306326:web:781dc66b59b3adc7295f37",
  measurementId: "G-38XNWC6SJW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app)
//const analytics = getAnalytics(app);