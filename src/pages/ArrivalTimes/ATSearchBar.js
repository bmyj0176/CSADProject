import React, { useState, useEffect, useRef} from 'react';
import { searchInList, searchInDualList, nearestBusStops, getBusStopInfo } from '../../helper_functions';
import { get_list } from '../../file_reader';
import {useNavigate} from 'react-router-dom';
import '../stylesheets/busstopcard.css'

const ATSearchBar = (props) => {
    const MAX_BAR_SIZE = 20;
    const [bus_services_list, bsc_stopname_list] = [useRef([]), useRef([])];
    const [searchBarValue, setSearchBarInput] = useState(''); // search bar value
    const [barsCount, setBarsCount] = useState(0); // count of stacked bars
    const [barsList, setBarsList] = useState([]); // contents of stacked bars
    const [selectedItem, setSelectedItem] = useState(null) 
    const [favedItems, setFavedItems] = useState([])
    
    // once at start of lifecycle
    useEffect(() => {
      const fetchNumbers = async () => {
        bus_services_list.current = await get_list('./datasets/bus_services.txt');
        bsc_stopname_list.current = await get_list('./datasets/bsc_stopname.txt');
        };
      
      fetchNumbers();
    }, []);
    
    // updates when props.toggleStates or searchBarValue changes
    useEffect(() => {
      updateSearchBar(searchBarValue);
    }, [props.toggleStates, searchBarValue]);

    // save favedItems to localStorage
    useEffect(() => {
      // localstorage
    }, [favedItems])
      
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
            full_list.push({type: "busStop", list: bsc_stopname_list.current});
          }
          for (const dict of full_list) {
            let results = null
            if (dict.type === "busNo") { // singular
              results = searchInList(value, dict.list, (MAX_BAR_SIZE-filtered_list.length))
              for (const result of results)
                filtered_list.push({
                type: "busNo", 
                busNumber: result})
            } else if (dict.type === "busStop") { // dual
              results = searchInDualList(value, dict.list, (MAX_BAR_SIZE-filtered_list.length))
              for (const result of results)
                filtered_list.push({
                type: "busStop", 
                busStopName: result[0],
                busStopCode: result[1]})
            }
            
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
    
    const onItemSelect = (index) => {
      setSelectedItem(index)
    }

    // dict - entry to save
    // doAdd - (bool) false: remove, true: add
    const onFavItem = (dict, doAdd) => {
      let favedItemsCopy = [...favedItems]
      if (!doAdd) {
        favedItemsCopy = favedItemsCopy.filter(item => item !== dict)
        setFavedItems(favedItemsCopy)
        return
      }
      favedItemsCopy.push(dict)
      favedItemsCopy.sort((a, b) => a.type.localeCompare(b.type))
      setFavedItems(favedItemsCopy)
    }
    
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
                index={index}
                receiveSearchResult={props.receiveSearchResult}
                selectedItem={selectedItem}
                onItemSelect={onItemSelect}
                onFavItem={onFavItem}
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
  const [header, setHeader] = useState("")
  const [subheader1, setSubheader1] = useState("")
  const [subheader2, setSubheader2] = useState("")
  const [favItem, setFavItem] = useState('unselected');
  
  useEffect(() => {
    setHeader("")
    setSubheader1("")
    setSubheader2("")
    switch (props.dict.type) {
      case "nearestBusStop":
        setHeader(props.dict.busStopName)
        setSubheader1(props.dict.busStopCode)
        setSubheader2(props.dict.distance + "m Away")
        break
      case "busNo":
        setHeader("Bus " + props.dict.busNumber)
        break
      case "busStop":
        setHeader(props.dict.busStopName)
        setSubheader1(props.dict.busStopCode)
        break
      default:  
        break
      }
  }, [props.dict]);

  const handleClick = () => {
    props.onItemSelect(props.index)
    props.receiveSearchResult(props.dict)
  };

  const handleFav = () => {
    setFavItem((prevState) => (prevState === 'selected' ? 'unselected' : 'selected'));
    props.onFavItem(props.dict, (favItem === 'selected' ? true : false))
  };

  // BUTTON LAYOUT
    return (
      <div className = "cent">
        <p style={{display:'block'}}>
          <button className={subheader1 ? "busstopcard" : "alternatecard"} id={(props.selectedItem === props.index) ? "busstopclicked" : "busstopdefault"} onClick={handleClick}>
            <h3 className="busstopname">{header}</h3>
            <b className="busstopnumber">{subheader1}</b>
            {subheader2 && ("  •  " + subheader2)}
          </button>
          <button // STAR BUTTONNNNNNNNN
            id={subheader1 ? 'buttonchange' : 'buttonchange2'}
            className={favItem === 'selected' ? "btnfaved" : "btnunfaved"}
            onClick={handleFav}
            type="button"
          >   
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            fill="currentColor"
          />
        </svg>
      </button>
        </p>
        </div>
    )
}
  
export default ATSearchBar