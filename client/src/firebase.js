// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "dental-clinic-be9a5.firebaseapp.com",
  projectId: "dental-clinic-be9a5",
  storageBucket: "dental-clinic-be9a5.appspot.com",
  messagingSenderId: "704267804752",
  appId: "1:704267804752:web:bcdc7c79422c83f54a3155",
  measurementId: "G-BJXH3B3ZJP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
