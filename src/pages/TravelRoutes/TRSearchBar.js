import React, { useState, useEffect, useRef, useContext } from 'react';
import { searchInDualList, getjson } from '../../utils/helper_functions';
import { cleanMRTStationName } from '../../utils/helper_functions2';
import TRSearchResult from './TRSearchResult';
import '../stylesheets/busstopcard.css';
import dijkstra from '../../utils/travel_algorithms.js';
import { ThemeContext } from '../Components/ToggleThemeButton';

const TRSearchBar = (props) => {
    const MAX_BAR_SIZE = 20;
    const bus_stops_info_list = useRef([]);
    const station_list = useRef([]);
    const [searchBarSelected, setSearchBarSelected] = useState(false)
    const [searchBarSelected2, setSearchBarSelected2] = useState(false)
    const [searchBarValue, setSearchBarValue] = useState(''); 
    const [searchBarValue2, setSearchBarValue2] = useState(''); 
    const [lockedInValue, setLockedInValue] = useState(null)
    const [lockedInValue2, setLockedInValue2] = useState(null)
    const [barsCount, setBarsCount] = useState(0); 
    const [barsList, setBarsList] = useState([]); 
    const [location1, setLocation1] = useState(null);
    const [location2, setLocation2] = useState(null);
    const [lock, setLock] = useState(false);

    const { isDarkTheme } = useContext(ThemeContext);

    
    useEffect(() => {
      const fetchNumbers = async () => {
        bus_stops_info_list.current = await getjson('./datasets/bus_stops_info.json');
        station_list.current = await getjson('./datasets/code_name.json')
        station_list.current.sort((a, b) => a.name.localeCompare(b.name));
        };
      
      fetchNumbers();
    }, []);
    
    
    useEffect(() => {
      updateSearchBar(searchBarValue, searchBarSelected);
    }, [searchBarValue, searchBarSelected]);
    useEffect(() => {
        updateSearchBar(searchBarValue2, searchBarSelected2);
      }, [searchBarValue2, searchBarSelected2]);
    
    
    useEffect(() => {
        if (searchBarValue !== lockedInValue) {
            setLockedInValue(null)
            setLocation1(null)
        }
    }, [searchBarValue])
    useEffect(() => {
        if (searchBarValue2 !== lockedInValue2) {
            setLockedInValue2(null)
            setLocation2(null)
        }
    }, [searchBarValue2])
        
    const onChangeSearchBar = (setTheSearchBarValue, value) => {
        setTheSearchBarValue(value);
    };
      
    const updateSearchBar = async (value, theSearchBarSelected) => {
        const groupMultistations = (list) => {
            for (const item of list) {
                if (item[1].includes("_")) {
                    const stn = cleanMRTStationName(item[1])
                    for (let n = list.length - 1; n >= 0; n--) { 
                        if (item[1] !== list[n][1] && stn === cleanMRTStationName(list[n][1])) { 
                            item[0].push(list[n][0][0]) 
                            list.splice(n, 1)
                        }
                    }
                    item[1] = cleanMRTStationName(item[1])
                }
            }
        }
        const filtered_list = [];
        let results = null
        if (value !== "" && theSearchBarSelected) {
            const list = station_list.current.map(dict => Object.values(dict)) 
            results = searchInDualList(value, list, MAX_BAR_SIZE, 2);
            for (const item of results) { 
                item[0] = [item[0]]
            }
            groupMultistations(results)
            for (const result of results) {
                
                filtered_list.push({
                type: "station",
                stationCodes: result[0],
                stationName: result[1]
                });
            }
            results = searchInDualList(value, bus_stops_info_list.current, (MAX_BAR_SIZE - filtered_list.length), 2);
            for (const result of results) {
                
                filtered_list.push({
                type: "busStop",
                busStopName: result[0],
                busStopCode: result[1],
                nearbyMRTs: result[2]
                });
            }
        }
        else {
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
            setLocation1(dict)
        }
        else if (searchBarSelected2) {
            setSearchBarValue2(value)
            setLockedInValue2(value)
            setLocation2(dict)
        }
    }
    
    let timeoutId = null;   
    const onBlur = (setBool) => {
        if (timeoutId) clearTimeout(timeoutId);
    
        
        timeoutId = setTimeout(() => {
            setBool(false);
        }, 200);
    };
    const onFocus = (setBool) => {
        clearTimeout(timeoutId)
        setBool(true);
    }

    function onSubmit() {
        props.submitLocations(location1, location2);
        setLock(true);
    }

    function onUnlock() {
        props.submitLocations(null, null);
        setLock(false);
    }
    
    return (
      <div className="container">
        {}
            <input 
                style={{borderColor: isDarkTheme ? "rgb(255, 255, 255)": "black",
                        color: isDarkTheme ? "rgb(255, 255, 255)": "black",
                        backgroundColor: !isDarkTheme && "#00000070"
                }}
                type="text" 
                placeholder="Starting location..." 
                className="search_bar" 
                value={searchBarValue} 
                onChange={(event) => onChangeSearchBar(setSearchBarValue, event.target.value)}
                onFocus={() => onFocus(setSearchBarSelected)}
                onBlur={() => onBlur(setSearchBarSelected)}
                disabled={lock}
            />
            <input 
                style={{borderColor: isDarkTheme ? "rgb(255, 255, 255)": "black",
                        color: isDarkTheme ? "rgb(255, 255, 255)": "black",
                        backgroundColor: !isDarkTheme && "#00000070"
            }}
                type="text" 
                placeholder="Your Destination..." 
                className="search_bar" 
                value={searchBarValue2} 
                onChange={(event) => onChangeSearchBar(setSearchBarValue2, event.target.value)}
                onFocus={() => onFocus(setSearchBarSelected2)}
                onBlur={() => onBlur(setSearchBarSelected2)}
                disabled={lockedInValue === null || lock}
            />
            <br/>
            {(lockedInValue && lockedInValue2 && !lock) && 
            <button onClick={onSubmit}>Look for Travel Routes</button>}
            {lock &&
            <button onClick={onUnlock}>Search Again</button>}
            <br/>
            <div className="bars">
            {Array.from({ length: barsCount }, (_, index) => (
                <div key={index} className="bar">
                    <TRSearchResult 
                    dict={barsList[index]} 
                    sendToSearchBar={sendToSearchBar}
                    />
                </div>
            ))}
            </div>
      </div>
      );
    };
  
export default TRSearchBar