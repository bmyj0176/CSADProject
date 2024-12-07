import { Outlet, Link } from "react-router-dom";

const ArrivalTimes = () => {
  return (
    <>
    <table>
      <tbody>
        <tr>
          <td><Link to="busnumber">Bus No.</Link></td>
          <td><Link to="busstop">Bus Stop</Link></td>
          <td><Link to="stopnumber">Stop Number</Link></td>
          <td><Link to="nearme">Near Me</Link></td>
        </tr>
      </tbody>
    </table>
    <Outlet />
    </>
  )
  };
  
  export default ArrivalTimes;