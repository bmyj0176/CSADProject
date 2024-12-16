import React, { useState, useEffect, useRef, Component } from 'react';
import { searchInList } from '../helper_functions';
import { get_list } from '../file_reader';
import "./stylesheets/arrivaltimes.css";
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
    };
  }

  handleToggle = (buttonName) => {
    this.setState((prevState) => {
      if (buttonName === 'nearMe') {
        if (this.state.toggles['nearMe'] === null) {
          return {
            toggles: {
              ...prevState.toggles,
              busNo: null,
              busStop: null,
              stopNumber: null,
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
        if (this.state.toggles['busNo'] == null && this.state.toggles['busStop'] == null && this.state.toggles['stopNumber'] == null) {
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
              Stop Number
            </button>
          </li>
 {/*---------------------------------------------------------------------------------*/}
          <li>
            <button
              style={this.choose('nearMe')}
              onClick={() => this.handleToggle('nearMe')}
            >
              Near Me
            </button>
          </li>
        </ul>
 {/*---------------------------------------------------------------------------------*/}
        {!this.state.toggles["nearMe"] ? <ArrivalTimesSearchBar toggleStates={this.state.toggles}/> : "Near Me"}
      </>
    );
  }
}

const ArrivalTimesSearchBar = (props) => {
  const MAX_BAR_SIZE = 20;
  const [bus_services_list, bus_stop_codes_list, bus_stops_list] = [useRef([]), useRef([]), useRef([])];
  const [searchBarValue, setSearchBarInput] = useState(''); // search bar value
  const [barsCount, setBarsCount] = useState(0); // count of stacked bars
  const [barsList, setBarsList] = useState([]); // contents of stacked bars
  
  useEffect(() => {
    const fetchNumbers = async () => {
      bus_services_list.current = await get_list('./datasets/bus_services.txt');
      bus_stop_codes_list.current = await get_list('./datasets/bus_stop_codes.txt');
      bus_stops_list.current = await get_list('./datasets/bus_stops.txt');
      };
    
      fetchNumbers();
    }, []); // Empty dependency array ensures this runs only once when the component mounts
    
  // Increase the count of bars
  const updateSearchBar = (event) => {
    const value = event.target.value;
    setSearchBarInput(value);
    if (value !== '') {
      const full_list = [] 
      if (!props.toggleStates['busNo']) {full_list.push(...bus_services_list.current)} 
      if (!props.toggleStates['busStop']) {full_list.push(...bus_stop_codes_list.current)}  
      if (!props.toggleStates['stopNumber']) {full_list.push(...bus_stops_list.current)} 
      const filtered_list = searchInList(value, full_list, MAX_BAR_SIZE)
      setBarsList(filtered_list);
      setBarsCount(filtered_list.length);
    }
    else {
      setBarsCount(0);
    }
  };
  
  return (
    <div className="container">
      {/* searchbar */}
      <input type="text" placeholder="Search..." className="search_bar" value={searchBarValue} onChange={updateSearchBar}/>

      {/* stacked bars */}
      <div className="bars">
        {Array.from({ length: barsCount }, (_, index) => (
          <div key={index} className="bar">
            <SearchResultBar value={barsList[index]}/>
          </div>
        ))}
      </div>
    </div>
    );
  };

const SearchResultBar = (props) => {
  return (
    <p style={{display:'block'}}>
      {props.value}
    </p>
  )
}
export default ArrivalTimes;
