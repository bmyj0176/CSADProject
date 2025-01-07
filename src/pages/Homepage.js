import './stylesheets/homepage.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

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
  <div className="card2">
  <div className="card-content2">
    <h1>More About Us! </h1>
    <p>Extra info, Contact Details, Credits, etc.</p>
    <button className="view-more-2" onClick={handleNavigation}>
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
    <div className="card3">
    <div className="card-content3">
      <h2>FIND OUT HOW THIS WEBSITE WORKS!</h2>
      <button className="view-more-3" onClick={handleNavigation2}>
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

    //setFade(true);
    setTimeout(() => {  
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length); 
      //setFade(false); 
    }, 50); 
  };

  const handleToggle2 = () => {
    //setFade(true);
    setTimeout(() => {
      setSlideIndex((prevIndex) =>
        (prevIndex - 1 + slides.length) % slides.length
      ); 
      //setFade(false);
    }, 50);
  };
  
  
  return (
    <div>
      <div className={`fade ${fade ? "fade-out" : "fade-in"}`}>
      {slides[slideIndex]}
      </div>
      <button className="bannerbuttonRight" type="button" onClick={handleToggle} />
      <button className="bannerbuttonLeft" type="button" onClick={handleToggle2} />
      
      
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

      </div>
      
   
      <div className="endBanner">

        <img className="endBannerImg" src="./images/nyoom_stroke.png" />

        <p className="endBannerHead"> Contact Us! </p>
        <a href=""
        <p className="endBannerHead2"> Follow Us! </p>
        <p className="endBannerHead3"> Site Map </p>

        <hr className="endBannerhr"/>

        <h5 className="copyright"> © All rights reserved to nyoom 2024 </h5>

    </div>
    </div>
  );
};

export default Homepage;