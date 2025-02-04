import React, { useState, useEffect } from "react";
import Popup from "./Components/Popup";
import ATSearchBar from "./ArrivalTimes/ATSearchBar";
import "./stylesheets/ATpages/arrivaltimes.css";
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
    fontWeight: "normal",
  };

  const filteredOffStyle = {
    fontWeight: "normal",
    opacity: 0.2,
  };

  const filteredOnStyle = {
    fontWeight: "bold",
    backgroundColor: "#606060",
  };

  const chooseStyle = (buttonName) => {
    return toggles[buttonName] !== null
      ? toggles[buttonName]
        ? filteredOnStyle
        : filteredOffStyle
      : defaultStyle;
  };

  return (
    <>
      <div>
        {throwPopup && <Popup/>}
      </div>
    <ul className="horizontal-list">
      <li className='scroll'>
        {searchResult && 
        <ArrivalTimesList 
        data={searchResult}
        receiveSearchResult={receiveSearchResult}
        favedItems={favedItems}
        onFavItem={onFavItem} />}
      </li>
      <li>
        <ul className="at">
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
        />
      </li>
      <li>
      <SavedArrivalTimes 
        favedItems={favedItems}
        onFavItem={onFavItem}
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
      </li>
    </ul>
    </>
  );
};

export default ArrivalTimes;
