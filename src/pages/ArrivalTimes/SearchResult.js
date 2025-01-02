import React, { useState, useEffect } from 'react';
import { dict_in_list } from '../../helper_functions2';

const SearchResult = (props) => {
    const [header, setHeader] = useState("")
    const [subheader1, setSubheader1] = useState("")
    const [subheader2, setSubheader2] = useState("")
    const [favItem, setFavItem] = useState(() => {
      return dict_in_list(props.dict, props.favedItems) ?
      'selected' :
      'unselected'
    });
    
    useEffect(() => {
      setFavItem(dict_in_list(props.dict, props.favedItems) ?
      'selected' :
      'unselected'
      )
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
          setHeader("Bus " + props.dict.busNumber)
          break
        case "busStop":
          setHeader(props.dict.busStopName)
          setSubheader1(props.dict.busStopCode)
          break
        default:  
          break
        }
    }, [props.dict, props.favedItems]);
  
    const handleClick = () => {
      props.onItemSelect(props.index)
      props.receiveSearchResult(props.dict)
    };
  
    const handleFav = () => {
      props.onFavItem(props.dict, (favItem === 'selected' ? false : true))
      setFavItem((prevState) => (prevState === 'selected' ? 'unselected' : 'selected'));
    };
  
    // BUTTON LAYOUT
      return (
        <div className = "cent">
          <p style={{display:'block'}}>
            <button className={subheader1 ? "busstopcard" : "alternatecard"} id={(props.selectedItem === props.index) ? "busstopclicked" : "busstopdefault"} onClick={handleClick}>
              <h3 className="busstopname">{header}</h3>
              <b className="busstopnumber">{subheader1}</b>
              {subheader2 && (subheader2)}
            </button>
            {props.dict.type !== "nearestBusStop" && // dont show star if nearby mode
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
        }
          </p>
          </div>
      )
  }

  export default SearchResult