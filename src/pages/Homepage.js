import './stylesheets/homepage.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import SavedPresets from './Components/SavedPresetsHomepage';

const Homepage = () => {

  const [favorites, setFavorites] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0); // Toggle state
  const [fade, setFade] = useState(false);  // Controls fade animation

    const navigate = useNavigate();
    const handleNavigation = () => {
      navigate('/about'); 
    };

    const navigate2 = useNavigate();
    const handleNavigation2 = () => {
      navigate2('/getstarted'); 
    };


  const Slide1=()=>{
    return (
      <div className="banner1"> 
      
       </div>
      )
  }

  const Slide2=()=>{
    return (
    <div className="banner2"> 
  <div class="card2">
  <div class="card-content2">
    <h1>More About Us! </h1>
    <p>Extra info, Contact Details, Credits, etc.</p>
    <button class="view-more-2" onClick={handleNavigation}>
      View More <span>→</span>
    </button>
  </div>
</div>
</div>
    )
    
  }

  const Slide3=()=>{
    return (
      <div className="banner3"> 
    <div class="card3">
    <div class="card-content3">
      <h2>FIND OUT HOW THIS WEBSITE WORKS!</h2>
      <button class="view-more-3" onClick={handleNavigation2}>
        Open<span>→</span>
      </button>
    </div>
  </div>
  </div>
      )
  }

  const slides = [<Slide1/>, <Slide2/>, <Slide3/>]

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(true);
      setTimeout(() => {
        setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length); // op as hell 
        setFade(false); 
      }, 500);
    }, 5000);
    return () => clearTimeout(timer);
  }, [slideIndex]); 

  const handleToggle = () => {

    setFade(true);
    setTimeout(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length); 
      setFade(false); 
    }, 500); 
  };

  const handleToggle2 = () => {
    setFade(true);
    setTimeout(() => {
      setSlideIndex((prevIndex) =>
        (prevIndex - 1 + slides.length) % slides.length
      ); 
      setFade(false);
    }, 500);
  };
  
  
  return (
    <div>
      <div className={`fade ${fade ? "fade-out" : "fade-in"}`}>
      {slides[slideIndex]}
      </div>
      <button className="bannerbuttonRight" type="button" onClick={handleToggle} />
      <button className="bannerbuttonLeft" type="button" onClick={handleToggle2} />
      <img className="nyoom" src="./images/nyoom.png"/>
      <div style={{textAlign: "center"}}>
        {true &&
          <SavedPresets/>
        } 
      </div>
      <h3 style={{textAlign: "center"}}> Bus? Or maybe I'll take it all. </h3>
      <div style={{ display: 'inline-block' }}>
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