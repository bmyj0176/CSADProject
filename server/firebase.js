import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration object from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyBYPZemX_EUcIdNISn8qO-VIbXxtabW1Jc",
    authDomain: "nyoomtravelsite.firebaseapp.com",
    projectId: "nyoomtravelsite",
    storageBucket: "nyoomtravelsite.firebasestorage.app",
    messagingSenderId: "235644167418",
    appId: "1:235644167418:web:a4b4ff1b45a43fa53fd543",
    measurementId: "G-HTDRL2TRRW"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
