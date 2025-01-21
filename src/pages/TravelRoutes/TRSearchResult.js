import React, { useState, useEffect } from 'react';
import { codeToMRTImagePath } from '../../helper_functions2';
import "../stylesheets/travelroutes.css";

const TRSearchResult = (props) => {
    const [header, setHeader] = useState("")
    const [subheader1, setSubheader1] = useState("")
    const [subheader2, setSubheader2] = useState("")
    
    useEffect(() => {
        setHeader("")
        setSubheader1("") 
        setSubheader2("")
        if (props.dict.type === "station") {
            setHeader(props.dict.stationName)
            setSubheader1(props.dict.stationCodes.join(' '))
            setSubheader2(
              Array.from({ length: props.dict.stationCodes.length }, (_, index) => (
                <img className='mrticon' key={index} src={codeToMRTImagePath(props.dict.stationCodes[index])}/>
                ))
            )
        } else if (props.dict.type === "busStop") {
            setHeader(props.dict.busStopName)
            setSubheader1(props.dict.busStopCode)
            setSubheader2(
                Array.from({ length: props.dict.nearbyMRTs.length }, (_, index) => (
                <img className='mrticon' key={index} src={codeToMRTImagePath(props.dict.nearbyMRTs[index])}/>
                ))
            )
        }
    }, [props.dict]);
  
    const handleClick = () => {
      props.sendToSearchBar(props.dict)
    };
  
    // BUTTON LAYOUT
      return (
        <div>
          <p className='trbutton' style={{display:'block'}}>
            <button onClick={handleClick}>
              <h3 className="busstopname">{header}</h3>
              <b className="busstopnumber">{subheader1}</b>
              <br/>
              {subheader2 && (subheader2)}
            </button>
          </p>
        </div>
      )
  }

  export default TRSearchResult