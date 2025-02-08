import express from 'express';
import { db } from "./firebase";
import { collection, addDoc, getDocs } from 'firebase/firestore';  // Firestore functions

const router = express.Router();
const ANNOUNCEMENTS_KEY = "announcements";

router.post('/announcements', async (req, res) => {
  const { announcements, newAnnouncement } = req.body;

    // Save to localStorage
    const saveToLocalStorage = (announcements) => {
      localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(announcements));
    };

    // Fetch announcements from Firebase & store in localStorage
    const fetchAnnouncementsFromFirebase = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "announcements"));
        const announcements = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        saveToLocalStorage(announcements);
        return announcements;
      } catch (error) {
        console.error("Error fetching announcements:", error);
        return JSON.parse(localStorage.getItem(ANNOUNCEMENTS_KEY)) || [];
      }
    };

    // Add an announcement to Firebase & update localStorage
    const addAnnouncementToFirebase = async (text) => {
      try {
        const newAnnouncement = { text, timestamp: Date.now() };
        await addDoc(collection(db, "announcements"), newAnnouncement);
        return fetchAnnouncementsFromFirebase(); // Refresh localStorage
      } catch (error) {
        console.error("Error adding announcement:", error);
        return JSON.parse(localStorage.getItem(ANNOUNCEMENTS_KEY)) || [];
      }
    };

    // Get announcements from localStorage
    const getLocalAnnouncements = () => {
      return JSON.parse(localStorage.getItem(ANNOUNCEMENTS_KEY)) || [];
    };
  
});

export default router;
