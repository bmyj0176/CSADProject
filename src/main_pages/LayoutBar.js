import React, { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";

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

  return (
    <>
      <table>
        <tbody>
          <tr>
              <td><Link to="/">TravelSite</Link></td>
              <td><Link to="/arrivaltimes">Arrival Times</Link></td>
              <td><Link to="/traveltimeest">Travel Time Est</Link></td>
              <td>
                { !userLoggedIn ? (
                  <Link to="/login">Login</Link>
                ) : (
                  <>
                    Hi friend 
                    <button id="logout" onClick={logout}>Log Out</button>
                  </>
                ) }
                </td>
              <td><button id="toggle_button" onClick={toggle_theme}>Change Theme</button></td>
          </tr>
        </tbody>
      </table>
    <Outlet />
    </>
  )
};

export default LayoutBar;