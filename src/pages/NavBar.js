import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from "react-router-dom";
import { BusRoutes } from '../api_caller';
import { getAllBusServices } from '../helper_functions';
import './stylesheets/navbar.css';
import { dijkstra, shortest_path } from '../travel_algorithms';
import ToggleThemeButton from './Components/ToggleThemeButton';

const NavBar = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const location = useLocation(); 
  const elementId = "light";
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUserLoggedIn(true);
    }
  }, []);

  function logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  async function test_function() {
    try {
        const busServices = await getAllBusServices("46971");
        console.log(busServices);
    } catch (error) {
        console.error("Error fetching bus services:", error);
    }
    //console.log(await getAllBusStops("900", 1))
    //console.log(dijkstra("A"));
    console.log(await shortest_path(1, 2));
    console.log("Test End");
}


  return (
    <>
      <ul className="nv">
          <li>
            <Link to="/" className={location.pathname === "/" ? "activee" : ""}><img className="nyoom" src="./images/nyoom_icon.png"/></Link>
          </li>
          <li>
            <Link to="/arrivaltimes" className={location.pathname === "/arrivaltimes" ? "activee" : ""}>Bus Arrival Times</Link>
          </li>
          <li>
            <Link to="/traveltimeest" className={location.pathname === "/traveltimeest" ? "activee" : ""}>Find Travel Routes</Link>
          </li>
          <li>
            <button id="test_button" onClick={test_function}> Test Button </button><span id="test_text"></span>
          </li>
        {/*------ ABOVE IS FLOATED LEFT, BELOW IS FLOATED RIGHT -----------------------------*/}
          <li style={{ float: 'right' }}>
            <ToggleThemeButton/> 
          </li>
          <li style={{ float: 'right' }} className="dropdown">
            <a href="javascript:void(0)" className="dropbtn">
              { !userLoggedIn ? (
                <Link className = "loginright"to="/login" >Login</Link> 
              ) : (
                <>
                  <div className="loginuser"> {localStorage.getItem('username')} </div>
                  <div className="dropdown-content">
                    <Link to="/about" className="dropdownItem">About</Link><br/>
                    <Link to="/settings" className="dropdownItem">Settings</Link><br/>
                    <Link to="/ost" className="dropdownItem">Soundtrack</Link><br/>
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
