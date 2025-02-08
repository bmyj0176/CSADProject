import express from 'express';
import { db, auth } from './firebase.js';
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';  // Firestore functions

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    
    // sign in
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // login session token
    const token = await user.getIdToken(true);

    // get from firestore db
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();

    return res.status(200).json({
      token,
      username: userData.username,
      email: userData.email,
      savedarrivaltimes: userData.savedarrivaltimes,
    });
  } catch (error) {
    console.error(error);
    if (error.code === "auth/user-not-found")
      return res.status(404).json({ error: "Email isn't registered." });
    if (error.code === "auth/wrong-password")
      return res.status(401).json({ error: "Wrong password." });
    return res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
});

export default router;
