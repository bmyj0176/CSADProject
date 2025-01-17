import { useEffect, useState } from 'react';
import BouncyBouncy from '../Components/LoadingIcon';
import "../stylesheets/at_list.css";

const ArrivalTimesElement = (props) => {
    const [data, setData] = useState(
        {
            type: (props.type === "busNo") ? "busStop" : "busNo",
            busService: props.busService,
            busStopName: props.busStopName,
            busStopCode: props.busStopCode
        }
    )
    useEffect(() => {
        setData(
            {
                type: (props.type === "busNo") ? "busStop" : "busNo",
                busService: props.busService,
                busStopName: props.busStopName,
                busStopCode: props.busStopCode
            }
        )
    }, [props.type, props.busService, props.busStopName, props.busStopCode])

    const onDivClick = () => {
        if (props.type && data)
            props.receiveSearchResult(data)
    }

    const onTimesClick = (e) => {
        e.stopPropagation();
        props.updateBusTimes();
    }

    return (
    <>
        <div 
        style={{ border: '1px solid black' }}
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
                    <h2>{"Bus " + props.busService}</h2>
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
                {props.busTimesList && " mins"}
            </div>
        </div>
    </>
    )
}

const Unavailable = () => {
    return (
        <>
            No Service
        </>
    )
}

export default ArrivalTimesElement