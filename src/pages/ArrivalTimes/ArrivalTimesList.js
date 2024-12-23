import { getAllBusStops, getBusStopInfo, getBusTiming } from '../../helper_functions'
import React, { useState, useEffect } from 'react';

// props.data.value is the value based on type, e.g. "185", "34593" or "Dover Stn Exit B"
// props.data.type is the type of value, either "busNo", "busStop" or "stopNumber"
// props.data.distance will be the distance from the busStop (only for near me search), otherwise null
const ArrivalTimesList = (props) => {
    console.log(`props.data.type = ${props.data.type}`)
    console.log(`test = ${(props.data.type == "busNo")}`)

    return (
        <>
        <p>test</p>
        {
            (props.data.type == "busNo") ?
            <BusRouteList data={props.data} />
            : ((props.data.type == "busStop" || props.data.type == "stopNumber") ?
            <BusStopList data={props.data} />
            : "Error")
        }
        </>
    )
};

// for busNo
const BusRouteList = (props) => {
    const [stopNumbersList, setStopNumbersList] = useState([])
    const [busStopNameList, setBusStopNameList] = useState([])
    const [busTimesListList, setBusTimesListList] = useState([])

    // updates list when props updates
    useEffect(() => {
        const updateLists = async () => {
            const bsc_list = await getAllBusStops(props.data.value)
            setStopNumbersList(bsc_list)
            const stopname_list = []
            const busarrivallist_list = []
            for (const bsc of bsc_list) {
                const data = await getBusStopInfo("BusStopCode", bsc)
                stopname_list.push(data.Description)
                const list = await getBusTiming(bsc, props.data.value)
                busarrivallist_list.push(list)
            }
            setBusStopNameList(stopname_list)
            setBusTimesListList(busarrivallist_list)
        }
        updateLists();
        
    }, [props]);    
    
    return (
        <>
        <p>test2</p>
        <div className="list">
          {Array.from({ length: stopNumbersList.length }, (_, index) => (
            <div key={index} className="bar">
              {stopNumbersList[index]} <br/> {busStopNameList[index]} <br/>
            </div>
          ))}
        </div>
        </>
    )
}

// for busStop & stopNumber
const BusStopList = (props) => {
    return
}
export default ArrivalTimesList