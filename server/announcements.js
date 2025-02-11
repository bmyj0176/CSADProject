import express from 'express';
import { db } from "./firebase.js";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';  

const router = express.Router();

router.post('/announcements/add', async (req, res) => { 
  try {
    const { message } = req.body; 

    const announcementsRef = collection(db, "announcements");

    
    const docRef = await addDoc(announcementsRef, { message });

    return res.status(201).json({ id: docRef.id, message });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
});

router.post('/announcements/delete', async (req, res) => { 
  try {
    const { id } = req.body; 

    const docRef = doc(db, "announcements", id);

    
    await deleteDoc(docRef);

    return res.status(200).json({ message: "Document deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error. Please try again later." });
  }
});

router.get('/announcements/read', async (req, res) => {
  try {
    const announcementsRef = collection(db, "announcements");
    const querySnapshot = await getDocs(announcementsRef);

    
    const announcements = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return res.status(200).json({
      announcements
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
});

router.post('/announcements/edit', async (req, res) => {
  try {
    const { id, new_message } = req.body; 

    const docRef = doc(db, "announcements", id);

    
    await updateDoc(docRef, { message: new_message });

    return res.status(200).json({ message: "Document updated successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error. Please try again later." });
  }
});

export default router;
