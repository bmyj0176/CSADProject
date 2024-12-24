import { Outlet, Link } from "react-router-dom";
import FindRoutes from "./TravelTimeEST/FindRoutes";
import SavedRoutes from "./TravelTimeEST/SavedRoutes";
import "./stylesheets/traveltimeest.css";
import { useState } from 'react';



const TravelTimeEST = () => {

  const [activePage, setActivePage] = useState("FindRoutes")
  const [otherPageText, setOtherPageText] = useState("Your Saved Routes")

  const toggleActivePage = () => {
    if (activePage === "FindRoutes") {
      setActivePage("SavedRoutes")
      setOtherPageText("Find a Route")
    } else {
      setActivePage("FindRoutes")
      setOtherPageText("Your Saved Routes")
    }
  }

  return (
    <>
      <ul className="tte">
        <li><button onClick={toggleActivePage} >{otherPageText}</button></li>
        {activePage === "FindRoutes" ?
        <FindRoutes/> :
        <SavedRoutes/>}
      </ul>
    <Outlet />
    </>
  )
};



export default TravelTimeEST;