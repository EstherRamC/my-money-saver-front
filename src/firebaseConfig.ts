// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4Xvc59lMz_6LcHaH_0X3qQcKQJw8pVVQ",
  authDomain: "mymoneysaver-9b1ce.firebaseapp.com",
  projectId: "mymoneysaver-9b1ce",
  storageBucket: "mymoneysaver-9b1ce.appspot.com",
  messagingSenderId: "688264928506",
  appId: "1:688264928506:web:9db2cb50334c65b2df3d43",
  measurementId: "G-SH3QK87XSS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
export { auth };
