import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../stylesheets/popup.css";
import Login from "../Login";

function Popup() {

  const [showPopup, setShowPopup] = useState(false);

  const closePopup = () => {
    setShowPopup(false);
    localStorage.setItem('popup_done', 'yes')
  }

  
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
      {(!localStorage.getItem('popup_done') && showPopup) && (
        <div className="popup-overlay">
          <div className="popup">
            <div>
              <h2>Log in now<br/>
              to permanently save your preferences.</h2>
              <h4>(Otherwise your data will be gone after awhile.)</h4>
            </div>
            <div><Login /></div>
            <p>
              <Link to="" onClick={closePopup} id="links">
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