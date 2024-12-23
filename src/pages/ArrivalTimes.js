import React, { Component, useState } from 'react';
import SearchBar from "./ArrivalTimes/SearchBar"
import "./stylesheets/arrivaltimes.css";
import ArrivalTimesList from './ArrivalTimes/ArrivalTimesList';
//import { link } from 'fs-extra'; this shhit gives 23 fucking errors 

 // bryan u fucked this code up it was working before 
 
class ArrivalTimes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggles: {
        busNo: null,
        busStop: null,
        stopNumber: null,
        nearMe: null,
      },
      searchResult: null,
    };
  }

  handleToggle = (buttonName) => {
    this.setState((prevState) => {
      if (buttonName === 'nearMe') {
        if (this.state.toggles['nearMe'] === null) {
          return {
            toggles: {
              ...prevState.toggles,
              busNo: false,
              busStop: false,
              stopNumber: false,
              nearMe: true,
            },
          };
        } else {
          return {
            toggles: {
              ...prevState.toggles,
              busNo: null,
              busStop: null,
              stopNumber: null,
              nearMe: null,
            },
          };
        }
      } else {
        // other 3 buttons
        if ((this.state.toggles['busNo'] == null && this.state.toggles['busStop'] == null && this.state.toggles['stopNumber'] == null)
          || (!this.state.toggles['busNo'] && !this.state.toggles['busStop'] && !this.state.toggles['stopNumber'])
        ) {
          return {
            toggles: {
              ...prevState.toggles,
              busNo: false,
              busStop: false,
              stopNumber: false,
              nearMe: null,
              [buttonName]: true,
            },
          };
        } else {
          const bools = [this.state.toggles['busNo'], this.state.toggles['busStop'], this.state.toggles['stopNumber']];
          const selected = this.state.toggles[buttonName];
          if (selected && bools.filter((bool) => bool).length === 1) { // only one filter selected is picked
            return {
              toggles: {
                ...prevState.toggles,
                busNo: null,
                busStop: null,
                stopNumber: null,
                nearMe: null,
              },
            };
          } else {
            return {
              toggles: {
                ...prevState.toggles,
                [buttonName]: !prevState.toggles[buttonName],
              },
            };
          }
        }
      }
    });
  };

  receiveSearchResult = (value) => {
    this.setState(() => {
      return {
        searchResult: value
      }
    })
  }

  default() {
    return {
      fontWeight: "normal",
    };
  }

  filtered_off() {
    return {
      fontWeight: "normal",
      opacity: 0.2
    };
  }

  filtered_on() {
    return {
      fontWeight: "bold",
      backgroundColor: "#606060"
    };
  }

  choose(buttonName) {
    return this.state.toggles[buttonName] !== null ? this.state.toggles[buttonName] ? this.filtered_on() : this.filtered_off() : this.default()
  }

  render() {
    return (
      <>
 {/*---------------------------------------------------------------------------------*/}
        <ul className="at">
          <li>
            <button
              style={this.choose('busNo')}
              onClick={() => this.handleToggle('busNo')}
            >
            <p> Bus No.</p>
            </button>
          </li>
 {/*---------------------------------------------------------------------------------*/}
          <li> <button
              style={this.choose('busStop')}
              onClick={() => this.handleToggle('busStop')}
              >
              <p> Bus Stop </p>
            </button>
          </li>
 {/*---------------------------------------------------------------------------------*/}
          <li>
            <button
              style={this.choose('stopNumber')}
              onClick={() => this.handleToggle('stopNumber')}
            >
              <p> Stop Number </p>
            </button>
          </li>
 {/*---------------------------------------------------------------------------------*/}
          <li>
            <button
              style={this.choose('nearMe')}
              onClick={() => this.handleToggle('nearMe')}
            >
              <p> Near Me </p>
            </button>
          </li>
        </ul>
 {/*---------------------------------------------------------------------------------*/}
        <table><tbody><tr>
          <td>
            <SearchBar 
            toggleStates={this.state.toggles} 
            receiveSearchResult={this.receiveSearchResult}
            />
          </td>
          <td>
          {console.log(this.state['searchResult'])}
            {this.state['searchResult'] ? 
            <ArrivalTimesList data={this.state.searchResult}/> 
            : null}
          </td>
        </tr></tbody></table>
      </>
    );
  }
}

export default ArrivalTimes;
