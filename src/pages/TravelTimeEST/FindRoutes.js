import { Outlet, Link } from "react-router-dom";
import { useState } from 'react';
import "../stylesheets/traveltimeest.css";
import Popup from "../Components/Popup";

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
        <h1 style={{textAlign:'center'}}>Search Now</h1>
        <form onSubmit={handleSubmit}>
          <label> 
            From: <input  type="text"  name="from" value={inputs.from || ""} onChange={handleChange}/>
            <button>Nearby</button>
          </label>
          <label> 
            To: <input type="text" name="to" value={inputs.to || ""} onChange={handleChange}/>
          </label>
          <input  type="submit" value="Find" className="buton"/>
        </form>
      </>
    );
}

export default FindRoutes; 