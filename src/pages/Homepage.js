import './stylesheets/homepage.css';
import './stylesheets/adjustSize.css';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { LoginStatusContext } from '../index';
import { ThemeContext } from './Components/ToggleThemeButton';
import SavedRoutes from "./TravelRoutes/SavedRoutes";

const Homepage = () => {
  const {userLoggedIn, setUserLoggedIn} = useContext(LoginStatusContext);
  const [favorites, setFavorites] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0); // Toggle state
  const [fade, setFade] = useState(false);  // Controls fade animation



  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate('/about'); 
  };

   const { isDarkTheme } = useContext(ThemeContext);

  const navigate2 = useNavigate();
  const handleNavigation2 = () => {
    document.getElementById("getstarted").scrollIntoView({behavior:"smooth"});
  };

  const Slide1 = () => (
    <div className="banner1"></div>
  );

  const Slide2 = () => (
    <div className="banner2">
      <div className="card2">
        <div className="card-content2">
          <h1>More About Us!</h1>
          <p>Extra info, Contact Details, Credits, etc.</p>
          <button className="view-more-2" onClick={handleNavigation}>
            View More <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );

  const Slide3 = () => (
    <div className="banner3">
      <div className="card3">
        <div className="card-content3">
          <h2>FIND OUT HOW THIS WEBSITE WORKS!</h2>
          <button className="view-more-3" onClick={handleNavigation2}>
            DIRECT<span>→</span>
          </button>
        </div>
      </div>
    </div>
  );

  const slides = [<Slide1 />, <Slide2 />, <Slide3 />];

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(true);
      setTimeout(() => {
        setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
        setFade(false); 
      }, 500);
    }, 5000);
    return () => clearTimeout(timer);
  }, [slideIndex]);

  const handleToggle = () => {
    setTimeout(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 50); 
  };

  const handleToggle2 = () => {
    setTimeout(() => {
      setSlideIndex((prevIndex) =>
        (prevIndex - 1 + slides.length) % slides.length
      ); 
    }, 50);
  };

  const Emails = (props) => (
    <li className="endBannerHeadContent">
      <a href={"mailto: " + props.lnkemail}>{props.email}</a>
    </li>
  );

  
  const Socials = (props) => (
    <li className="endBannerHead2Content">
      <a href={props.social}>
        <img src={props.socialimg} alt="Social Icon" />
      </a>
    </li>
  );

  
  // BUS WILL ONLY APPEAR IF UR THERE AT THE PART OF THE PAGE
  useEffect(() => {
    const elementsToObserve = document.querySelectorAll(".busSlide, .blueGraphic, .blueGraphic2, .videoNyoom, .Transparency, .Innovation, .Inclusivity, .Empathy")

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          entry.target.classList.remove("hidden");
        }
      });
    });

    elementsToObserve.forEach((element) => {
      observer.observe(element);
      console.log(element);
    });

    return () => {
      elementsToObserve.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);


  const GetStartedElements = () =>{
    return(
      <>

      <div className="centering" id="getstarted">
      
      <ul className="items">
        <li>
          <Link to="/arrivaltimes"><img className="widgets" src="./images/icons/searchIcon.png"></img></Link>
          <br/>
          <p className="widgetsText">Search For The Nearest <span className="widgetsTextt">Bus Timing</span> Arrival</p>
          <p className="widgetsBody"> Easily find bus arrival times with our quick search feature. Simply enter your location or bus stop, and get real-time updates on when the next bus will arrive, helping you plan your journey with ease. </p>
        </li>
        <li><Link to="/travelroutes"><img className="widgets" src="./images/icons/saveIcon.png"></img></Link>
        <br/>
        <p className="widgetsText2">Save Your Favoured <span className="widgetsTextt2">Travel Preferences</span></p>
        <p className="widgetsBody2"> Keep track of your preferred buses, routes, and travel details with our save feature. Store your favorites for easy access and quickly plan your trips whenever you need them." </p>
        </li>
        <li><Link to="/settings"><img className="widgets2" src="./images/icons/flagIcon.png"></img></Link>
        </li>
      </ul>
      </div>
      <p className="widgetsText3">Map Out Your <span>Nearest</span> Bus Stops</p>
      <p className="widgetsBody3"> Effortlessly find the nearest bus stop from your current location. Using real-time GPS tracking, the interactive map pinpoints the closest stops, provides walking directions, and even displays upcoming bus arrival times.</p>
      </>

    )
  }

  const emails = [
    { id: 1, class: "classText", class2: "classTextText", email: 'sdmgo15@gmail.com', lnkemail: 'sdmgo15@gmail.com' },
    { id: 2, class: "classText2", class2: "classTextText2", email: 'bryuhh1234@rp.edu.sg', lnkemail: 'bryuh1234@gmail.com' },
    { id: 3, class: "classText3", class2: "classTextText3",email: 'agilbinla@yahoo.com', lnkemail: 'aquil@gmail.com' },
    { id: 4, class: "classText4", class2: "classTextText4", email: 'ca2short@hotmale.com', lnkemail: 'calong1234@gmail.com' }
  ];

  const socials = [
    { id: 1, social: 'https://x.com/SDomingoYT', socialimg: './images/x.png' },
    { id: 2, social: 'https://www.youtube.com/c/SDomingo', socialimg: './images/youtube.png' },
    { id: 3, social: 'https://www.roblox.com/users/686546843/profile', socialimg: './images/instagram.png' }
  ];

