import { getAllBusStops, getBusStopInfo, getBusTiming, getBusDirections } from '../../helper_functions'
import React, { useState, useEffect } from 'react';
import BouncyBouncy from '../Components/LoadingIcon';
import { ArrivalTimesElement } from './ArrivalTimesList';

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
            for (const bsc of bsc_list) {
                const data = await getBusStopInfo(bsc, "Description")
                stopname_list.push(data)
            }
            setBusStopNameList(stopname_list)
            const busarrivallist_list = []
            for (const bsc of bsc_list) {
                const list = await getBusTiming(bsc, BusService)
                busarrivallist_list.push(list)
            }
            console.log("busarrivallist_list")
            console.log(busarrivallist_list)
            setBusTimesListList(busarrivallist_list)
        }
        resetLists();
        updateLists();
        
    }, [props.data, direction]);    

    const toggleDirection = () => {
        if (direction === 1)
            setDirection(2)
        else
            setDirection(1)
    }

    const updateBusTimes = async (index) => {
        const newBusTimes = [...busTimesListList]
        console.log(stopNumbersList[index])
        const busTiming = await getBusTiming(stopNumbersList[index], props.data.busNumber)
        newBusTimes[index] = busTiming
        setBusTimesListList(newBusTimes)
    }

    return (
        <>
        {
            (busStopNameList.length === stopNumbersList.length) ? // finished loading
            (
                <>
                <h3>{"Bus Service: " + props.data.busNumber}</h3>
                <BusDirectionToggleButton 
                direction={direction}
                busDirections={busDirections} 
                toggleDirection={toggleDirection}/>
                <div className="list">
                {Array.from({ length: stopNumbersList.length }, (_, index) => (
                  <div key={index} className="bar">
                    <ul><li>
                        <BusRouteElement 
                        index={index}
                        stopNo={stopNumbersList[index]} 
                        stopName={busStopNameList[index]} 
                        busTimesList={busTimesListList[index]}
                        updateBusTimes={updateBusTimes} />
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

const BusDirectionToggleButton = (props) => {
    return (
        <>
        {(props.busDirections.length === 2) && (
            <button onClick={props.toggleDirection}>
                {props.busDirections[props.direction-1].start} → {props.busDirections[props.direction-1].end}
            </button>
        )}
        </>
    )
}
// index, header, subheader, busTimesList, updateBusTimes
const BusRouteElement = (props) => {
    return (
        <ArrivalTimesElement
        index={props.index}
        header={props.stopName}
        subheader={props.stopNo}
        busTimesList={props.busTimesList}
        updateBusTimes={props.updateBusTimes}/>
    )
}

export default BusRouteList