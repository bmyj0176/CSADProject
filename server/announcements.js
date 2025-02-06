import { db, collection, addDoc, getDocs } from "./firebase";

const ANNOUNCEMENTS_KEY = "announcements";

// Save announcements to localStorage
const saveToLocalStorage = (announcements) => {
  localStorage.setItem(ANNOUNCEMENTS_KEY, JSON.stringify(announcements));
};

// Fetch announcements from Firebase & store in localStorage
export const fetchAnnouncements = async () => {
  const querySnapshot = await getDocs(collection(db, "announcements"));
  const announcements = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  saveToLocalStorage(announcements);
  return announcements;
};

// Add announcement to Firebase & sync with localStorage
export const addAnnouncement = async (text) => {
  const newAnnouncement = { text, timestamp: Date.now() };
  await addDoc(collection(db, "announcements"), newAnnouncement);
  fetchAnnouncements(); // Refresh localStorage
};

// Get announcements from localStorage
export const getLocalAnnouncements = () => {
  return JSON.parse(localStorage.getItem(ANNOUNCEMENTS_KEY)) || [];
};
