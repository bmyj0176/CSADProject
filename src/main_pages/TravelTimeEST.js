import { Outlet, Link } from "react-router-dom";
import "./stylesheets/traveltimeest.css";

const TravelTimeEST = () => {
  return (
    <>
      <ul className="tte">
        <li><Link to="findroutes">Search Now</Link></li>
        <li><Link to="savedroutes">Saved Routes</Link></li>
      </ul>
    <Outlet />
    </>
  )
};
  
export default TravelTimeEST;