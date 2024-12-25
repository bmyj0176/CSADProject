import React, {Component} from 'react';
import {useState} from 'react';
import Popup from "../Popup.js";

function SavedRoutes() {

  const [showList, setShowList] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  // u cant use usestate in a class
  // reevulate ur life choices react components are >>>>>>>> classes

  const toggleDropdown = () => {
    setShowList(!showList)
  };


  const Locationn = (props) => {
    return (
      <li>
        Take a {props.bus} to {props.location}
      </li>
    );
  };

    return (
      <>
        <p>46 MINUTES!</p>
        <button onClick={toggleDropdown}>
          {showList ? "Hide List" : "Show List"}
        </button>
        
        {showList && (
          <ol>
            <li>some list</li>
          </ol>
        )}

        {showPopup && (
        <Popup
          title="Login now to permanently save your routes"
          message="Proceed to login page?"
        />

      )}
      </>
    );
}

export default SavedRoutes; 