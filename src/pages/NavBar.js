import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate  } from "react-router-dom";
import './stylesheets/navbar.css';
import { getAllBusStops } from '../helper_functions'
import { getBusDirections } from '../helper_functions';
import ToggleThemeButton from './Components/ToggleThemeButton';

const NavBar = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const location = useLocation(); 
  const navigate = useNavigate();

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
    console.log(await getBusDirections("185"))
  }
  async function test_function2() {
    console.time("Time Taken:");
    console.log("Test Start");
    console.log(await getAllBusStops("901", 1));
    console.timeEnd("Time Taken:");
    console.log("Test End");
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
          <button id="test_button2" onClick={test_function2}> Test Button 2 </button><span id="test_text"></span>
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
                    
                    <Link to="/settings" className="dropdownItem">Settings</Link><br/>
                    <Link to="/ost" className="dropdownItem">Soundtrack</Link><br/>
                    { userLoggedIn && <button id="logout" onClick={logout}>Log Out</button>}
                  </div>
                </>
              )}
            </div>
          </li>
          <li className="aboutt" style={{ float: 'right'}}>
            <Link to="/about" className={location.pathname === "/about" ? "activee" : ""}>About</Link>
          </li>
      </ul>
      <Outlet />
    </>
  )
};

export default NavBar;
