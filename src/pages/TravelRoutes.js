import { Outlet } from "react-router-dom";
import TRSearchBar from "./TravelRoutes/TRSearchBar";
import TRoutes from "./TravelRoutes/TRoutes";
import "./stylesheets/travelroutes.css";
import ToggleThemeButton from './Components/ToggleThemeButton';
import { ThemeContext } from './Components/ToggleThemeButton';
import { useState,useContext } from 'react';
import { EndDiv } from './Homepage.js';

const TravelRoutes = () => {

  const [location1, setLocation1] = useState(null);
  const [location2, setLocation2] = useState(null);
   const { isDarkTheme } = useContext(ThemeContext);
  const submitLocations = (dict1, dict2) => {
    setLocation1(dict1)
    setLocation2(dict2)
  }

  return (
    <>
      <ul className="tte">
        <TRSearchBar
        submitLocations={submitLocations}/> 
        {(location1 && location2) &&
        <TRoutes
        location1={location1}
        location2={location2}/>}
      </ul>
      <p style={{paddingBottom: "75vh", opacity: "0"}}></p>
    <Outlet />
   
<EndDiv/>
    </>
  )
};

export default TravelRoutes;