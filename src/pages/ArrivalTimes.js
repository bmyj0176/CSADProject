import React, { useState } from "react";
import Popup from "./Components/Popup";
import ATSearchBar from "./ArrivalTimes/ATSearchBar";
import "./stylesheets/arrivaltimes.css";
import ArrivalTimesList from "./ArrivalTimes/ArrivalTimesList";
import SavedArrivalTimes from "./ArrivalTimes/SavedArrivalTimes";

import { ArrivalTimesElement } from "./ArrivalTimes/ArrivalTimesList";

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
      favedItemsCopy.sort()
      favedItemsCopy.sort((a, b) => a.type.localeCompare(b.type))
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
      <li style={{backgroundColor:'#00000010'}}>
        <h2>test example:</h2>
        <ArrivalTimesElement
        header={"Domingo Compound"}
        subheader={"69420"}
        busTimesList={["Arr", "7", "13"]}
        updateBusTimes={() => {}}/>
        {searchResult && <ArrivalTimesList data={searchResult} />}
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
          favedItems={favedItems}
          onFavItem={onFavItem}
        />
      </li>
      <li style={{backgroundColor:'#00000010'}}>
      <SavedArrivalTimes 
        selectedList={selectedList}
        setSelectedList={setSelectedList}
        receiveSearchResult={receiveSearchResult}
        selectedItem={selectedItem}
        onItemSelect={onItemSelect}
        favedItems={favedItems}
        onFavItem={onFavItem}
      />
      </li>
    </ul>
    </>
  );
};

export default ArrivalTimes;
