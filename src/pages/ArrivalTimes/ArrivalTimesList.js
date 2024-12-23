import { getAllBusStops, getBusStopInfo, getBusTiming, getBusDirections } from '../../helper_functions'
import React, { useState, useEffect } from 'react';
import BouncyBouncy from '../LoadingPage';


// props.data.type is the type of value, either "busNo", "busStop" or "stopNumber"
const ArrivalTimesList = (props) => {

    return (
        <>
        {
            (props.data.type == "busNo") ?
            <BusRouteList data={props.data} />
            : ((props.data.type == "busStop" || props.data.type == "nearestBusStop") ?
            <BusStopList data={props.data} />
            : "Error")
        }
        </>
    )
};

// for busNo
const BusRouteList = (props) => {
    let [direction, setDirection] = useState(1)
    let [busDirections, setBusDirections] = useState([])
    const [stopNumbersList, setStopNumbersList] = useState([])
    const [busStopNameList, setBusStopNameList] = useState([])
    const [busTimesListList, setBusTimesListList] = useState([])

    // updates list when props updates
    useEffect(() => {
        const resetLists = () => {
            setBusDirections([])
            setStopNumbersList([])
            setBusStopNameList([])
            setBusTimesListList([])
        }
        const updateLists = async () => {
            const BusService = props.data.busNumber
            busDirections = await getBusDirections(BusService)
            setBusDirections(busDirections)
            const bsc_list = await getAllBusStops(BusService, direction)
            setStopNumbersList(bsc_list)
            const stopname_list = []
            const busarrivallist_list = []
            for (const bsc of bsc_list) {
                const data = await getBusStopInfo(bsc, "Description")
                stopname_list.push(data)
                const list = await getBusTiming(bsc, BusService)
                busarrivallist_list.push(list)
            }
            setBusStopNameList(stopname_list)
            setBusTimesListList(busarrivallist_list)
        }
        resetLists();
        updateLists();
        
    }, [props.data, direction]);    

    const toggleDirection = () => {
        if (direction == 1)
            setDirection(2)
        else
            setDirection(1)
    }

    return (
        <>
        {
            (busStopNameList.length == stopNumbersList.length) ? // finished loading
            (
                <>
                {(busDirections.length === 2) && (
                    <button onClick={toggleDirection}>
                        {busDirections[direction-1].start} → {busDirections[direction-1].end}
                    </button>
                )}
                <div className="list">
                {Array.from({ length: stopNumbersList.length }, (_, index) => (
                  <div key={index} className="bar">
                    <ul><li>
                        <BusRouteElement 
                        stopNo={stopNumbersList[index]} 
                        stopName={busStopNameList[index]} 
                        busTimesList={busTimesListList[index]} />
                    </li></ul>
                  </div>
                ))}
              </div>
              </>
            ) :
            (
                <BouncyBouncy/>
            )
        }
        </>
    )
}

const BusRouteElement = (props) => {
    return (
    <>
        {props.stopName}
        <br/>
        {props.stopNo}
        <br/>
        {
            (props.busTimesList).map((busTime, index) => (
                <span key={index}>{busTime}&nbsp;</span>
            ))
        }
    </>
    )
}

// for busStop & stopNumber
const BusStopList = (props) => {
    return
}
export default ArrivalTimesList