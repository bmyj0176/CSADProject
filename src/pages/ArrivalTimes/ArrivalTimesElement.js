import { useEffect, useState } from 'react';
import BouncyBouncy from '../Components/LoadingIcon';
import { dict_in_list } from '../../helper_functions2';
import "../stylesheets/ATpages/at_list.css";


const ArrivalTimesElement = (props) => {

    const [data, setData] = useState({
        busService: props.busService,
        busStopName: props.busStopName,
        busStopCode: props.busStopCode
    })
    const [favItem, setFavItem] = useState(() => {
        return dict_in_list(data, props.favedItems) ?
        'selected' :
        'unselected'
      });
    
    useEffect(() => {
        setData(
            {
                busService: props.busService,
                busStopName: props.busStopName,
                busStopCode: props.busStopCode
            }
        )
    }, [props.type, props.busService, props.busStopName, props.busStopCode])

    useEffect(() => {
        setFavItem(dict_in_list(data, props.favedItems) ?
        'selected' :
        'unselected'
        )
    }, [props.favedItems])

    const onDivClick = () => {
        if (props.type) {
            props.receiveSearchResult(
                {
                    type: (props.type === "busNo") ? "busStop" : "busNo", // invert type
                    busService: props.busService,
                    busStopName: props.busStopName,
                    busStopCode: props.busStopCode
                }
            )
        }
    }

    const onTimesClick = (e) => {
        e.stopPropagation();
        props.updateBusTimes();
    }

    const handleFav = (e) => {
        e.stopPropagation();
        props.onFavItem(data, (favItem === 'selected' ? false : true))
        setFavItem((prevState) => (prevState === 'selected' ? 'unselected' : 'selected')); // toggle
      };

    return (
    <>
        <div 
        style={{ border: '2px solid rgba(13, 13, 34, 0.39)' }}
        className="atlist"
        onClick={onDivClick}>
            {(props.type) ?
                (props.type === "busNo") ?
                <>
                    {/* CASE: A Bus Stop on a Buses' Route */}
                    <h2>{props.busStopName}</h2>
                    <h4>{props.busStopCode}</h4>
                </>
                :
                <>
                    {/* CASE: A Bus Service @ Bus Stop */}
                    <h2>{"Bus " + props.busService}</h2>
                </>
                :
                <>
                    {/* CASE: A Hybrid Display for Bookmarked ArrivalTimes */}
                    <h2 className="hello">{"Bus " + props.busService}</h2>
                    <h4>{"@ " + props.busStopName}</h4>
                </>
            }
            <div className='listbutton'>
                <button onClick={onTimesClick} >
                { // list of arrivaltimes (x3)
                    typeof props.busTimesList === "undefined" ? 
                    <BouncyBouncy/> : 
                    props.busTimesList === null ?
                    <Unavailable/> :
                    props.busTimesList.map((busTime, index) => (
                        <span key={index}>
                            {index === 0 ? <span className="element">{busTime}</span> : busTime},&nbsp;&nbsp;
                        </span> // each arrivaltime in mins
                    )) 
                }
                </button>
                {props.busTimesList && "mins"}
            </div>
            <StarButton
            type={props.type}
            className='star'
            handleFav={handleFav}
            favItem={favItem}/>
        </div>
    </>
    )
}

const StarButton = (props) => {

    return (
      <button // STAR BUTTONNNNNNNNN
          id={(props.type) ?
            (props.type === "busNo") ? "starbutton" : "starbutton2": "starbutton3"}
       
          className={props.favItem === 'selected' ? "btnfaved" : "btnunfaved"}
          onClick={props.handleFav}
          type="button"
        >   
          <svg 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="34"
            height="34"
          >
            <path
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              fill="currentColor"
            />
          </svg>
        </button>
      
    )
  }

const Unavailable = () => {
    return (
        <>
             <span className="noService">No Service</span>
        </>
    )
}

export default ArrivalTimesElement