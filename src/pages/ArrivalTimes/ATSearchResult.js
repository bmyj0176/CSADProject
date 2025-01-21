import React, { useState, useEffect } from 'react';
import { dict_in_list, codeToMRTImagePath } from '../../helper_functions2';
import '../stylesheets/ATpages/at_searchresult.css';

const ATSearchResult = (props) => {
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
          setSubheader2("  •  " + props.dict.distance + "m Away")
          break
        case "busNo":
          setHeader("Bus " + props.dict.busService)
          break
        case "busStop":
          setHeader(props.dict.busStopName)
          setSubheader1(props.dict.busStopCode)
          setSubheader2(
            Array.from({ length: props.dict.nearbyMRTs.length }, (_, index) => (
              <img key={index} className='mrticon' src={codeToMRTImagePath(props.dict.nearbyMRTs[index])}/>
            ))
          )
          break
        default:  
          break
        }
    }, [props.dict]);
  
    const handleClick = () => {
      props.setSelectedList(props.receiver)
      props.onItemSelect(props.index)
      props.receiveSearchResult(props.dict)
    };
  
    // BUTTON LAYOUT
      return (
        <div className = "cent">
          <p style={{display:'block'}}>
            <button 
            className={subheader1 ? "busstopcard" : "alternatecard"} 
            id={(props.selectedItem === props.index) ? "busstopclicked" : "busstopdefault"} 
            onClick={handleClick}>
              <h3 className="busstopname">{header}</h3>
              <b className="busstopnumber">{subheader1}</b>
              <br/>
              {subheader2 && (subheader2)}
            </button>
          </p>
        </div>
      )
  }

export default ATSearchResult;

