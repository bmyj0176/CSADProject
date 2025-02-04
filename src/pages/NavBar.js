import React, { useState, useEffect, useContext } from 'react';
import { Outlet, Link, useLocation, useNavigate  } from "react-router-dom";
import './stylesheets/navbar.css';
import ToggleThemeButton from './Components/ToggleThemeButton';
import { bus_stops_info } from '../api_extraction';
import { LoginStatusContext } from '../index';

const NavBar = () => {
  const {userLoggedIn, setUserLoggedIn} = useContext(LoginStatusContext);
  const [path, setPath] = useState("/");
  const location = useLocation(); 
  const navigate = useNavigate();
  
  useEffect(() => {
    setPath(location.pathname); 
  }, [location]);

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('savedarrivaltimes');
    navigate('/');
    window.location.reload();
  }

  async function test_function() {
    await bus_stops_info();
  }


  return (
    <>
      <ul className="nv">
          <li>
            <Link to="/" className={location.pathname === "/" ? "activee" : ""}><img alt="Homepage" className="nyoom" src="./images/nyoom_icon.png"/*nyoom_icon.png*//></Link>
          </li>
          <li>
            <Link to="/arrivaltimes" className={location.pathname === "/arrivaltimes" ? "activee" : ""}>Bus Arrival Times</Link>
          </li>
          <li>
            <Link to="/travelroutes" className={location.pathname === "/travelroutes" ? "activee" : ""}>Find Travel Routes</Link>
          </li>
          
          <li>
          <button id="test_button" onClick={test_function}> Test Button </button><span id="test_text"></span>
          </li>
        {/*------ ABOVE IS FLOATED LEFT, BELOW IS FLOATED RIGHT -----------------------------*/}
          <li style={{ float: 'right' }}>
            <ToggleThemeButton/> 
          </li>
          <li style={{ float: 'right'}} className="dropdown">
            <div className="dropbtn">
              { !userLoggedIn ? (
                <Link id = "loginright" to="/login" className={location.pathname === "/login" ? "activee" : ""}>Login</Link> 
              ) : (
                <>
                  <label className="loginuser"> {localStorage.getItem('username')} </label>
                  <div className="dropdown-content">
                    { userLoggedIn && 
                    <button 
                    id="logout" 
                    style={{borderWidth:"0"}}
                    className="dropdownItem" 
                    onClick={logout}>
                      Log&nbsp;Out
                    </button>}
                  </div>
                </>
              )}
            </div>
          </li>
          <li className="announcements" style={{ float: 'right'}}>
            <Link to="/announcements" className={location.pathname === "/announcements" ? "activee" : ""}>Announcements</Link>
          </li>
      </ul>
      {/* (path !== "/") &&
      <div style={{ display: 'flex', height: '100vh' }}>
        <div style={{ width: '80%', padding: '0 10%' }}>
          <Outlet />
        </div>
      </div>
      */}
      {
        /*(path === "/") && */<Outlet />
      }

    </>
  )
};

export default NavBar;
