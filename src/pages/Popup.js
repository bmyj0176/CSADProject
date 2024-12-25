import React from "react";
import { useState, useEffect } from "react";
import "./stylesheets/popup.css";

function Popup({ title, message }) {

  const [showPopup, setShowPopup] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  // Update localStorage when authentication state changes
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUserLoggedIn(true)
    }
    setUserLoggedIn(false)
  }, []);

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={closePopup}>Close</button>
      </div>
    </div>
  );
}

export default Popup; 