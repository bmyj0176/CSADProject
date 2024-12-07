import { Outlet, Link } from "react-router-dom";

const TravelTimeEST = () => {
  return (
    <>
    <table>
      <tbody>
        <tr>
          <td><Link to="findroutes">Search Now</Link></td>
          <td><Link to="savedroutes">Saved Routes</Link></td>
        </tr>
      </tbody>
    </table>
    <Outlet />
    </>
  )
};
  
export default TravelTimeEST;