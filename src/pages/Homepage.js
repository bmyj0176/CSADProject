import './stylesheets/homepage.css';
import './stylesheets/adjustSize.css';
import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate, Link } from "react-router-dom";
import { LoginStatusContext } from '../index';
import { ThemeContext } from './Components/ToggleThemeButton';
import SavedArrivalTimes from "./ArrivalTimes/SavedArrivalTimes";
import "./stylesheets/ATpages/arrivaltimes.css";
import "./stylesheets/ATpages/at_list.css";
import Popup from "./Components/Popup";

const Homepage = () => {
  const {userLoggedIn, setUserLoggedIn} = useContext(LoginStatusContext);
  const [slideIndex, setSlideIndex] = useState(0); // Toggle state
  const [fade, setFade] = useState(false);  // Controls fade animation
  const [throwPopup, setThrowPopup] = useState(false)
  const [favedItems, setFavedItems] = useState(() => {
   
   // SAVED ITEMS // ------------------------------------------------------------
    const storedFavedItems = localStorage.getItem("savedarrivaltimes")
    if (!storedFavedItems) // no localstorage data
      return []
    return JSON.parse(storedFavedItems)
  })

  const onFavItem = (dict, doAdd) => {
    let favedItemsCopy = [...favedItems]
    if (!doAdd) {
      favedItemsCopy = favedItemsCopy.filter(item => JSON.stringify(item) !== JSON.stringify(dict))
    }
    else {
      //setThrowPopup(true)
      favedItemsCopy.push(dict)
    }
    setFavedItems(favedItemsCopy)
    const key = "savedarrivaltimes"
    localStorage.setItem(key, JSON.stringify(favedItemsCopy))
    window.dispatchEvent(new CustomEvent('localStorageUpdate', { detail: { key } }));
  }

  //--------------------------------------------------------------------------------------------
 

  const navigate = useNavigate();
  const handleNavigation = () => {
    console.log(window.innerHeight);
    document.getElementById("abtus").scrollIntoView({behavior: "smooth"});
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
        <div className="SearchGS">
        <Link to="/arrivaltimes"><img className="widgets" src="./images/icons/searchIcon.png"></img></Link>
       <p className="widgetsText"> Search For The Nearest <span>Bus Timing</span> Arrival</p>
       <p className="widgetsBody"> Easily find bus arrival times with our quick search feature. Simply enter your location or bus stop, and get real-time updates on when the next bus will arrive, helping you plan your journey with ease. </p>
        </div>
        <div className="SaveGS">
        <Link to="/travelroutes"><img className="widgets" src="./images/icons/saveIcon.png"></img></Link>
        <p className="widgetsText2">Save Your Favoured <span>Travel Preferences</span></p>
        <p className="widgetsBody2"> Keep track of your preferred buses, routes, and travel details with our save feature. Store your favorites for easy access and quickly plan your trips whenever you need them." </p>
        </div>
        <div className="MapGS">
        <Link to="/arrivaltimes"><img className="widgets2" src="./images/icons/flagIcon.png"></img></Link>
        <p className="widgetsText3">Map Out Your <span>Nearest</span> Bus Stops</p>
        <p className="widgetsBody3"> Find the closest bus stop to your location with our 'Near Me' feature. Simply enable location services, and we’ll map out the nearest bus stops, making it easier for you to catch your ride without the hassle.</p>
        </div>


     </div>
     <div className="centering2">
     <div className="TravelGS">
        <Link to="/travelroutes"><img className="widgets3" src="./images/paperplane.png"></img></Link>
        <p className="widgetsText4">Avoid the hassle, and <span>get moving</span></p>
        <p className="widgetsBody4">Say goodbye to long waits and unnecessary detours! With Travel Routes, our algorithm analyze public transport schedules, and route efficiency to get you to your destination as quickly as possible</p>
        </div>
        <div className="AnnGS">
          <Link to="/announcements"><img className="widgets4" src="./images/bell.png"></img></Link>
          <p className="widgetsText5">Get <span>real-time updates </span> on disruptions & delays in public transport.</p>
          <p className="widgetsBody5"> We bring you instant notifications on public transport disruptions, delays, and detours—straight from LTA. Whether it’s a train breakdown, or unexpected congestion, you’ll know before it affects your journey.</p>
        </div>
        </div>
      </>

    )
  }

  const emails = [ 
    { id: 1, class: "classText", class2: "classTextText", email: 'sdmgo15@gmail.com', lnkemail: 'sdmgo15@gmail.com' },
    { id: 2, class: "classText2", class2: "classTextText2", email: 'bryong0176@gmail.com', lnkemail: 'bryong0176@gmail.com' },
    { id: 3, class: "classText3", class2: "classTextText3",email: 'ahmadaqilyusop@gmail.com', lnkemail: 'ahmadaqilyusop@yahoo.com' },
    { id: 4, class: "classText4", class2: "classTextText4", email: 'calong4048@gmail.com', lnkemail: 'calong4048@gmail.com' }
  ];

