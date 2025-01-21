import express from 'express';
import { getDocs, collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase.js';  // Import Firestore setup

const router = express.Router();

// Fetch all bus data
router.get('/', async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, "bus_data"));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    res.json(data);
  } catch (error) {
    res.status(500).send("Error fetching bus data from Firebase");
  }
});

// Add new bus data
router.post('/', async (req, res) => {
  const { field1, field2 } = req.body;
  try {
    const docRef = await addDoc(collection(db, "bus_data"), {
      field1,
      field2
    });
    res.json({ message: "Document added successfully", id: docRef.id });
  } catch (error) {
    res.status(500).send("Error adding bus data to Firebase");
  }
});

export default router;
