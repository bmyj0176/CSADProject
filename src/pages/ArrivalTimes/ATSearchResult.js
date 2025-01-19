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
              <img className='mrticon' src={codeToMRTImagePath(props.dict.nearbyMRTs[index])}/>
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
              {subheader2 && (subheader2)}
            </button>
          </p>
        </div>
      )
  }

<<<<<<< HEAD
export default ATSearchResult;
=======
const StarButton = (props) => {
  return (
    <button // STAR BUTTONNNNNNNNN
      id={props.subheader1 ? 'buttonchange' : 'buttonchange2'}
      className={props.favItem === 'selected' ? "btnfaved" : "btnunfaved"}
      onClick={props.handleFav}
      type="button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24">
        <path
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          fill="currentColor"/>
      </svg>
    </button>
  )
}

export default ATSearchResult
>>>>>>> 7a6ca8de56f9569aff0f9f8cf7658e001d768bd1
