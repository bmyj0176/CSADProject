import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./stylesheets/popup.css";
import Login from "./Login";

function Popup() {

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
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <div><Login /></div>
            <p>
              <Link to="" onClick={closePopup} className="links">
                Continue as guest
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Popup; 