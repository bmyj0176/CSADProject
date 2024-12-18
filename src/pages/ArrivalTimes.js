import React, { useState, useEffect, useRef, Component } from 'react';
import { searchInList, getBusTiming, nearestBusStops } from '../helper_functions';
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
        <SearchBar toggleStates={this.state.toggles}/>
      </>
    );
  }
}

 const SearchBar = (props) => {
  const MAX_BAR_SIZE = 20;
  const [bus_services_list, bus_stop_codes_list, bus_stops_list] = [useRef([]), useRef([]), useRef([])];
  const [searchBarValue, setSearchBarInput] = useState(''); // search bar value
  const [barsCount, setBarsCount] = useState(0); // count of stacked bars
  const [barsList, setBarsList] = useState([]); // contents of stacked bars
  
  // once at start of lifecycle
  useEffect(() => {
    const fetchNumbers = async () => {
      bus_services_list.current = await get_list('./datasets/bus_services.txt');
      bus_stop_codes_list.current = await get_list('./datasets/bus_stop_codes.txt');
      bus_stops_list.current = await get_list('./datasets/bus_stops.txt');
      };
    
      fetchNumbers();
    }, []); // Empty dependency array ensures this runs only once when the component mounts
  
    // updates when props.toggleStates or searchBarValue changes
    useEffect(() => {
      updateSearchBar(searchBarValue);
    }, [props.toggleStates, searchBarValue]);
    
    const onChangeSearchBar = (event) => {
      const value = event.target.value;
      setSearchBarInput(value);
    };
    
    const updateSearchBar = async (value) => {
      let full_list = [];
      if (props.toggleStates['nearMe']) {// nearMe mode
        const nearest_services_dist = await nearestBusStops(10)
        if (!nearest_services_dist) { // unable to get geolocation data
          setBarsList(null) // null for geolocation error
          setBarsCount(1)
          return
      }
      const nearest_services = nearest_services_dist.map(item => item.BusStopCode);
      full_list.push(...nearest_services);
      }
      else { // NOT nearMe mode
        if (props.toggleStates['busNo'] == null || props.toggleStates['busNo']) {
          full_list.push(...bus_services_list.current);
        }
        if (props.toggleStates['busStop'] == null || props.toggleStates['busStop']) {
          full_list.push(...bus_stops_list.current);
        }
        if (props.toggleStates['stopNumber'] == null || props.toggleStates['stopNumber']) {
          full_list.push(...bus_stop_codes_list.current);
        }
      }

      if (value !== '' || props.toggleStates['nearMe']) {
        if (!props.toggleStates['nearMe']) // filter by searchbar
          full_list = searchInList(value, full_list, MAX_BAR_SIZE);
        setBarsList(full_list);
        setBarsCount(full_list.length);
      } else {
        setBarsCount(0);
      }
    };
  
  return (
    <div className="container">
      {/* searchbar disables if nearMe is off */}
      {!props.toggleStates['nearMe'] ? <input type="text" placeholder="Search..." className="search_bar" value={searchBarValue} onChange={onChangeSearchBar}/> : ""}
      {/* stacked bars */}
      <div className="bars">
        {Array.from({ length: barsCount }, (_, index) => (
          <div key={index} className="bar">
            {barsList && barsList[index] ? ( 
              <SearchResult value={barsList[index]} />
            ) : (
              <> Unable to get Location Data <br/> Please enable it in your browser settings </>
            )}
          </div>
        ))}
      </div>
    </div>
    );
  };

const SearchResult = (props) => {
  return (
    <p style={{display:'block'}}>
      {props.value}
    </p>
  )
}

//console.log(await getBusTiming("19039", "185")) // gives u the next 3 bus timings in a list, example: [3, 11, 21]

export default ArrivalTimes;
