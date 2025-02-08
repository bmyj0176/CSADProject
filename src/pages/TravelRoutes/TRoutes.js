import { useState, useEffect } from "react"
import { dijkstra, getMap } from "../../utils/travel_algorithms"
import { stationToCode } from "../../utils/helper_functions"
import { cleanMRTStationName, suffixMRTStationName } from "../../utils/helper_functions2"
import { codeToMRTImagePath } from "../../utils/helper_functions2"
// {props.location1.type /* type can be "station" or "busStop" */}<br/>
// {props.location1.stationCodes}<br/>
// {props.location1.stationName}<br/>

const TRoutes = (props) => {
    const [totalTimeTaken, setTotalTimeTaken] = useState(null)
    const [travelData, setTravelData] = useState([])
    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)
    
    useEffect(() => {
        temporary_data = {
            "time_taken": 58,
            "transfers": 3,
            "route": [
                {
                    "time_taken" : null,
                    "transport_mode" : null,
                    "transport_name" : null,
                    "location_name" : "Woodgrove Pr Sch",
                    "location_type" : "bus_stop",
                    "location_info" : "46971",
                },
                {
                    "time_taken" : "3",
                    "transport_mode" : "bus",
                    "transport_name" : "901",
                    "location_name" : "W'lands Sth Stn Exit 2",
                    "location_type" : "bus_stop",
                    "location_info" : "46981",
                },
                {
                    "time_taken" : "3",
                    "transport_mode" : "bus_mrt_transfer",
                    "transport_name" : null,
                    "location_name" : "Woodlands South",
                    "location_type" : "mrt_stn",
                    "location_info" : "Woodlands South_TE",
                },
                {
                    "time_taken" : "21",
                    "transport_mode" : "mrt",
                    "transport_name" : "TEL",
                    "location_name" : "Caldecott",
                    "location_type" : "mrt_stn",
                    "location_info" : "Caldecott_TE",
                },
                {
                    "time_taken" : "4",
                    "transport_mode" : "mrt_transfer",
                    "transport_name" : null,
                    "location_name" : "Caldecott",
                    "location_type" : "mrt_stn",
                    "location_info" : "Caldecott_CC",
                },
                {
                    "time_taken" : "17",
                    "transport_mode" : "mrt",
                    "transport_name" : "CCL",
                    "location_name" : "Buona Vista",
                    "location_type" : "mrt_stn",
                    "location_info" : "Buona Vista_CC",
                },
                {
                    "time_taken" : "4",
                    "transport_mode" : "mrt_transfer",
                    "transport_name" : null,
                    "location_name" : "Buona Vista",
                    "location_type" : "mrt_stn",
                    "location_info" : "Buona Vista_EW",
                },
                {
                    "time_taken" : "6",
                    "transport_mode" : "mrt",
                    "transport_name" : "EWL",
                    "location_name" : "Dover",
                    "location_type" : "mrt_stn",
                    "location_info" : "Dover_EW",
                }
            ]
        }
        setTravelData(temporary_data);
    }, [])

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

const LocationLabel = async (props) => { // props: location_name, location_type, location_info
    switch(props.location_type) {
        case "bus_stop":
            return (
                <>
                    {props.location_name}
                    &nbsp;•&nbsp;
                    Bus Stop
                </>
            )
        case "mrt_stn":
            const stnCode = await stationToCode(props.location_info)
            return (
                <>
                    {`${props.location_name} (${stnCode})`}
                    &nbsp;•&nbsp;
                    MRT Station
                </>
            )
    }
    return
}

const TransportLabel = async (props) => { // props: transport_mode, transport_name, location_name, location_info
    let stnCode;
    let src;
    switch(props.transport_mode) {
        case "mrt":
            stnCode = await stationToCode(props.location_info)
            src = codeToMRTImagePath(stnCode)
            return (
                <>
                    Take {props.transport_name} to {props.location_name} <img className='mrticon' src={src}/>
                </>
            )
        case "bus":
            return (
                <>
                    Take Bus {props.transport_name} to {props.location_name}
                </>
            )
        case "mrt_transfer":
            stnCode = await stationToCode(props.location_info)
            src = codeToMRTImagePath(stnCode)
            return (
                <>
                    Transfer MRT to {stnCode} <img className='mrticon' src={src}/>
                </>
            )
        case "mrt_bus_transfer":
            return (
                <>
                    Go to Bus Stop {props.location_name}
                </>
            )
        case "bus_transfer":
            return (
                <>
                    Change to Bus {props.transport_name} at {props.location_name}
                </>
            )
        case "bus_mrt_transfer":
            stnCode = await stationToCode(props.location_info)
            src = codeToMRTImagePath(stnCode)
            return (
                <>
                    Go to MRT Platform {stnCode} <img className='mrticon' src={src}/>
                </>
            )
    }
    return
} 

const TimeLabel = (props) => { // props: time_taken
    return (
        <>
            {props.time_taken} mins
        </>
    )
}

export default TRoutes
