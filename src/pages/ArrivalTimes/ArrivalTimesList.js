import BusRouteList from './BusRouteList';
import BusStopList from './BusStopList';
import React from 'react';
import "../stylesheets/at_list.css";

// props.data.type is the type of value, either "busNo", "busStop" or "stopNumber"
const ArrivalTimesList = (props) => {

    return (
        <>
        {
            (props.data.type === "busNo") ?
            <BusRouteList data={props.data} />
            : ((props.data.type === "busStop" || props.data.type === "nearestBusStop") ?
            <BusStopList data={props.data} />
            : "Error")
        }
        </>
    )
};

export const ArrivalTimesElement = (props) => {
    return (
    <>
        <div className="atlist">
            <b>{props.header}</b>
            <br/>
            {props.subheader && <>
                {props.subheader}
                <br/>
            </>}
            <div className='listbutton'>
                <button onClick={props.updateBusTimes} >
                { // list of arrivaltimes (x3)
                    (props.busTimesList ? props.busTimesList : ["-", "-", "-"]).map((busTime, index) => (
                        <span key={index}>
                            {index === 0 ? <span className="element">{busTime}</span> : busTime},&nbsp;&nbsp;
                        </span> // each arrivaltime in mins
                    )) 
                }
                </button>
                mins
            </div>
        </div>
    </>
    )
}

export default ArrivalTimesList