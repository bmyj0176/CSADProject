import React, {Component} from 'react';
import {useState} from 'react';
import Popup from "../Popup.js";

function SavedRoutes() {

  const [showList, setShowList] = useState(false)
  const [showPopup, setShowPopup] = useState(false);

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
        <div><Popup/></div>
      </>
    );
}

export default SavedRoutes; 