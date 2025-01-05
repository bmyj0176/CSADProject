import React, { useState, useEffect, useRef} from 'react';
import { searchInDualList } from '../../helper_functions';
import { cleanMRTStationName } from '../../helper_functions2';
import { get_list } from '../../file_reader';
import TRSearchResult from './TRSearchResult';
import '../stylesheets/busstopcard.css'

const TRSearchBar = (props) => {
    const MAX_BAR_SIZE = 20;
    const bus_stops_info_list = useRef([]);
    const station_list = useRef([]);
    const [searchBarSelected, setSearchBarSelected] = useState(false)
    const [searchBarSelected2, setSearchBarSelected2] = useState(false)
    const [searchBarValue, setSearchBarValue] = useState(''); // search bar value
    const [searchBarValue2, setSearchBarValue2] = useState(''); // search bar value
    const [lockedInValue, setLockedInValue] = useState(null)
    const [lockedInValue2, setLockedInValue2] = useState(null)
    const [barsCount, setBarsCount] = useState(0); // count of stacked bars
    const [barsList, setBarsList] = useState([]); // contents of stacked bars
    
    // once at start of lifecycle
    useEffect(() => {
      const fetchNumbers = async () => {
        bus_stops_info_list.current = await get_list('./datasets/bus_stops_info.json');
        station_list.current = await get_list('./datasets/station_list.json')
        };
      
      fetchNumbers();
    }, []);
    
    // updates search results
    useEffect(() => {
      updateSearchBar(searchBarValue, searchBarSelected);
    }, [searchBarValue, searchBarSelected]);
    useEffect(() => {
        updateSearchBar(searchBarValue2, searchBarSelected2);
      }, [searchBarValue2, searchBarSelected2]);
    
    // removes lock in values
    useEffect(() => {
        if (searchBarValue !== lockedInValue)
            setLockedInValue(null)
    }, [searchBarValue])
    useEffect(() => {
        if (searchBarValue2 !== lockedInValue2)
            setLockedInValue2(null)
    }, [searchBarValue2])
        
    const onChangeSearchBar = (setTheSearchBarValue, value) => {
        setTheSearchBarValue(value);
    };
      
    const updateSearchBar = async (value, theSearchBarSelected) => {
        const filtered_list = [];
        let results = null
        if (value !== "" && theSearchBarSelected) {
            const list = station_list.current.map(dict => Object.values(dict))
            results = searchInDualList(value, list, (MAX_BAR_SIZE - filtered_list.length), 2);
            for (const result of results) {
                // Add item to filtered_list if it doesn't exceed MAX_BAR_SIZE
                filtered_list.push({
                type: "station",
                stationCode: result[0],
                stationName: cleanMRTStationName(result[1])
                });
            }
            results = searchInDualList(value, bus_stops_info_list.current, (MAX_BAR_SIZE - filtered_list.length), 2);
            for (const result of results) {
                // Add item to filtered_list if it doesn't exceed MAX_BAR_SIZE
                filtered_list.push({
                type: "busStop",
                busStopName: result[0],
                busStopCode: result[1],
                nearbyMRTs: result[2]
                });
            }
        }
        else {// INACTIVE (search bar empty)
            setBarsCount(0);
            return
        }
        setBarsList(filtered_list)
        setBarsCount(filtered_list.length);
    };

    const sendToSearchBar = (dict) => {
        let value = null
        if (dict.type === "station")
            value = dict.stationName
        if (dict.type === "busStop")
            value = dict.busStopName
        if (searchBarSelected) {
            setSearchBarValue(value)
            setLockedInValue(value)
        }
        else if (searchBarSelected2) {
            setSearchBarValue2(value)
            setLockedInValue2(value)
        }
    }
    
    let timeoutId = null; 
    const onBlur = (setBool) => {
        if (timeoutId) clearTimeout(timeoutId);
    
        // set false after 200ms
        timeoutId = setTimeout(() => {
            setBool(false);
        }, 200);
    };
    const onFocus = (setBool) => {
        clearTimeout(timeoutId)
        setBool(true);
    }
      
    return (
      <div className="container">
        {/* searchbar disables if nearMe is off */}
            <input 
                type="text" 
                placeholder="Starting location..." 
                className="search_bar" 
                value={searchBarValue} 
                onChange={(event) => onChangeSearchBar(setSearchBarValue, event.target.value)}
                onFocus={() => onFocus(setSearchBarSelected)}
                onBlur={() => onBlur(setSearchBarSelected)}
            />
            <input 
                type="text" 
                placeholder="Your Destination..." 
                className="search_bar" 
                value={searchBarValue2} 
                onChange={(event) => onChangeSearchBar(setSearchBarValue2, event.target.value)}
                onFocus={() => onFocus(setSearchBarSelected2)}
                onBlur={() => onBlur(setSearchBarSelected2)}
                disabled={lockedInValue === null}
            />
            <br/>
            {(lockedInValue && lockedInValue2) && // locked in entirely
            <button>Look for Travel Routes</button>}
            <br/>
            <div className="bars">
            {Array.from({ length: barsCount }, (_, index) => (
                <div key={index} className="bar">
                    <TRSearchResult 
                    dict={barsList[index]} 
                    sendToTR={props.sendToTR}
                    sendToSearchBar={sendToSearchBar}
                    />
                </div>
            ))}
            </div>
      </div>
      );
    };
  
export default TRSearchBar