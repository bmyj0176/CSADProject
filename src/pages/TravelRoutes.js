import { Outlet, Link } from "react-router-dom";
import TRSearchBar from "./TravelRoutes/TRSearchBar";
import FindRoutes from "./TravelRoutes/FindRoutes";
import SavedRoutes from "./TravelRoutes/SavedRoutes";
import "./stylesheets/traveltimeest.css";
import { useState } from 'react';

const TravelRoutes = () => {

  const [activePage, setActivePage] = useState("FindRoutes")
  const [otherPageText, setOtherPageText] = useState("Your Saved Routes")
  const [startPoint, setStartPoint] = useState(null)
  const [endPoint, setEndPoint] = useState(null)

  const toggleActivePage = () => {
    if (activePage === "FindRoutes") {
      setActivePage("SavedRoutes")
      setOtherPageText("Find a Route")
    } else {
      setActivePage("FindRoutes")
      setOtherPageText("Your Saved Routes")
    }
  }

  const sendToTR = (dict) => {
    setStartPoint(dict)
  }

  return (
    <>
      <ul className="tte">
        <li><button onClick={toggleActivePage} >{otherPageText}</button></li>
        {activePage === "FindRoutes" ?
        <TRSearchBar
        sendToTR={sendToTR}/> :
        <SavedRoutes/>}
      </ul>
    <Outlet />
    </>
  )
};



export default TravelRoutes;