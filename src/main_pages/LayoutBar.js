import React, { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";
import { getBusTiming, getBusStopInfo } from '../helper_func';
import './stylesheets/navbar.css';

const LayoutBar = () => {

  const [userLoggedIn, setUserLoggedIn] = useState(false);

  // check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUserLoggedIn(true);
    }
  }, []);

  function toggle_theme() {
    const themeLink = document.getElementById("lightdarkmode");
    if (themeLink.href.endsWith("stylesheets/darkmode.css")) {
        themeLink.href = "../stylesheets/lightmode.css";
    } else {
        themeLink.href = "../stylesheets/darkmode.css";
    }
  }  

  function logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  async function test_function() {
    console.log("Test Start")
    const data = await getBusStopInfo("Description", "Dover Stn Exit B")
    console.log(data[0].BusStopCode)
    console.log(await getBusTiming(data[0].BusStopCode, "185"))
    console.log("Test End")
  }

  return (
    <>
      <ul className="nv">
          <li><Link to="/">TravelSite</Link></li>
          <li><button id="toggle_button" onClick={toggle_theme}>Change Theme</button></li>
          <li><Link to="/arrivaltimes">Arrival Times</Link></li>
          <li><Link to="/traveltimeest">Travel Time Est</Link></li>
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

export default LayoutBar;