import React, { useState, useEffect, useRef} from 'react';
import { searchInList, searchInDualList, nearestBusStops, getBusStopInfo } from '../../helper_functions';
import { checkForNearbyMRTs } from '../../helper_functions2';
import { getjson } from '../../helper_functions'
import ATSearchResult from './ATSearchResult';
import '../stylesheets/busstopcard.css'

const ATSearchBar = (props) => {
    const MAX_BAR_SIZE = 20;
    const [bus_services_list, bus_stops_info_list] = [useRef([]), useRef([])];
    const [searchBarValue, setSearchBarInput] = useState(''); // search bar value
    const [barsCount, setBarsCount] = useState(0); // count of stacked bars
    const [barsList, setBarsList] = useState([]); // contents of stacked bars
    
    // once at start of lifecycle
    useEffect(() => {
      const fetchNumbers = async () => {
        bus_services_list.current = await getjson('./datasets/bus_services.txt');
        bus_stops_info_list.current = await getjson('./datasets/bus_stops_info.json');
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
            filtered_list.push({
              type: "nearestBusStop", 
              busStopName: (await getBusStopInfo(dict.BusStopCode, "Description")), 
              busStopCode: dict.BusStopCode, 
              distance: (Math.round(dict.Distance*1000))})
          }
        }
        else if (value !== '') { // SEARCH BAR MODE
          if (props.toggleStates['busNo'] === null || props.toggleStates['busNo']) {
            full_list.push({type: "busNo", list: bus_services_list.current});
          }                                                                     
          if (props.toggleStates['busStop'] === null || props.toggleStates['busStop']) {
            full_list.push({type: "busStop", list: bus_stops_info_list.current});
          }
          for (const dict of full_list) {
            let results = null
            if (dict.type === "busNo") { // singular
              results = searchInList(value, dict.list, (MAX_BAR_SIZE-filtered_list.length))
              for (const result of results)
                filtered_list.push({
                type: "busNo", 
                busService: result})
            } else if (dict.type === "busStop") { // dual
              results = searchInDualList(value, dict.list, (MAX_BAR_SIZE - filtered_list.length), 2);
              for (const result of results) {
                // Add item to filtered_list if it doesn't exceed MAX_BAR_SIZE
                filtered_list.push({
                  type: "busStop", 
                  busStopName: result[0],
                  busStopCode: result[1],
                  nearbyMRTs: result[2]
                });
              }
            
              if (filtered_list.length >= MAX_BAR_SIZE) {
                break; // exit the loop when max size is reached
              }
            }
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
        {!props.toggleStates['nearMe'] ?
         <input type="text" placeholder="Search..." className="search_bar" value={searchBarValue} onChange={onChangeSearchBar}/> : 
         <h4>Please note that this may not be 100% accurate</h4> }
        {/* stacked bars */}
        <div className="bars">
          {Array.from({ length: barsCount }, (_, index) => (
            <div key={index} className="bar">
              {barsList ? ( 
                <ATSearchResult 
                dict={barsList[index]} 
                index={index}
                receiver={"ATSearchBar"}
                setSelectedList={props.setSelectedList}
                receiveSearchResult={props.receiveSearchResult}
                selectedItem={props.selectedItem === "ATSearchBar" ? props.selectedItem : null}
                onItemSelect={props.onItemSelect}
                favedItems={props.favedItems}
                onFavItem={props.onFavItem}
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
  
export default ATSearchBar