import React, {Component} from 'react';
import {useState} from 'react';
import Popup from "../Popup.js";

function SavedRoutes() {

  const [showPopup, setShowPopup] = useState(false);
  // u cant use usestate in a class
  // reevulate ur life choices react components are >>>>>>>> classes
  
  state = {
    showList: false, 
    statuss: [
      { id: 1, bus: "181", location: "Jurong East" },
      { id: 2, bus: "199", location: "Boon Lay" },
    ],
  };

  toggleDropdown = () => {
    this.setState((prevState) => ({ showList: !prevState.showList }));
  };


  Locationn = (props) => {
    return (
      <li>
        Take a {props.bus} to {props.location}
      </li>
    );
  };

    return (
      <>
        <p>46 MINUTES!</p>
        <button onClick={this.toggleDropdown}>
          {this.state.showList ? "Hide List" : "Show List"}
        </button>
        
        {this.state.showList && (
          <ol>
            {this.state.statuss.map((loc) => (
              <this.Locationn
                key={loc.id} 
                bus={loc.bus}
                location={loc.location}
              />
            ))}
          </ol>
        )}

        {showPopup && (
        <Popup
          title="Login now to permanently save your routes"
          message="Proceed to login page?"
          
          onClose={closePopup}
        />

      )}
      </>
    );
}

export default SavedRoutes; 