import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";
import './stylesheets/navbar.css';
import { dijkstra, shortest_path } from '../travel_algorithms';

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
    console.clear()
    console.log("Test Start");
    //console.log(dijkstra("A"));
    console.log(await shortest_path(1, 2));
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

          <li><button id="test_button" onClick={test_function}> Test Button</button><span id="test_text"></span>
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
