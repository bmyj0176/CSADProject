import React, { useState, useEffect, useRef, useContext} from 'react';
import { searchInList, searchInDualList, nearestBusStops, getBusStopInfo } from '../../utils/helper_functions';
import { getjson } from '../../utils/helper_functions'
import ATSearchResult from './ATSearchResult';
import '../stylesheets/busstopcard.css'
import { ThemeContext } from '../Components/ToggleThemeButton';

const ATSearchBar = (props) => {
    const MAX_BAR_SIZE = 15;
    const [bus_services_list, bus_stops_info_list] = [useRef([]), useRef([])];
    const [searchBarValue, setSearchBarInput] = useState(''); 
    const [barsCount, setBarsCount] = useState(0); 
    const [barsList, setBarsList] = useState([]); 
    
    
    useEffect(() => {
      const fetchNumbers = async () => {
        bus_services_list.current = await getjson('./datasets/bus_services.json');
        bus_stops_info_list.current = await getjson('./datasets/bus_stops_info.json');
        };
      
      fetchNumbers();
    }, []);
    
      const { isDarkTheme } = useContext(ThemeContext);

    
    useEffect(() => {
      updateSearchBar(searchBarValue);
      console.log(searchBarValue);
    }, [props.toggleStates, searchBarValue]);
      
      const onChangeSearchBar = (event) => {
        const value = event.target.value;
        setSearchBarInput(value);
      };
      
      const updateSearchBar = async (value) => {
        const full_list = [];
        const filtered_list = [];
        if (props.toggleStates['nearMe']) {
          const nearest_services_and_dist = await nearestBusStops(10) 
          if (!nearest_services_and_dist) { 
            setBarsList(null) 
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
        else if (value !== '') { 
          if (props.toggleStates['busNo'] === null || props.toggleStates['busNo']) {
            full_list.push({type: "busNo", list: bus_services_list.current});
          }                                                                     
          if (props.toggleStates['busStop'] === null || props.toggleStates['busStop']) {
            full_list.push({type: "busStop", list: bus_stops_info_list.current});
          }
          for (const dict of full_list) {
            let results = null
            if (dict.type === "busNo") { 
              results = searchInList(value, dict.list, (MAX_BAR_SIZE-filtered_list.length))
              for (const result of results)
                filtered_list.push({
                type: "busNo", 
                busService: result})
            } else if (dict.type === "busStop") { 
              results = searchInDualList(value, dict.list, (MAX_BAR_SIZE - filtered_list.length), 2);
              for (const result of results) {
                
                filtered_list.push({
                  type: "busStop", 
                  busStopName: result[0],
                  busStopCode: result[1],
                  nearbyMRTs: result[2]
                });
              }
            
              if (filtered_list.length >= MAX_BAR_SIZE) {
                break; 
              }
            }
        }
      }
        else {
          setBarsCount(0);
          return
        }
        setBarsList(filtered_list)
        setBarsCount(filtered_list.length);
      };
    
    return (
      <div className="container">
        {!props.toggleStates['nearMe'] ?
         <input 
          style={{borderColor: isDarkTheme ? "rgb(255, 255, 255)": "black",
                  color: isDarkTheme ? "rgb(255, 255, 255)": "black",
                  backgroundColor: !isDarkTheme && "#00000070"
          }}
          type="text"   placeholder="Search Here..." className="search_bar" value={searchBarValue} onChange={onChangeSearchBar}/> : 
         <h4>Please note that this may not be 100% accurate</h4> }
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
                selectedItem={props.selectedItem === "ATSearchBar" ? null : props.selectedItem}
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