const ClassSlide = (props) =>{
  return(
    <p className={props.class}> <a className={props.class2} href={"mailto: " + props.lnkemail}>{props.email}</a></p>
  )
}

  const AboutUs = (props) =>{
   return( <>
      <h1 className="abtHeader">About Us</h1>
      <p className="abtBody">At Nyoom, we are redefining the way Singapore travels. Our mission is to prioritize convenience, ensuring every journey is seamless, efficient, and hassle-free. Whether you're navigating the bustling streets of the city or planning your next adventure, Nyoom is here to make your travel experience as smooth as possible.</p>
      <p className="abtBody2">Rooted in innovation and customer-centric solutions, we believe in transforming everyday commutes into moments of ease and reliability. By leveraging advanced technology and a deep understanding of Singapore's vibrant landscape, Nyoom empowers you to move smarter, faster, and more conveniently than ever before.</p>
      <h1 className="contactUsHeader">Contact Us!</h1>
      <div className="contt">
      <img src="./images/icons/checkList.png" className="classlist"/>
     
      {emails.map(email => <ClassSlide key={email.id} class ={email.class} class2={email.class2} lnkemail={email.lnkemail} email={email.email} />) }
      
     </div>

     <img className="call" src="./images/icons/callIcon.png"></img>
     <p className="callno">+91 98008 25424</p>
     <img className="addr" src="./images/icons/Addr.png"></img>
     <a className="addrno" href="https://www.google.com/maps/place/Afghanistan+Family+Restaurant/@1.3535609,103.951398,17z/data=!3m2!4b1!5s0x31da3d1b4343a59f:0x16e6fa8953f96f5a!4m6!3m5!1s0x31da3d1b6854ffb7:0xfea0f762f31c7422!8m2!3d1.3535555!4d103.9539729!16s%2Fg%2F1vs1pcwg?entry=ttu&g_ep=EgoyMDI1MDEyMi4wIKXMDSoASAFQAw%3D%3D">500 Dover Rd, Singapore 139651</a>
     

    </>
   )
  }
  

  
  return (

    <>
      <div className={`fade ${fade ? "fade-out" : "fade-in"}`}>
        {slides[slideIndex]}
      </div>
      
      <div style={{ display: 'inline-block' }}>
        <button className="bannerbuttonLeft" type="button" onClick={handleToggle2} />
        <button className="bannerbuttonRight" type="button" onClick={handleToggle} />
      </div>

      <div style={{ display: "inline-block" }}>
      </div>

      <hr className="lineunderslides" />
      
      <h1 className="subhead"> Revolutionize Your <br />Travel Experience </h1>
      <h1 className="subpar">
        Optimizing Bus & Train Travel for <br /> Time-Saving, Effortless Journey
      </h1>
      <p className="subBody"> Plan your journeys effortlessly with our all-in-one travel companion! Our platform allows you to track real-time public bus arrival timings, find the shortest and fastest routes to your destination, and stay on top of MRT schedules. With our advanced route optimization algorithm, we combine bus, MRT, and walking options to provide you with the quickest and most efficient way to get where you need to go. Plus, save your favorite routes for easy access and a stress-free commute every time.

      Whether you're navigating the city for work or play, we’ll make sure you get there faster and smarter.</p>
      
      <img className="busSlide hidden" src={isDarkTheme ? "./images/bus.png": "./images/busLight.png"} alt="Bus Image" />
      <video className="videoNyoom hidden" controls><source src='./images/NyoomCOM.mp4' type='video/mp4'></source></video>
      <img className="blueGraphic hidden" src={isDarkTheme ? "./images/graphics/blueGraphic2.png" : "./images/graphics/blueLightGraphic2.png"} alt="Blue Graphic" />
      <img className="blueGraphic2 hidden" src={isDarkTheme ? "./images/graphics/blueGraphic3.png" : "./images/graphics/blueLightGraphic3.png"} />

      <hr className="lineunderslides2" />

      <div className="instr"> <GetStartedElements /></div>
      <img className="bgGetStarted" src="./images/graphics/graphicBg.png" />

      <div className="abtus"> <AboutUs /> </div>
      <img className="AboutUsGrap" src="./images/graphics/blueGraphic4.png"></img>
      <img className="AboutUsGrap2" src="./images/graphics/blueGraphic4.png"></img>

      <div class="values-section">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="Transparency hidden">
          <p>Transparency</p>
        </div>
        <div className="Innovation">
          <p>Innovation</p>
        </div>
        <div className="Inclusivity">
          <p>Inclusivity</p>
        </div>
        <div className="Empathy">
          <p>Empathy</p>
        </div>
      </div>
      </div>


    </>
  );
};

export default Homepage;
