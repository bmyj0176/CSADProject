import React, { useState, useEffect } from 'react';
import { dict_in_list, codeToMRTImagePath } from '../../utils/helper_functions2';
import '../stylesheets/ATpages/at_searchresult.css';

const ATSearchResult = (props) => {
    const [header, setHeader] = useState("")
    const [subheader1, setSubheader1] = useState("")
    const [subheader2, setSubheader2] = useState("")
    const [bgimage, setImage] = useState("")
    const [bgimage2, setImage2] = useState("")
    const [arrowimg, setImage3] = useState("")
    const [recent, setRecent] = useState([])

    
    const busHeader = (
      <>
     
      Bus <br/> {props.dict.busService}
        
      </>
    )

    const cardImage = (
      <>
      <img className="busbus" src="../images/busbus.png"></img>
      </>
    )

    const cardImage2 = (
    <>
    <img className="dropdrop" src="../images/locDrop.png"></img>
    </>
    )

    const cardArrow = (
      <>
      <img className="arrowTrain" src="../images/slide_arrow_left.png"></img>
      </>
    )

    const nearmeArrow = (
      <>
      <img className="nearmeArrow" src="../images/nearmeLine.png"></img>
      </>
    )

    useEffect(() => {
      setImage("")
      setImage2("")
      setImage3("")
      setHeader("")
      setSubheader1("") 
      setSubheader2("")

      switch (props.dict.type) {
        case "nearestBusStop":
          setHeader(props.dict.busStopName)
          setSubheader1(props.dict.busStopCode)
          setSubheader2("  •  " + props.dict.distance + "m Away")
          setImage(nearmeArrow)
          break
        case "busNo":
          setHeader(busHeader)
          setImage(cardImage)
          break
        case "busStop":
          setHeader(props.dict.busStopName)
          setSubheader1(props.dict.busStopCode)
          setSubheader2(
            Array.from({ length: props.dict.nearbyMRTs.length },(_, index) => (
              <img key={index} className='mrticon' src={codeToMRTImagePath(props.dict.nearbyMRTs[index])}/>
            ))
          )
          setImage(cardImage2)
          setImage3(cardArrow)
          break
        default:  
          break
        }
    }, [props.dict]);

    useEffect(() => {
      const savedRecent = localStorage.getItem("savedarrivaltimes"); 
      if (savedRecent) {
          setRecent(savedRecent); 
      }
      console.log(localStorage);
  }, []);

    const handleClick = () => {

      props.setSelectedList(props.receiver)
      props.onItemSelect(props.index)
      props.receiveSearchResult(props.dict)
     
    };
  
    useEffect(()=>{
      console.log(subheader2);
    }, [subheader2]);

    

    
      return (
        
        <div className = "cent">

          <p className="result">
            <button 
            className={!(subheader2.length > 4) ? (subheader2.length === 0) ? subheader1 ? "busstopcard" : "alternatecard": "mrtCard": "nearmeCard"} 
            id={(props.selectedItem === props.index) ? "busstopclicked" : "busstopdefault"} 
            onClick={handleClick}>
              <h3 className="busstopname">{header}</h3>
              {bgimage}
              <b className="busstopnumber">{subheader1}</b>
              <br/>
              {arrowimg}
              {!(subheader2.length >4 ) && (subheader2)}
              {(subheader2.length > 4) &&
              <h4 className="distance"><span style={{backgroundColor: 'khaki'}}>{subheader2}</span></h4>}
              
            </button>
          </p>
        </div>
      )
  }

export default ATSearchResult;

