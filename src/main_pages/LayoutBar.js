import { Outlet, Link } from "react-router-dom";

const LayoutBar = () => {

  function toggle_theme() {
    const themeLink = document.getElementById("lightdarkmode");
    if (themeLink.href.endsWith("stylesheets/darkmode.css")) {
        themeLink.href = "../stylesheets/lightmode.css";
    } else {
        themeLink.href = "../stylesheets/darkmode.css";
    }
  }  

  return (
    <>
      <table>
        <tbody>
          <tr>
              <td><Link to="/">TravelSite</Link></td>
              <td><Link to="/arrivaltimes">Arrival Times</Link></td>
              <td><Link to="/traveltimeest">Travel Time Est</Link></td>
              <td><Link to="/login">Login</Link></td>
              <td><button id="toggle_button" onClick={toggle_theme}>Change Theme</button></td>
          </tr>
        </tbody>
      </table>
    <Outlet />
    </>
  )
};


  
export default LayoutBar;