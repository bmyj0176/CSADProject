import { Outlet, Link } from "react-router-dom";
import React, { useState } from "react";
import "./stylesheets/arrival_times.css";

const ArrivalTimes = () => {



  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled((prevState) => !prevState);
  };

  const linkStyle = isToggled
    ? { fontWeight: "bold", textDecoration: "shadow=10px" }
    : { fontWeight: "none", textDecoration: "shadow=0px" };




  return (
    <>
    <ul className="at">
      <li><Link to="busnumber" style={linkStyle} onClick={handleToggle}> Bus No.</Link></li>

      <li><Link to="busstop" style={linkStyle} onClick={handleToggle}>Bus Stop</Link></li>

      <li><Link to="stopnumber" style={linkStyle} onClick={handleToggle}>Stop Number</Link></li>

      <li><Link to="nearme" style={linkStyle} onClick={handleToggle}>Near Me</Link></li>

    </ul>
    <Outlet />
    </>
  )
  };

  export default ArrivalTimes;