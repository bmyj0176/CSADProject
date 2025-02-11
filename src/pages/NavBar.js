import React, { useState, useEffect, useContext } from 'react';
import { Outlet, Link, useLocation, useNavigate  } from "react-router-dom";
import './stylesheets/navbar.css';
import ToggleThemeButton from './Components/ToggleThemeButton';
import { nearestBusStops } from '../utils/helper_functions';
import { LoginStatusContext } from '../index';
import { stationToCode } from '../utils/helper_functions';
import { EndDiv } from './Homepage.js';

const NavBar = () => {
  const {userLoggedIn, setUserLoggedIn} = useContext(LoginStatusContext);
  const [path, setPath] = useState("/");
  const location = useLocation(); 
  const navigate = useNavigate();
  
  useEffect(() => {
    setPath(location.pathname); 
  }, [location]);

  function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('savedarrivaltimes');
    navigate('/');
    window.location.reload();
  }

  async function test_function() {
    console.log(await stationToCode("Woodlands_TE"))
  }


  return (
    <div id="main-body">
      <ul className="nv">
          <li className='nv-item'>
            <Link to="/" className={location.pathname === "/" ? "activee" : ""}><img alt="Homepage" className="nyoom" src="./images/nyoom_icon.png"/></Link>
          </li>
          <li className='nv-item'>
            <Link to="/arrivaltimes" className={location.pathname === "/arrivaltimes" ? "activee" : "unactivee"}>Bus Arrival Times</Link>
          </li>
          <li>
            <Link to="/travelroutes" className={location.pathname === "/travelroutes" ? "activee" : "unactivee"}>Find Travel Routes</Link>
          </li>
          
          <li>
          <button style={{opacity:"0"}} id="test_button" onClick={test_function}> Test Button </button><span id="test_text"></span>
          </li>
          <li style={{ float: 'right' }}>
            <ToggleThemeButton/> 
          </li>
          <li style={{ float: 'right'}} className="dropdown">
            <div className="dropbtn">
              { !userLoggedIn ? (
                <Link id = "loginright" to="/login" className={location.pathname === "/login" ? "activee" : "unactivee"}>Login</Link> 
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
            <Link to="/announcements" className={location.pathname === "/announcements" ? "activee" : "unactivee"}>Announcements</Link>
          </li>
      </ul>
      {path === "/" ?
      <>
        <Outlet />
        <EndDiv/>
      </> : <>
        <Outlet />
      </>
      }
      
    </div>
  )
};

export default NavBar;
