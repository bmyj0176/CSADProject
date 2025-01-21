import './stylesheets/homepage.css';
import React, { useState, useEffect, useContext } from 'react';
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


  const Emails = (props) =>{
    return <li className="endBannerHeadContent"> <a href= {"mailto: " + props.lnkemail}>{props.email}</a></li>
  }

  const Socials = (props) => {
    return <li className="endBannerHead2Content"> <a href={props.social}><img src={props.socialimg}/></a> </li>
  }

  const emails = [
    {id:1, email: 'sdmgo15@gmail.com', lnkemail: 'sdmgo15@gmail.com'},
    {id:2, email: 'bryuhh1234@rp.edu.sg', lnkemail: 'bryuh1234@gmail.com'},
    {id:3, email: 'agilbinla@yahoo.com', lnkemail: 'aquil@gmail.com'},
    {id:4, email: 'ca2short@hotmale.com', lnkemail: 'calong1234@gmail.com'}
  ]

  const socials = [
    {id:1, social: 'https://x.com/SDomingoYT', socialimg:'./images/x.png'},
    {id:2, social: 'https://www.youtube.com/c/SDomingo', socialimg: './images/youtube.png'},
    {id:3, social: 'https://www.roblox.com/users/686546843/profile', socialimg: './images/instagram.png'}
  ]
  

  
  return (
    <div>
      <div className={`fade ${fade ? "fade-out" : "fade-in"}`}>
      {slides[slideIndex]}
      </div>
      
    
      <div style={{ display: 'inline-block' }}>
      <button className="bannerbuttonLeft" type="button" onClick={handleToggle2} />
      <button className="bannerbuttonRight" type="button" onClick={handleToggle} />
      </div>
      <div style={{display: "inline-block"}}>
        </div>
        <hr className="lineunderslides" />
        <h1 className="subhead"> Revolutionize Your <br/>Travel Experience  </h1>
        <h1 className = "subpar"> 
        Optimizing Bus & Train Travel for <br/> Time-Saving, Effortless Journey
        </h1>
        <p> text here text here text here text here text here text here </p>
        {/* Fixed iframe issue with proper syntax */}
      
      <div style={{display: "inline-block"}}>

      </div>
      
   
      <div className="endBanner">

        <img className="endBannerImg" src="./images/nyoom_stroke.png" />
      
        <ul className="no-bullets">
        <span className="endBannerHead"> Contact Us! </span>
        {emails.map(em => <Emails key={em.id} email={em.email} lnkemail={em.lnkemail}/>)}
        </ul>  
        <hr className="endBannerhr"/>

<h5 className="copyright"> © All rights reserved to nyoom 2025 </h5> 
        </div>

    </div>
  );
};

export default Homepage;