import { Outlet, Link } from "react-router-dom";
import "./stylesheets/traveltimeest.css";
import { useState } from 'react';

const TravelTimeEST = () => {

 


  return (
    <>
      <ul className="tte">
        <li><Link to="findroutes">Find Routes</Link></li>
        <li><Link to="savedroutes">Saved Routes</Link></li>
      </ul>
    <Outlet />
    

      
    </>
  )
};
  
export default TravelTimeEST;