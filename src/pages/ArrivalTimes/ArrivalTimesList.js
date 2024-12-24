import BusRouteList from './BusRouteList';
import BusStopList from './BusStopList';
import React from 'react';

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
        <div> {props.header} 
        <br/>
        {props.subheader}
        <br/>
        <button onClick={() => props.updateBusTimes(props.index)}>
        { // list of arrivaltimes (x3)
            (props.busTimesList ? props.busTimesList : ["-", "-", "-"]).map((busTime, index) => (
                <span key={index}>{busTime}&nbsp;</span> // each arrivaltime in mins
            ))
        }
        </button>
        </div>
    </>
    )
}

export default ArrivalTimesList