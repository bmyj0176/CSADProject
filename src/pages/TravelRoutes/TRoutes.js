import { useState, useEffect } from "react"
import { dijkstra, getMap } from "../../travel_algorithms"
import { cleanMRTStationName, suffixMRTStationName } from "../../helper_functions2"

// {props.location1.type /* type can be "station" or "busStop" */}<br/>
// {props.location1.stationCodes}<br/>
// {props.location1.stationName}<br/>

const TRoutes = (props) => {
    const [timeTaken, setTimeTaken] = useState(null)
    const [startPoint, setStartPoint] = useState(null)
    const [endPoint, setEndPoint] = useState(null)

    useEffect(() => {
        const getData = async () => {
            setStartPoint(props.location1.stationName)
            setEndPoint(props.location2.stationName)
            if (props.location1.stationCodes.length > 1 || props.location2.stationCodes.length > 1)
                await modifyStationName() // if theres multiple platforms at station, find the most ideal one by time
        }
        const modifyStationName = async () => { 
            if (props.location1.stationCodes.length > 1) { // loc1
                let best_time = Infinity
                let best_station_code = null
                for (const stationCode of props.location1.stationCodes) {
                    let data = dijkstra(await getMap(), suffixMRTStationName(props.location1.stationName, stationCode), props.location2.stationName)
                    if (data.time_taken < best_time) {
                        best_time = data.time_taken
                        best_station_code = stationCode
                    }
                }
                setStartPoint(suffixMRTStationName(props.location1.stationName, best_station_code))
            }
            if (props.location2.stationCodes.length > 1) { // loc2
                let best_time = Infinity
                let best_station_code = null
                for (const stationCode of props.location2.stationCodes) {
                    let data = dijkstra(await getMap(), props.location1.stationName, suffixMRTStationName(props.location2.stationName, stationCode))
                    if (data.time_taken < best_time) {
                        best_time = data.time_taken
                        best_station_code = stationCode
                    }
                }
                setEndPoint(suffixMRTStationName(props.location2.stationName, best_station_code))
            }
        }
        getData()
        // run code that will only happen once here, like void setup()
    }, [])

    useEffect(() => {
        if (startPoint && endPoint) {
            const calculate = async () => {
                const data = await dijkstra(await getMap(), startPoint, endPoint);
                setTimeTaken(data.time_taken);
            };
            calculate();
        }
    }, [startPoint, endPoint]); 

    return (
        <>
        <h4>
            {startPoint} → {endPoint}
        </h4>
        <h2>
            {timeTaken} minutes
        </h2>
        </>
    )
}

export default TRoutes
