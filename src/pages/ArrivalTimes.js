import React, { useState, useEffect, useContext} from "react";
import Popup from "./Components/Popup";
import ATSearchBar from "./ArrivalTimes/ATSearchBar";
import "./stylesheets/ATpages/arrivaltimes.css";
import { ThemeContext } from './Components/ToggleThemeButton';
import ArrivalTimesList from "./ArrivalTimes/ArrivalTimesList";
import SavedArrivalTimes from "./ArrivalTimes/SavedArrivalTimes";
import ArrivalTimesElement from "./ArrivalTimes/ArrivalTimesElement";

const ArrivalTimes = () => {
  const [toggles, setToggles] = useState({
    busNo: null,
    busStop: null,
    nearMe: null,
  });

  const [throwPopup, setThrowPopup] = useState(false)
  const [searchResult, setSearchResult] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [showFav, setShowFav] = useState(false)
  const [selectedList, setSelectedList] = useState(-1) // "ATSearchBar" vs "SavedArrivalTimes"
  const [favedItems, setFavedItems] = useState(() => {
    const storedFavedItems = localStorage.getItem("savedarrivaltimes")
    if (!storedFavedItems) // no localstorage data
      return []
    return JSON.parse(storedFavedItems)
  })

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
      <ul className="horizontal-list">
      
      <li  className="searchCol" id='scroll'>
      <div className="Checkbox-container">
        <CheckBox />
      </div>

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
        <button onClick={toggleFaved}>HELLO</button>}
      </li>

      <li className='scroll'>
        Click to refresh
        {searchResult && 
        <ArrivalTimesList 
        data={searchResult}
        receiveSearchResult={receiveSearchResult}
        favedItems={favedItems}
        onFavItem={onFavItem} />}
      </li>
     {(showFav) &&  <li>   
      <SavedArrivalTimes 
        favedItems={favedItems}
        onFavItem={onFavItem}
        page="Favourited List"
      />
      <h3 style={{color: "red"}}>EXAMPLE: A bus stop</h3>
        <ArrivalTimesElement
        type={"busNo"}
        busStopCode={"69420"}
        busStopName={"Domingo Compound"}
        busTimesList={["Now", "7", "13"]}
        receiveSearchResult={()=>{}}
        favedItems={favedItems}
        onFavItem={()=>{}}/>
        <h3 style={{color: "red"}}>EXAMPLE: A bus arriving @ bus stop</h3>
        <ArrivalTimesElement
        type={"busStop"}
        busService={"911"}
        busTimesList={null}
        receiveSearchResult={()=>{}}
        favedItems={favedItems}
        onFavItem={()=>{}}/>
        <h3 style={{color: "red"}}>EXAMPLE: Bookmarked ArrivalTime (hybrid)</h3>
        <ArrivalTimesElement
        type={null}
        busStopCode={"69420"}
        busStopName={"Domingo Compound"}
        busService={"911"}
        busTimesList={["2", "11", "-"]}
        receiveSearchResult={()=>{}}
        favedItems={favedItems}
        onFavItem={()=>{}}/>
      {
        favedItems.map((favedItems, index) => (
          <div key={index}>{favedItems[index]}</div>
        ))
      }
      </li> }
    </ul>  
    </>
  );
};

export default ArrivalTimes;
