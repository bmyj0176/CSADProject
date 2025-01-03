import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Setting() {

  const [showPopup, setShowPopup] = useState(false);

  const closePopup = () => setShowPopup(false);

  // Update localStorage when authentication state changes
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setShowPopup(false)
    } else {
      setShowPopup(true)
    }
  }, []);

  return (
    <>
      <h1>Settings</h1>
    </>
  );
}

export default Setting; 