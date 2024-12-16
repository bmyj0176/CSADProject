import { Outlet, Link } from "react-router-dom";
import "./stylesheets/traveltimeest.css";
import { useState } from 'react';

const TravelTimeEST = () => {

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);

  }


  return (
    <>
      <ul className="tte">
        <li><Link to="findroutes">Search Now</Link></li>
        <li><Link to="savedroutes">Saved Routes</Link></li>
      </ul>
    <Outlet />
    
        <form onSubmit={handleSubmit}>
        <label className="frm"> From: <input type="text" name="from" value={inputs.from || ""} onChange={handleChange}/></label>
        <label className="too"> To: <input type="text" name="to" value={inputs.to || ""} onChange={handleChange}/></label>
        <input type="submit" value="Find"/>
      </form>

      

      
       
    </>
  )
};
  
export default TravelTimeEST;