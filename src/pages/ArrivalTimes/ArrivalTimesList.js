import React, { useState, useEffect } from 'react';
import { getAllBusStops, getBusStopInfo, getAllBusServices, getBusTiming, getBusDirections } from '../../utils/helper_functions'
import BouncyBouncy from '../Components/LoadingIcon';
import ArrivalTimesElement from './ArrivalTimesElement';
import "../stylesheets/ATpages/at_list.css";


const ArrivalTimesList = (props) => {
    const [direction, setDirection] = useState(1)
    const [directionalData, setDirectionalData] = useState([])
    const [stopCodesList, setStopCodesList] = useState([])
    const [stopNamesList, setStopNamesList] = useState([])
    const [servicesList, setServicesList] = useState([])
    const [timesListList, setTimesListList] = useState([])
    const [lastSearchHistory, setLastSearchHistory] = useState(null)

    // updates list when props updates
    useEffect(() => {
        const resetLists = () => {
            setDirectionalData([]);
            setStopCodesList([]);
            setStopNamesList([]);
            setServicesList([]);
            setTimesListList([]);
        }
        
        const updateSearchHistory = () => {
            if (props.data.searchHistory) {
                const lastSearchHistoryItem = props.data.searchHistory[props.data.searchHistory.length-1] // last one
                setLastSearchHistory(lastSearchHistoryItem)
            }
        }

        const updateLists = async () => {
            if (props.data.type === "busNo") {
                const busService = props.data.busService
                const busDirections = await getBusDirections(busService)
                setDirectionalData(busDirections)
                const busStopCodes = await getAllBusStops(busService, direction)
                setStopCodesList(busStopCodes)
                const stopName_list = []
                for (const bsc of busStopCodes) {
                    const data = await getBusStopInfo(bsc, "Description")
                    stopName_list.push(data)
                }
                setStopNamesList(stopName_list)
                setServicesList(Array(busStopCodes.length).fill(busService))
                const busarrivallist_list = await Promise.all(
                    busStopCodes.map((bsc) => getBusTiming(bsc, busService))
                );
                setTimesListList(busarrivallist_list); 
            }
            else { // "busStop" || "nearestBusStop"
                const busStopCode = props.data.busStopCode
                const busStopName = props.data.busStopName
                const busServices = await getAllBusServices(busStopCode)
                setServicesList(busServices)
                setStopCodesList(Array(busServices.length).fill(busStopCode))
                setStopNamesList(Array(busServices.length).fill(busStopName))
                const busTimesList = await Promise.all(
                    busServices.map((busService) => getBusTiming(busStopCode, busService))
                );
                setTimesListList(busTimesList); 
            }
        }
        resetLists();
        updateSearchHistory();
        updateLists();
        
    }, [props.data, direction]); 

    const toggleDirection = () => {
        if (direction === 1)
            setDirection(2)
        else
            setDirection(1)
    }

    const updateBusTimes = async (index) => {
        const newBusTimes = [...timesListList]
        const busTiming = await getBusTiming(stopCodesList[index], servicesList[index])
        newBusTimes[index] = busTiming
        setTimesListList(newBusTimes)
    }

    const passSearchResult = (value) => {
        let searchHistory;
        if (props.data.searchHistory) { // search history found, use old list
            searchHistory = props.data.searchHistory
        } else { // search history not found, add new list
            searchHistory = []
        }
        searchHistory.push(
            {
                type: props.data.type,
                busService: props.data.busService,
                busStopName: props.data.busStopName,
                busStopCode: props.data.busStopCode,
            }
        )
        value.searchHistory = searchHistory
        props.receiveSearchResult(value) // pass it back to ArrivalTimes
    };

    const onGoBackHistory = () => {
        let newSearchHistory = props.data.searchHistory
        newSearchHistory.pop(); // remove last one
        let value = {
            type: lastSearchHistory.type,
            busService: lastSearchHistory.busService,
            busStopName: lastSearchHistory.busStopName,
            busStopCode: lastSearchHistory.busStopCode,
        }
        value.searchHistory = newSearchHistory
        props.receiveSearchResult(value) // pass it back to ArrivalTimes
    }

    return (
        <>
        <h4 className="historyBtn">
            {(lastSearchHistory) &&
            <button 
            onClick={onGoBackHistory}>
                &lt;
                {
                    (lastSearchHistory.type === "busNo") ? 
                    <> Bus {lastSearchHistory.busService} </> :
                    <> {lastSearchHistory.busStopName} </>
                }
                </button>
            }
        </h4>
        <h2 className="ATListHeader">{
            (props.data.type === "busNo") 
            ?
            "Bus " + props.data.busService
            :
            props.data.busStopName
        }</h2>
        {
            (stopNamesList.length === stopCodesList.length && stopCodesList.length === servicesList.length) ? // finished loading
            (
                <div className="atlistwow">
                <BusDirectionToggleButton 
                direction={direction}
                directionalData={directionalData} 
                toggleDirection={toggleDirection}/>
                <div className="list">
                {Array.from({ length: stopCodesList.length }, (_, index) => (
                  <div key={index} className="bar">
                    <ul className={props.data.type === "busNo" ? "busNoUL" : "busStopUL"} ><li className={props.data.type === "busNo" ? "busNoLi" : "busStopLi"}>
                        <ArrivalTimesElement 
                        type={props.data.type}
                        busStopCode={stopCodesList[index]} 
                        busStopName={stopNamesList[index]}
                        busService={servicesList[index]}
                        busTimesList={timesListList[index]}
                        updateBusTimes={() => updateBusTimes(index)}
                        passSearchResult={passSearchResult}
                        favedItems={props.favedItems}
                        onFavItem={props.onFavItem} />
                    </li></ul>
                  </div>
                ))}
              </div>
              </div>
            ) :
            (
                <BouncyBouncy/>
            )
        }

        </>
    )
};

const BusDirectionToggleButton = (props) => {
    return (
        <>
        {(props.directionalData.length === 2) && (
            <button onClick={props.toggleDirection}>
                {props.directionalData[props.direction-1].start} → {props.directionalData[props.direction-1].end}
            </button>
        )}
        </>
    )
}

export default ArrivalTimesList