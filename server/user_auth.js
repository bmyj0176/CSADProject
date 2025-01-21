import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getAuth, fetchSignInMethodsForEmail } from 'firebase/auth';
import { db } from './firebase.js';  // Firestore
import { doc, setDoc, getDoc } from 'firebase/firestore';  // Firestore functions

const router = express.Router();
const auth = getAuth();

// Register route
router.post('/register', async (req, res) => {
  const { username, email, password, savedarrivaltimes } = req.body;

  try {
    // Check if email is already in use with Firebase Auth
    const userExists = await fetchSignInMethodsForEmail(auth, email);
    if (userExists.length > 0) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save additional user data (like username and savedarrivaltimes) in Firestore
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      username,
      savedarrivaltimes: savedarrivaltimes || []
    });

    // Optionally, you can also create a custom JWT token if needed
    const token = jwt.sign({ id: user.uid }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.status(201).json({
      message: 'User created successfully',
      token,
      username,
      savedarrivaltimes,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Sign in the user using Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get additional user data from Firestore
    const userRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      return res.status(404).json({ error: 'User data not found' });
    }

    const userData = docSnap.data();

    // Generate a custom JWT (optional, Firebase already provides a token, but you can use your own)
    const token = jwt.sign({ id: user.uid }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.status(200).json({
      token,
      username: userData.username,
      savedarrivaltimes: userData.savedarrivaltimes,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
});

export default router;
