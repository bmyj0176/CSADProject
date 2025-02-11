import express from 'express';
import { db, auth } from './firebase.js';
import { createUserWithEmailAndPassword, getIdToken } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';  

const router = express.Router();


router.post('/register', async (req, res) => {
  const { username, email, password, savedarrivaltimes } = req.body;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    
    const token = await user.getIdToken();

    
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      username,
      email,
      savedarrivaltimes: savedarrivaltimes
    });

    return res.status(201).json({
      token
    });
  } catch (error) {
    console.error(error);
    if (error.code === "auth/email-already-in-use")
      return res.status(409).json({ error: "Email already exists, please login instead." });
    return res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
});

export default router;
