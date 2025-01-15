import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet, Link, useLocation, useNavigate  } from "react-router-dom";
import './stylesheets/navbar.css';
import { getAllBusStops } from '../helper_functions'
import { downloadJSON } from '../helper_functions2';
import ToggleThemeButton from './Components/ToggleThemeButton';

const NavBar = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const location = useLocation(); 
  const elementId = "light";
  const isActive = (path) => location.pathname === path;
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
    const database = {};
    for (let num = 0; num < 52; num++) {
      console.log("cycle", num);
      const rawdata = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/bus-routes?skip=${num * 500}`);
      const value = rawdata.data.value;
      for (const dict of value) {
        // creating 
        if (!database[dict.ServiceNo]) {  
            database[dict.ServiceNo] = {};  
        }
        const innerMap = database[dict.ServiceNo];
        if (!innerMap[dict.Direction]) {  
            innerMap[dict.Direction] = []; 
        }
        const innestMap = innerMap[dict.Direction];
        innestMap.push([dict.BusStopCode, dict.Distance]);
        // storing start & end busstops
        if (dict.Direction === 1) {
          if (!innerMap["startend1"]) {
            innerMap["startend1"] = [dict.BusStopCode, dict.BusStopCode];
          }
          innerMap["startend1"][1] = dict.BusStopCode ;
        } else { // === 2
          if (!innerMap["startend2"]) {
            innerMap["startend2"] = [dict.BusStopCode, dict.BusStopCode];
          }
          innerMap["startend2"][1] = dict.BusStopCode;
        }
      }
    }

    console.log(database);
    downloadJSON(database)
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
            <Link to="/" className={location.pathname === "/" ? "activee" : ""}><img className="nyoom" src="./images/nyoom_icon.png"/*nyoom_icon.png*//></Link>
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
