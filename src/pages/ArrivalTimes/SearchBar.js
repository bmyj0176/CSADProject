import React, { useState, useEffect, useRef } from 'react';
import { searchInList, searchInDualList, nearestBusStops, getBusStopInfo } from '../../helper_functions';
import { get_list } from '../../file_reader';
import '../stylesheets/busstopcard.css'

const SearchBar = (props) => {
    const MAX_BAR_SIZE = 20;
    const [bus_services_list, bsc_stopname_list] = [useRef([]), useRef([])];
    const [searchBarValue, setSearchBarInput] = useState(''); // search bar value
    const [barsCount, setBarsCount] = useState(0); // count of stacked bars
    const [barsList, setBarsList] = useState([]); // contents of stacked bars
    const [selectedItem, setSelectedItem] = useState(null) 
    
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


    // BUTTON LAYOUT
    return (
        <p style={{display:'block'}}>
          <button className={subheader1 ? "busstopcard" : "alternatecard"} id={(props.selectedItem === props.index) ? "busstopclicked" : "busstopdefault"} onClick={handleClick}>
            <h3 className="busstopname">{header}</h3>
            <b className="busstopnumber">{subheader1}</b>
            {subheader2 && ("  •  " + subheader2)}
          </button>
        </p>
    )
}
  
export default SearchBar