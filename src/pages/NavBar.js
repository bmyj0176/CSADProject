import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate  } from "react-router-dom";
import './stylesheets/navbar.css';
import { getBusTiming } from '../helper_functions';
import ToggleThemeButton from './Components/ToggleThemeButton';
import { getMap } from '../travel_algorithms_bus'

const NavBar = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [path, setPath] = useState("/");
  const location = useLocation(); 
  const navigate = useNavigate();

  useEffect(() => {
    setPath(location.pathname); 
  }, [location]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUserLoggedIn(true);
    }
  }, []);

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('savedarrivaltimes');
    navigate('/');
    window.location.reload();
  }

  async function test_function() {
    console.log(await getBusTiming("46971", "901"))
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
                <Link className = "loginright" to="/login" >Login</Link> 
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
          <li className="aboutt" style={{ float: 'right'}}>
            <Link to="/about" className={location.pathname === "/about" ? "activee" : ""}>About</Link>
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
