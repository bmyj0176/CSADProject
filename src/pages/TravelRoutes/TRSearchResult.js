import React, { useState, useEffect, useContext  } from 'react';
import { codeToMRTImagePath } from '../../utils/helper_functions2';
import "../stylesheets/travelroutes.css";
import { ThemeContext } from '../Components/ToggleThemeButton';

const TRSearchResult = (props) => {
    const [header, setHeader] = useState("")
    const [subheader1, setSubheader1] = useState("")
    const [subheader2, setSubheader2] = useState("")
    const { isDarkTheme } = useContext(ThemeContext);
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
        <div className="containerTR">
            <button className='trbutton' onClick={handleClick}>
              <img style={{filter: isDarkTheme ? "invert(0%)" : "invert(100%)"}} className="img1"src="../images/icons/Addr.png"></img>
              <h3 className="busstopname">{header}</h3>
              <p className="busstopnumber">{/*subheader1*/}</p>
              <br/>
              {subheader2 && (subheader2)}
            </button>
     
        </div>
      )
  }

  export default TRSearchResult