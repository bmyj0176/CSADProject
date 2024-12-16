import React, { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";
import './stylesheets/navbar.css';
import { BusStops } from '../api_caller';

const NavBar = () => {

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  var elementId = "light";

  // check if user is logged in
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
        
    } else if  (themeLink.href.endsWith("stylesheets/lightmode.css")) {
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
    console.log("Test Start")
    const listo = []
    for (let skip = 0; skip <= 5000; skip += 500) {
      const data = await BusStops(skip)
      const list = data.value
      for (let dict of list) {
        listo.push(dict.Description)
      }
    }
    listo.sort()
    console.log(listo)
    // Convert the list to a single string with each string on a new line
    const fileContent = listo.join("\",\n\"");

    // Create a Blob from the content
    const blob = new Blob([fileContent], { type: "text/plain" });

    // Create a link element to trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "output.txt";  // The name of the file to download

    // Trigger the download
    link.click();
    console.log("Test End")
  }

  return (
    <>
      <ul className="nv">
          <li><Link to="/">TravelSite</Link></li>
          <li><Link to="/arrivaltimes">Arrival Times</Link></li>
          <li><Link to="/traveltimeest">Travel Time Est</Link></li>

          <li><button id="theme-target" class="light" onClick={toggle_theme}/></li>

          <li><button id="test_button" onClick={test_function}>Test Button</button></li>
          <li style={{ float: 'right' }} className={"dropdown"}>
          <a href="javascript:void(0)" className="dropbtn">
            { !userLoggedIn ? (
              <Link to="/login">Login</Link> 
            ) // logged out
            : (
              <>
                {localStorage.getItem('username')} 
                <div className="dropdown-content">
                <Link to="/about">About</Link><br/>
                <Link to="/settings">Settings</Link><br/>
                { userLoggedIn && <button id="logout" onClick={logout}>Log Out</button>}
                </div>
              </>
            ) // logged in
            }
          </a>
          </li>
      </ul>
    <Outlet />
    </>
  )
};

export default NavBar; 