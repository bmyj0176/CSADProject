import { Outlet, Link } from "react-router-dom";
import { useState } from 'react';
import "../stylesheets/traveltimeest.css";

const FindRoutes = () => {
  

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

     return(
      <>
      <h1>Search Now</h1>
    <form onSubmit={handleSubmit}>
    <label> From: <input  type="text"  name="from" value={inputs.from || ""} onChange={handleChange}/></label>
    <label> To: <input type="text" name="to" value={inputs.to || ""} onChange={handleChange}/></label>
    <input  type="submit" value="Find" />
  </form>
   
</>
);
}

export default FindRoutes; 