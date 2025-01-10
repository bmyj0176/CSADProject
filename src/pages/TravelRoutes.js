import { Outlet } from "react-router-dom";
import TRSearchBar from "./TravelRoutes/TRSearchBar";
import TRoutes from "./TravelRoutes/TRoutes";
import SavedRoutes from "./TravelRoutes/SavedRoutes";
import "./stylesheets/travelroutes.css";
import { useState } from 'react';

const TravelRoutes = () => {

  const [activePage, setActivePage] = useState("FindRoutes")
  const [otherPageText, setOtherPageText] = useState("Your Saved Routes")
  const [location1, setLocation1] = useState(null);
  const [location2, setLocation2] = useState(null);

  const toggleActivePage = () => {
    if (activePage === "FindRoutes") {
      setActivePage("SavedRoutes")
      setOtherPageText("Find a Route")
    } else {
      setActivePage("FindRoutes")
      setOtherPageText("Your Saved Routes")
    }
  }

  const submitLocations = (dict1, dict2) => {
    setLocation1(dict1)
    setLocation2(dict2)
  }

  return (
    <>
      <ul className="tte">
        <li><button onClick={toggleActivePage} >{otherPageText}</button></li>
        {activePage === "FindRoutes" ?
        <TRSearchBar
        submitLocations={submitLocations}/> :
        <SavedRoutes/>} 
        {(location1 && location2) &&
        <TRoutes
        location1={location1}
        location2={location2}/>}
      </ul>
    <Outlet />
    </>
  )
};



export default TravelRoutes;