const ClassSlide = (props) =>{
  return(
    <p className={props.class}> <a className={props.class2} href={"mailto: " + props.lnkemail}>{props.email}</a></p>
  )
}


  const AboutUs = () =>{
   return( <>
      <h1 className="abtHeader">About Us</h1>
      <p className="abtBody">At Nyoom, we are redefining the way Singapore travels. Our mission is to prioritize convenience, ensuring every journey is seamless, efficient, and hassle-free. Whether you're navigating the bustling streets of the city or planning your next adventure, Nyoom is here to make your travel experience as smooth as possible.</p>
      <p className="abtBody2">Rooted in innovation and customer-centric solutions, we believe in transforming everyday commutes into moments of ease and reliability. By leveraging advanced technology and a deep understanding of Singapore's vibrant landscape, Nyoom empowers you to move smarter, faster, and more conveniently than ever before.</p>
      <h1 className="contactUsHeader">Contact Us!</h1>
      <div className="contt">
      <img src="./images/icons/checkList.png" className="classlist"/>
     
      {emails.map(email => <ClassSlide key={email.id} class ={email.class} class2={email.class2} lnkemail={email.lnkemail} email={email.email} />) }
      
     </div>
      <div class="contacts">
     <img className="call" src="./images/icons/callIcon.png"></img>
     <p className="callno">+91 98008 25424</p>
     <img className="addr" src="./images/icons/Addr.png"></img>
     <a className="addrno" href="https://www.google.com/maps/place/Afghanistan+Family+Restaurant/@1.3535609,103.951398,17z/data=!3m2!4b1!5s0x31da3d1b4343a59f:0x16e6fa8953f96f5a!4m6!3m5!1s0x31da3d1b6854ffb7:0xfea0f762f31c7422!8m2!3d1.3535555!4d103.9539729!16s%2Fg%2F1vs1pcwg?entry=ttu&g_ep=EgoyMDI1MDEyMi4wIKXMDSoASAFQAw%3D%3D">500 Dover Rd, Singapore 139651</a>
     </div>

    </>
   )
  }
  
  return (
      <>  
      <div id = 'slide' className={`fade ${fade ? "fade-out" : "fade-in"}`}>
        {slides[slideIndex]}
      </div>
      
      <div style={{ display: 'inline-block' }}>
        <button className="bannerbuttonLeft" type="button" onClick={handleToggle2} />
        <button className="bannerbuttonRight" type="button" onClick={handleToggle} />
      </div>

      <div style={{ display: "inline-block" }}>
      </div>
      
      <div className="savedHP">
      <ul className="horizontal-listHP">
       <li><SavedArrivalTimes 
        favedItems={favedItems}
        onFavItem={onFavItem}
        page="Bookmarked"
      />
      </li>
      </ul>
      </div>

      {
        favedItems.map((favedItems, index) => (
          <div key={index}>{favedItems[index]}</div>
        ))
      }

     <div className="wrapper">
      <hr className="lineunderslides" />

      <h1 className="subhead"> Revolutionize Your <br />Travel Experience </h1>
      <h1 className="subpar">
        Optimizing Bus & Train Travel for <br /> Time-Saving, Effortless Journey
      </h1>
      <p className="subBody"> Plan your journeys effortlessly with our all-in-one travel companion! Our platform allows you to track real-time public bus arrival timings, find the shortest and fastest routes to your destination, and stay on top of MRT schedules. With our advanced route optimization algorithm, we combine bus, MRT, and walking options to provide you with the quickest and most efficient way to get where you need to go. Plus, save your favorite routes for easy access and a stress-free commute every time.

      Whether you're navigating the city for work or play, we’ll make sure you get there faster and smarter.</p>
      
      <div className="Graphics-Video-Bus">
      <img className="busSlide hidden" src={isDarkTheme ? "./images/bus.png": "./images/busLight.png"} alt="Bus Image" />
      <video className="videoNyoom hidden" controls><source src='./images/NyoomCOM.mp4' type='video/mp4'></source></video>
      <img className="blueGraphic hidden" src={isDarkTheme ? "./images/graphics/blueGraphic2.png" : "./images/graphics/blueLightGraphic2.png"} alt="Blue Graphic" />
      <img className="blueGraphic2 hidden" src={isDarkTheme ? "./images/graphics/blueGraphic3.png" : "./images/graphics/blueLightGraphic3.png"} />
      </div>

      <hr className="lineunderslides2" />

      <div className="instr"> <GetStartedElements />
      <img className="bgGetStarted" src="./images/graphics/graphicBg.png" /></div>


      <div className="abtus" id="abtus"> <AboutUs /> </div>
      <div className="abtusGrap"><img className="AboutUsGrap" src="./images/graphics/blueGraphic4.png"></img>
      <img className="AboutUsGrap2" src="./images/graphics/blueGraphic4.png"></img>
      </div>
      <div class="values-section">
        <h2 className="ourValues">Our Values</h2>
        <div className="values-grid">
          <div className="Transparency hidden">
            <img src="./images/icons/Transparency.png"></img>
          <p>Transparency</p>
        </div>
        <div className="Innovation">
        <img src="./images/icons/Innovation.png"></img>
          <p>Innovation</p>
        </div>
        <div className="Inclusivity">
        <img src="./images/icons/Inclusivity.png"></img>
          <p>Inclusivity</p>
        </div>
        <div className="Empathy">
          <img src="./images/icons/Empathy.png"></img>
          <p>Empathy</p>
        </div>
      </div>
      </div>
    
    </div>
    </>
  );
};

