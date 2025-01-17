import { getAllBusServices, getBusTiming } from '../../helper_functions'
import React, { useState, useEffect } from 'react';
import BouncyBouncy from '../Components/LoadingIcon';
import { ArrivalTimesElement } from './ArrivalTimesList';

const BusStopList = (props) => {
    const [busServicesList, setBusServicesList] = useState([])
    const [busTimesListList, setBusTimesListList] = useState([])

    // updates list when props updates
    useEffect(() => {
        const resetLists = () => {
            setBusServicesList([])
            setBusTimesListList([])
        }
        const updateLists = async () => {
            const BusStopCode = props.data.busStopCode
            const busServices = await getAllBusServices(BusStopCode)
            setBusServicesList(busServices)
            const busTimesList = await Promise.all(
                busServices.map((busService) => getBusTiming(BusStopCode, busService))
            );
            setBusTimesListList(busTimesList); // Update the state with the fetched results
        }
        resetLists();
        updateLists();
        
    }, [props.data]);    

    const updateBusTimes = async (index) => {
        const newBusTimes = [...busTimesListList]
        const busTiming = await getBusTiming(props.data.busStopCode, busServicesList[index])
        newBusTimes[index] = busTiming
        setBusTimesListList(newBusTimes)
    }
    
    return (
        <>
        <h2>{props.data.busStopName}</h2>
        {
            (busServicesList.length === busTimesListList.length) ? // finished loading
            (
                <>
                <div className="list">
                {Array.from({ length: busServicesList.length }, (_, index) => (
                  <div key={index} className="bar">
                    <ul><li>
                        <BusStopElement 
                        index={index}
                        busService={busServicesList[index]} 
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

const BusStopElement = (props) => {
    return (
        <ArrivalTimesElement
        header={"Bus " + props.busService}
        subheader={""}
        busTimesList={props.busTimesList}
        updateBusTimes={() => props.updateBusTimes(props.index)}/>
    )
}

export default BusStopList