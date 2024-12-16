import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";
import './stylesheets/navbar.css';
import { BusStops } from '../api_caller';

const NavBar = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const location = useLocation(); 
  const elementId = "light";

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUserLoggedIn(true);
    }
  }, []);

  function toggle_theme() {
    const themeLink = document.getElementById("lightdarkmode");
    const targetElement = document.getElementById("theme-target");
    if (themeLink.href.endsWith("stylesheets/darkmode.css")) {
        themeLink.href = "../stylesheets/lightmode.css";
        targetElement.classList.remove("light");
        targetElement.classList.add("dark");
    } else if (themeLink.href.endsWith("stylesheets/lightmode.css")) {
        themeLink.href = "../stylesheets/darkmode.css";
        targetElement.classList.remove("dark");
        targetElement.classList.add("light");
    }
  }

  function logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  async function test_function() {
    console.log("Test Start");

    const myList = [];
    
    // Assuming BusStops is a function that returns data, and you need to loop through it
    for (let skip = 0; skip <= 5000; skip += 500) {
        const data = await BusStops(skip);
        const list = data.value;
        
        // Push each relevant data into myList
        for (let dict of list) {
            myList.push({
                "BusStopCode": dict.BusStopCode,
                "Lat": dict.Latitude,
                "Lon": dict.Longitude
            });
        }
    }

    // Convert myList to a string by stringifying each object (e.g., converting JSON to a string)
    const listAsString = myList.map(item => JSON.stringify(item)).join(",\n");

    // Create a Blob from the string
    const blob = new Blob([listAsString], { type: 'text/plain' });

    // Create a temporary link to trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'list.txt'; // Name of the downloaded file

    // Trigger the download
    link.click();

    console.log("Test End");
}


  return (
    <>
      <ul className="nv">
          <li>
            <Link to="/" className={location.pathname === "/" ? "activee" : ""}> TravelSite</Link>
          </li>

          <li>
            <Link to="/arrivaltimes" className={location.pathname === "/arrivaltimes" ? "activee" : ""}>Arrival Times</Link>
          </li>

          <li>
            <Link to="/traveltimeest" className={location.pathname === "/traveltimeest" ? "activee" : ""}>Travel Time Est</Link>
          </li>

          <li><button id="theme-target"  className="light" onClick={toggle_theme}/> 
          </li>

          <li><button id="test_button" onClick={test_function}> Test Button</button>
          </li>

          <li style={{ float: 'right' }} className="dropdown">
            <a href="javascript:void(0)" className="dropbtn">
              { !userLoggedIn ? (
                <Link to="/login">Login</Link> 
              ) : (
                <>
                  {localStorage.getItem('username')}
                  <div className="dropdown-content">
                    <Link to="/about">About</Link><br/>
                    <Link to="/settings">Settings</Link><br/>
                    { userLoggedIn && <button id="logout" onClick={logout}>Log Out</button>}
                  </div>
                </>
              )}
            </a>
          </li>
      </ul>
      <Outlet />
    </>
  )
};

export default NavBar;
