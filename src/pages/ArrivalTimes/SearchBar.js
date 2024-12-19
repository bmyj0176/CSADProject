import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import { searchInList, getBusTiming, nearestBusStops } from '../../helper_functions';
import { get_list } from '../../file_reader';

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
      }, []);
    
      // updates when props.toggleStates or searchBarValue changes
      useEffect(() => {
        updateSearchBar(searchBarValue);
      }, [props.toggleStates, searchBarValue]);
      
      const onChangeSearchBar = (event) => {
        const value = event.target.value;
        setSearchBarInput(value);
      };
      
      const updateSearchBar = async (value) => {
        const full_list = [];
        const filtered_list = [];
        if (props.toggleStates['nearMe']) {// NEARME MODE
          const nearest_services_and_dist = await nearestBusStops(10) // "BusStopCode": "xxxxx", "Distance": x}
          if (!nearest_services_and_dist) { // unable to get geolocation data
            setBarsList(null) // null for geolocation error
            setBarsCount(1)
            return
          }
          for (const dict of nearest_services_and_dist) {
            filtered_list.push({type: "stopNumber", value: dict.BusStopCode, distance: dict.Distance})
          }
        }
        else if (value !== '') { // SEARCH BAR MODE
          if (props.toggleStates['busNo'] == null || props.toggleStates['busNo']) {
            full_list.push({type: "busNo", list: bus_services_list.current});
          }
          if (props.toggleStates['busStop'] == null || props.toggleStates['busStop']) {
            full_list.push({type: "busStop", list: bus_stops_list.current});
          }
          if (props.toggleStates['stopNumber'] == null || props.toggleStates['stopNumber']) {
            full_list.push({type: "stopNumber", list: bus_stop_codes_list.current});
          }
          for (const dict of full_list) {
            const results = searchInList(value, dict.list, (MAX_BAR_SIZE-filtered_list.length))
            for (const result of results)
              filtered_list.push({type: dict.type, value: result})
            if (filtered_list.length >= MAX_BAR_SIZE) {break}
          }
        }
        else {// INACTIVE MODE (search bar empty)
          setBarsCount(0);
          return
        }
        setBarsList(filtered_list)
        setBarsCount(filtered_list.length);
      };
    
    return (
      <div className="container">
        {/* searchbar disables if nearMe is off */}
        {!props.toggleStates['nearMe'] ? <input type="text" placeholder="Search..." className="search_bar" value={searchBarValue} onChange={onChangeSearchBar}/> : ""}
        {/* stacked bars */}
        <div className="bars">
          {Array.from({ length: barsCount }, (_, index) => (
            <div key={index} className="bar">
              {barsList ? ( 
                <SearchResult 
                dict={barsList[index]} 
                receiveSearchResult={props.receiveSearchResult}
                />
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
          <button onClick={() => props.receiveSearchResult(props.dict)}>{props.dict.value}</button>
        </p>
    )
}

  //console.log(await getBusTiming("19039", "185")) // gives u the next 3 bus timings in a list, example: [3, 11, 21]
  
export default SearchBar