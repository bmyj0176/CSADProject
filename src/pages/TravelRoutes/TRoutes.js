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
    const [routeData, setRouteData] = useState([])
    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)
    const [startLabel, setStartLabel] = useState("")
    const [endLabel, setEndLabel] = useState("")

    useEffect(() => {
        setStart(props.location1)
        setEnd(props.location2)
        props.location1.type === "busStop" ?
            setStartLabel(props.location1.busStopCode) :
            setStartLabel(props.location1.stationName)
        props.location2.type === "busStop" ?
            setEndLabel(props.location2.busStopCode) :
            setEndLabel(props.location2.stationName)
        const temporary_data = {
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
                    "location_info" : "Woodlands South",
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
                    "location_info" : "Dover",
                }
            ]
        }
        setRouteData(temporary_data.route);
    }, [])

    return (
        <div>
            <h2>{startLabel} → {endLabel}</h2>
            { routeData.length > 0 &&
            <ul>
                {routeData.map((data, index) => (
                <>
                    <li key={index}>
                        {(index % 2 == 0) 
                        ?
                        <div style={{fontSize:'2rem', color:'white'}}>
                            <LocationLabel
                            location_name={data.location_name}
                            location_type={data.location_type}
                            location_info={data.location_info}/>
                        </div>
                        :
                        <div style={{fontSize:'1.5rem'}}>
                            &nbsp;&nbsp;&nbsp;<TransportLabel
                            transport_mode={data.transport_mode}
                            transport_name={data.transport_name}
                            location_name={data.location_name}
                            location_info={data.location_info}/>
                        </div>
                        }
                    </li>
                    <br/>
                </>
                ))}
                <li>
                    <div style={{fontSize:'2rem', color:'white'}}>
                        <LocationLabel
                        location_name={routeData[routeData.length-1].location_name}
                        location_type={routeData[routeData.length-1].location_type}
                        location_info={routeData[routeData.length-1].location_info}/>
                    </div>
                </li>
            </ul>
            }
        </div>
    )
}

const LocationLabel = (props) => { // props: location_name, location_type, location_info
    const [stnCode, setStnCode] = useState(null)

    useEffect(() => {
        const fetchStationCode = async () => {
            if (props.location_type === "mrt_stn") {
                const code = await stationToCode(props.location_info)
                setStnCode(code)
            }
        }
        fetchStationCode()
    }, [props.location_info, props.location_type])

    if (props.location_type === "bus_stop") {
        return (
            <>
                {props.location_name}
                &nbsp;•&nbsp;
                Bus Stop
            </>
        )
    }

    if (props.location_type === "mrt_stn" && stnCode) {
        return (
            <>
                {`${props.location_name} (${stnCode})`}
                &nbsp;•&nbsp;
                MRT Station
            </>
        )
    }

    return null
}

const TransportLabel = (props) => { // props: transport_mode, transport_name, location_name, location_info
    const [stnCode, setStnCode] = useState(null)
    const [src, setSrc] = useState(null)

    useEffect(() => {
        const fetchTransportData = async () => {
            if (
                props.transport_mode === "mrt"
                || props.transport_mode === "mrt_transfer"
                || props.transport_mode === "bus_mrt_transfer"
            ) {
                console.log(props.transport_mode)
                const code = await stationToCode(props.location_info)
                setStnCode(code)
                console.log(code)
                const imageSrc = codeToMRTImagePath(code)
                setSrc(imageSrc)
            }
        }
        fetchTransportData()
    }, [props.location_info, props.transport_mode])

    if (props.transport_mode === "mrt") {
        return (
            <>
                Take {props.transport_name} to {props.location_name} <img className='mrticon' src={src} alt={stnCode}/>
            </>
        )
    }

    if (props.transport_mode === "bus") {
        return (
            <>
                Take Bus {props.transport_name} to {props.location_name}
            </>
        )
    }

    if (props.transport_mode === "mrt_transfer") {
        return (
            <>
                Transfer MRT to {stnCode} <img className='mrticon' src={src} alt={stnCode}/>
            </>
        )
    }

    if (props.transport_mode === "bus_mrt_transfer") {
        return (
            <>
                Go to MRT Platform {stnCode} <img className='mrticon' src={src}/>
            </>
        )
    }

    if (props.transport_mode === "mrt_bus_transfer") {
        return (
            <>
                Go to Bus Stop {props.location_name}
            </>
        )
    }

    if (props.transport_mode === "bus_transfer") {
        return (
            <>
                Change to Bus {props.transport_name} at {props.location_name}
            </>
        )
    }

    return null
}


const TimeLabel = (props) => { // props: time_taken
    return (
        <>
            {props.time_taken} mins
        </>
    )
}

export default TRoutes
