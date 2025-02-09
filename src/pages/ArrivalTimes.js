import React, { useState, useEffect, useContext} from "react";
import Popup from "./Components/Popup";
import ATSearchBar from "./ArrivalTimes/ATSearchBar";
import "./stylesheets/ATpages/arrivaltimes.css";
import { ThemeContext } from './Components/ToggleThemeButton';
import ArrivalTimesList from "./ArrivalTimes/ArrivalTimesList";
import SavedArrivalTimes from "./ArrivalTimes/SavedArrivalTimes";
import ArrivalTimesElement from "./ArrivalTimes/ArrivalTimesElement";
import ATSearchResult from "./ArrivalTimes/ATSearchResult";

const ArrivalTimes = () => {
  const [toggles, setToggles] = useState({
    busNo: null,
    busStop: null,
    nearMe: null,
  });

  const [throwPopup, setThrowPopup] = useState(false)
  const [searchResult, setSearchResult] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [recentSearches, setRecentSearches] = useState([])
  const [showFav, setShowFav] = useState(false)
  const [selectedList, setSelectedList] = useState(-1) // "ATSearchBar" vs "SavedArrivalTimes"
  const [favedItems, setFavedItems] = useState(() => {
    const storedFavedItems = localStorage.getItem("savedarrivaltimes")
    if (!storedFavedItems) // no localstorage data
      return []
    return JSON.parse(storedFavedItems)
  })

  const addSearchResult = (searchResult) => {
    const currentHistory = JSON.parse(localStorage.getItem("recentSearches")) || [];

    const updatedList = [searchResult, ...currentHistory].slice(0,8);
    localStorage.setItem("recentSearches", JSON.stringify(updatedList));
    setRecentSearches(updatedList);
  };

  useEffect(() => {

    const storedSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedSearches); // Safely load data from localStorage
  }, []);


  useEffect(() => {
    setShowFav(favedItems.length !== 0 ?  true : false)
  }, [favedItems]);

  const onItemSelect = (index) => {
    setSelectedItem(index)
  }

  const toggleFaved =()=>{
      console.log(showFav);
      setShowFav((prev) => !prev); 
      console.log(showFav);
    };
  
  const { isDarkTheme } = useContext(ThemeContext);

  const onFavItem = (dict, doAdd) => {
    let favedItemsCopy = [...favedItems]
    if (!doAdd) {
      favedItemsCopy = favedItemsCopy.filter(item => JSON.stringify(item) !== JSON.stringify(dict))
    }
    else {
      setThrowPopup(true)
      favedItemsCopy.push(dict)
    }
    setFavedItems(favedItemsCopy)
    const key = "savedarrivaltimes"
    localStorage.setItem(key, JSON.stringify(favedItemsCopy))
    window.dispatchEvent(new CustomEvent('localStorageUpdate', { detail: { key } }));
  }

  const handleToggle = (buttonName) => {
    setToggles((prevToggles) => {
      if (buttonName === "nearMe") {
        if (prevToggles.nearMe === null) {
          return {
            busNo: false,
            busStop: false,
            nearMe: true,
          };
        } else {
          return {
            busNo: null,
            busStop: null,
            nearMe: null,
          };
        }
      } else {
        // Handle busNo and busStop buttons
        if (
          (prevToggles.busNo == null && prevToggles.busStop == null) ||
          (!prevToggles.busNo && !prevToggles.busStop)
        ) {
          return {
            busNo: false,
            busStop: false,
            nearMe: null,
            [buttonName]: true,
          };
        } else {
          const bools = [prevToggles.busNo, prevToggles.busStop];
          const selected = prevToggles[buttonName];
          if (selected && bools.filter((bool) => bool).length === 1) {
            return {
              busNo: null,
              busStop: null,
              nearMe: null,
            };
          } else {
            return {
              ...prevToggles,
              [buttonName]: !prevToggles[buttonName],
            };
          }
        }
      }
    });
  };

  const receiveSearchResult = (value) => {
    setSearchResult(value);
    
  };

  const defaultStyle = {
    opacity: 0.1,
  };

  const filteredOffStyle = {
     opacity: 0,
  };

  const filteredOnStyle = {
    opacity: 1,
  };

  const chooseStyle = (buttonName) => {
    return toggles[buttonName] !== null
      ? toggles[buttonName]
        ? filteredOnStyle
        : filteredOffStyle
      : defaultStyle;
  };

  const CheckBox = () =>{
  return(
    <div className="Checkbox">
      <div className="BusNo"> 
        <button onClick={() => handleToggle("busNo")}>     
          <img className="BusNoBox" src={isDarkTheme ? "./images/icons/checkbox_box.png" : "./images/icons/checkbox_box_light.png"}></img>
          <img className="BusNoTick" style={chooseStyle("busNo")} src={isDarkTheme ? "./images/icons/checkbox_tick.png" : "./images/icons/checkbox_tick_light.png"}></img>
        </button>
        <p> 
          Bus Service
          </p>
      </div>
      <div className="BusStop">
          <button onClick={() => handleToggle("busStop")}>
          <img className="BusStopBox" src={isDarkTheme ? "./images/icons/checkbox_box.png" : "./images/icons/checkbox_box_light.png"}></img>
          <img className="BusStopTick" style={chooseStyle("busStop")} src={isDarkTheme ? "./images/icons/checkbox_tick.png" : "./images/icons/checkbox_tick_light.png"}></img>
        </button>
        <p> 
          Bus Stops
          </p>
      </div>
    </div>
)
  }

  return (
    <>
     
      <div>
        {throwPopup && <Popup/>}
      </div>
      <ul className={showFav ? "horizontal-list" : "horizontal-list2"}>
      
      <li className="searchCol" id='scroll'>

      <button onClick={() => addSearchResult(searchResult)}>
        Add Search Result
      </button>
    
      <div className="Checkbox-container">

        <CheckBox />
      </div>

      {recentSearches.length===0 &&
      <img className="whitearrow" src="./images/whitearrow.png"></img>}
    
      <ATSearchBar
          
          selectedList={selectedList}
          setSelectedList={setSelectedList}
          toggleStates={toggles}
          receiveSearchResult={receiveSearchResult}
          selectedItem={selectedItem}
          onItemSelect={onItemSelect}
        />
            <button
              
              className="NearMe"
              
              style={{borderColor: isDarkTheme ? " rgb(197, 197, 242)" :" rgb(252, 204, 14)"}}
              onClick={() => handleToggle("nearMe")}
            >
              <img style={{filter: isDarkTheme ? "invert(0%)" : "invert(100%)"}} src="./images/NearMe.png"></img>
              <p>Near Me</p>
            </button>
        
        {/* <ul className="at">
           <li>
            <button
              style={chooseStyle("busNo")}
              onClick={() => handleToggle("busNo")}
            >
              <p>Bus Services</p>
            </button>
          </li>
          <li>
            <button
              style={chooseStyle("busStop")}
              onClick={() => handleToggle("busStop")}
            >
              <p>Bus Stops</p>
            </button>
          </li> 
          <li>
            <button
              style={chooseStyle("nearMe")}
              onClick={() => handleToggle("nearMe")}
            >
              <p>Near Me 🏳️</p>
            </button>
          </li>
        </ul>
        <ATSearchBar
          selectedList={selectedList}
          setSelectedList={setSelectedList}
          toggleStates={toggles}
          receiveSearchResult={receiveSearchResult}
          selectedItem={selectedItem}
          onItemSelect={onItemSelect}
        /> */
        
        }
      </li>

    
      {/*(searchResult) console log it first its a dict/object not a value so its causing error :3:3*/}

      <li className='scroll'>
        {searchResult ?
        <>
          <ArrivalTimesList 
          data={searchResult}
          receiveSearchResult={receiveSearchResult}
          favedItems={favedItems}
          onFavItem={onFavItem} />
        </>
        :
        <>
          {recentSearches.length !==0 ? 
            <div className="recS">RECENT SEARCHES</div> :
            <div className="recS2">Search For Bus Services or Bus Stops!</div>
}
         
          <div className="vert">
          
          {recentSearches.map((search, index) => (
          search.type === "busStop" ? 
          
          <>
         <button className="cont-recent" onClick={()=>receiveSearchResult(search)}> 
         <p key={index}>
          <img src="./images/recentBS.png"></img>
          <h1 className="recentBusName">{search.busStopName}</h1> <br />
          <h3>{search.busStopCode}</h3>
          </p>
         </button>
          </>
        
          :
          <>
         <button className="cont-recent2" onClick={()=>receiveSearchResult(search)}> 
         <p key={index}>
          <img src="./images/recentBUS.png"></img>
          <h1 className="recentBusNo">{"Bus " + search.busService}</h1> <br />
         
          </p>
         </button>
          </>
          
          ))}
        
          </div>
        </>
      }

      </li>
       <li className="thirdCol">   
       <button className="showFav" onClick={toggleFaved}>
        <img style={{filter: isDarkTheme ? "invert(0%)" : "invert(100%)"}}src="./images/bookarrow.png"></img>
                                                          </button>

      {showFav && 
        <>
      {favedItems.length !== 0 ? 
      <>
      <SavedArrivalTimes 
        favedItems={favedItems}
        onFavItem={onFavItem}
        page="Favourited List"
      />
      {
        favedItems.map((favedItems, index) => (
          <div key={index}>{favedItems[index]}</div>
        ))
      }
      </>
      :
      <>
      <div className="noBookmark">
      <img style={{filter: isDarkTheme ? "invert(0%)" : "invert(100%)"}} className="sadbook" src="./images/idkanymore.png"></img>
      <p style={{color: isDarkTheme ? "white" : "black"}}>No Favourites at the moment!</p>
      </div>
      </>
       } </>}
    </li>
    </ul>  
    </>
  );
};

export default ArrivalTimes;
