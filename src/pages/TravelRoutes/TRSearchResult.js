import React, { useState, useEffect } from 'react';
import { codeToMRTImagePath } from '../../helper_functions2';

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
            setSubheader1(props.dict.stationCode)
            setSubheader2(
                <img src={codeToMRTImagePath(props.dict.stationCode)}/>
            )
        } else if (props.dict.type === "busStop") {
            setHeader(props.dict.busStopName)
            setSubheader1(props.dict.busStopCode)
            setSubheader2(
                Array.from({ length: props.dict.nearbyMRTs.length }, (_, index) => (
                <img src={codeToMRTImagePath(props.dict.nearbyMRTs[index])}/>
                ))
            )
        }
    }, [props.dict]);
  
    const handleClick = () => {
      props.sendToTR(props.dict)
      props.sendToSearchBar(props.dict)
      console.log("done2")
    };
  
    // BUTTON LAYOUT
      return (
        <div>
          <p style={{display:'block'}}>
            <button onClick={handleClick}>
              <h3 className="busstopname">{header}</h3>
              <b className="busstopnumber">{subheader1}</b>
              {subheader2 && (subheader2)}
            </button>
          </p>
        </div>
      )
  }

  export default TRSearchResult