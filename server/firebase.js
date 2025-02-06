import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import dotenv from 'dotenv';

dotenv.config();

// Firebase configuration object from Firebase Console
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication before other services
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export { db, auth, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot }; // Export both Firestore and Auth
