import React, { useState } from "react";
import ATSearchBar from "./ArrivalTimes/ATSearchBar";
import "./stylesheets/arrivaltimes.css";
import ArrivalTimesList from "./ArrivalTimes/ArrivalTimesList";
import SavedArrivalTimes from "./ArrivalTimes/SavedArrivalTimes";

const ArrivalTimes = () => {
  const [toggles, setToggles] = useState({
    busNo: null,
    busStop: null,
    nearMe: null,
  });

  const [searchResult, setSearchResult] = useState(null);

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
      <div style={{ textAlign: "center" }}>
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
      </div>
      <table>
        <tbody>
          <tr>
            <td>
              <ATSearchBar
                toggleStates={toggles}
                receiveSearchResult={receiveSearchResult}
              />
            </td>
            <td>
              {searchResult ? <ArrivalTimesList data={searchResult} /> : null}
            </td>
            <td>
              <h2>Saved Arrival Times</h2>
              <SavedArrivalTimes receiveSearchResult={receiveSearchResult} />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ArrivalTimes;
