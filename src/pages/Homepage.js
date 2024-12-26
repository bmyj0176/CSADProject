import './stylesheets/homepage.css';
import React, { useState, useEffect } from 'react';


const Homepage = () => {

  const [favorites, setFavorites] = useState([]);

useEffect(() => {
  const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
  setFavorites(storedFavorites);
  
}, []);
  
  return (

    <div>
   
      <img className="nyoom" src="./images/nyoom.png"/>
      <h1 className="headd" style={{textAlign: "center"}}></h1>
      <h3 style={{textAlign: "center"}}> Bus? Or maybe I'll take it all. </h3>
      <div style={{ display: 'inline-block' }}>
        <h1 className="subhead">Your Starred Bus Stops</h1>

        <div className="favorite-list">
          {favorites.length > 0 ? (
            favorites.map((fav, index) => (
              <div key={index} className="busstopcard">
                <h3 className="busstopname">{fav.header}</h3>
                <b className="busstopnumber">{fav.subheader1}</b>
                {fav.subheader2 && <p>{fav.subheader2}</p>}
              </div>
            ))
          ) : (
            <p>No favorites yet!</p>
          )}
        </div>
      </div>
      <div style={{display: "inline-block"}}>
        <h1 className="subhead"> Never miss your buses again </h1>
        <h5 className = "subpar"> 
          Our Bus Arrival Times page will allow you to quickly search for the arrival times of buses.
        </h5>
        {/* Fixed iframe issue with proper syntax */}
      </div>
      <div style={{display: "inline-block"}}>
        <img src='./images/dancing_android.gif'/>
      </div>
      <hr style={{border: "1px solid #ccc", margin: "20px 0", width: "100%"}} />
      <div>
        <h1 className="subhead2"> More About Us </h1>
        <h5 className="subpar2"> yapyapyapyapyapyapyapyapyapyapyapyap <br/>
         yapyapyapyapyapyapyapyapyapyapyapyap </h5>
      </div>
      
    </div>
  );
};

export default Homepage;