export const EndDiv = () => {

  const emails = [ 
    { id: 1, class: "classText", class2: "classTextText", email: 'sdmgo15@gmail.com', lnkemail: 'sdmgo15@gmail.com' },
    { id: 2, class: "classText2", class2: "classTextText2", email: 'bryong0176@gmail.com', lnkemail: 'bryong0176@gmail.com' },
    { id: 3, class: "classText3", class2: "classTextText3",email: 'ahmadaqilyusop@gmail.com', lnkemail: 'ahmadaqilyusop@yahoo.com' },
    { id: 4, class: "classText4", class2: "classTextText4", email: 'calong4048@gmail.com', lnkemail: 'calong4048@gmail.com' }
  ];

  const socials = [
    { id: 1, social: 'https://x.com/SDomingoYT', socialimg: './images/x.png', class: 'socialIcon1'},
    { id: 2, social: 'https://www.youtube.com/c/SDomingo', socialimg: './images/youtube.png', class: 'socialIcon2' },
    { id: 3, social: 'https://www.roblox.com/users/686546843/profile', socialimg: './images/instagram.png', class: 'socialIcon3' }
  ];

  const EndDivContact = (props) => {
    return (
      <li className="contactItem">
        <img className="contactIcon" style={{marginRight: '3vw'}} src="./images/icons/emailIcon.png" />
        {props.email === 'ahmadaqilyusop@gmail.com' ? (
          <>
            <a onClick={() => {
                const audio = new Audio("./audio/bad_piggies_drip.mp3"); // Replace with actual path
                audio.play();
              }}>
              {props.email}
            </a>
          </>
        ) : (
          <>
            <a href={"mailto:" + props.lnkemail}>
              {props.email}
            </a>
          </>
        )}
      </li>
    );
}

  const EndDivSocial = (props) =>{
    return (<li>
    <a className={props.class} href={props.social}> <img className={props.class} src={props.socialimg}/>
  </a>
  </li>
    )
  }

  const ButtonUp = () => {
    const location = useLocation();  // Access current location object
    const currentPage = location.pathname;  // Get the current path
    if (currentPage !== "/") {
      return null // hide if no hahve (non homepage)
    }
    return (
      <button className="btnUp" onClick={() => document.getElementById('slide').scrollIntoView({ behavior: "smooth" })}>
        <img src='./images/icons/arrowToUp.png' />
      </button>
    );
  };

  return (
    <div className="credits">
      <div className="endDiv">
        <button type="button" className="endLogo"></button>
        <hr className="copyrightLine"></hr>
        <p className="copyright">© All rights reserved to nyoom 2025</p>
        <div className="emailListing-container">
        <ul className="emailListing">
          <p className="GetTouch" style={{marginRight:'3vw'}}>Get In Touch</p>
          {emails.map(emap => <EndDivContact key={emap.id} lnkemail={emap.lnkemail} email={emap.email}/>)}
        </ul>
        </div>
        <div className="socialListing-container">
        <p className="GetSocials">Follow Our Socials!</p>
        <ul className="socialListing">
          {socials.map(smap => <EndDivSocial key={smap.id} social={smap.social} socialimg={smap.socialimg} class={smap.class}/>)}
        </ul>
        </div>
        <div className="siteMap-container">
          <ul className="siteList">
          <p className="GetSite">Site Map</p>
          <li> <button className="Site-Homepage"onClick={()=>{document.getElementById("slide").scrollIntoView({behavior: "smooth"});}}>Homepage</button> </li>
          <li> <Link to='/arrivaltimes'>Arrival Times</Link> </li>
          <li> <Link to='/travelroutes'>Travel Routes</Link> </li>
          <li> <Link to='/announcements'>Announcements</Link> </li>
          </ul>
        </div>
        
      </div>
      <ButtonUp/>
    </div>

  )
}

export default Homepage;
