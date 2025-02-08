import React, { useState, useEffect } from "react"
import { dijkstra, getAllMaps } from "../../utils/travel_algorithms_final"
import { stationToCode } from "../../utils/helper_functions"
import { cleanMRTStationName, downloadJSON } from "../../utils/helper_functions2"
import { getBusStopInfo } from "../../utils/helper_functions"
import { codeToMRTImagePath, suffixMRTStationName } from "../../utils/helper_functions2"
import BouncyBouncy from "../Components/LoadingIcon"
// {props.location1.type /* type can be "station" or "busStop" */}<br/>
// {props.location1.stationCodes}<br/>
// {props.location1.stationName}<br/>

const TRoutes = (props) => {
    const [totalTimeTaken, setTotalTimeTaken] = useState(null);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [startLabel, setStartLabel] = useState("");
    const [endLabel, setEndLabel] = useState("");
    const [simpleRoute, setSimpleRoute] = useState(null);
    const [simpleRouteList, setSimpleRouteList] = useState(null);
    const [fullRoute, setFullRoute] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const setup = async () => {
            setStart(props.location1)
            setEnd(props.location2)
            if (props.location1.type === "busStop") {
                setStartLabel(props.location1.busStopName)
            } else {
                setStartLabel(props.location1.stationName)
            }   
            if (props.location2.type === "busStop") {
                setEndLabel(props.location2.busStopName)
            } else {
                setEndLabel(props.location2.stationName)
            }
            const [inputMap, inputCodeToName, inputInterchanges] = await getAllMaps();
            const startData = (props.location1.type === "busStop") ? props.location1.busStopCode : props.location1.stationName
            const endData = (props.location2.type === "busStop") ? props.location2.busStopCode : props.location2.stationName
            const {route, simple_route, time_taken} = await dijkstra(inputMap, startData, endData, inputCodeToName, inputInterchanges);
            if (!route) { setError("Oh no! We couldn't find a route.") }
            setSimpleRoute(simple_route)
            setTotalTimeTaken(time_taken)
        }
        setup();
    }, [])

    useEffect(() => {
        if (!simpleRoute) return; // skip if simpleRoute is null
        const make_list = () => {
            const list = [];
            for (const [key, value] of simpleRoute) {
                let locationInfo = key;
                let method;
                let time;
                let numberOfStops;
                let method_value = value[0];
    
                if (method_value) {
                    if (isBusNumber(method_value)) {
                        method = "bus";
                    } else if (isMRTLine(method_value)) {
                        method = "train";
                        method_value = method_value[0];
                    } else if (method_value[0].includes("transfer")) {
                        method = method_value[0];
                        method_value = method_value[0];
                    }
                    time = value[1];
                    numberOfStops = value[2];
                } else {
                    method = "start";
                }
    
                list.push({
                    locationInfo,
                    time,
                    numberOfStops,
                    method,
                    method_value,
                });
            }
            console.log("setSimpleRouteList", list);
            setSimpleRouteList(list);
        };
    
        make_list();
    }, [simpleRoute]);
    
    useEffect(() => {
        if (!simpleRouteList) return; // skip if simpleRouteList is null
        const make_route_info = async () => {
            const route = [];
            const routePromises = simpleRouteList.map(async (dict) => {
                let time_taken = dict.time || null;
                let transport_mode = dict.method !== "start" ? dict.method : null;
                let transport_names = dict.method.includes("transfer") ? [] : dict.method_value || [];
                let location_name = isBusStopCode(dict.locationInfo)
                    ? await getBusStopInfo(dict.locationInfo, "Description")
                    : await cleanMRTStationName(dict.locationInfo); // Ensure this is awaited as well
                let location_type = isBusStopCode(dict.locationInfo)
                    ? "bus_stop"
                    : "mrt_stn";
                let location_info = dict.locationInfo;
                
                return {
                    time_taken,
                    transport_mode,
                    transport_names,
                    location_name,
                    location_type,
                    location_info,
                };
            });
    
            // Wait for all async operations to complete
            const fullRouteData = await Promise.all(routePromises);
            console.log("setFullRoute", fullRouteData);
            setFullRoute(fullRouteData);
        };
    
        make_route_info();
    }, [simpleRouteList]); 

    // ["901A"] = true
    const isBusNumber = (input_list) => {
        return input_list.some(item => /\d/.test(item))
    }

    // ["NSL"] = true
    const isMRTLine = (input_list) => {
        return input_list.length === 1 && !input_list[0].includes("transfer") && !/\d/.test(input_list[0])
    }

    // "90123" = true
    const isBusStopCode = (str) => /^\d+$/.test(str);

    return (
        <div>
            <h1>{Math.round(totalTimeTaken) + " Minutes"}</h1>
            <h2>{startLabel} → {endLabel}</h2>
            { error ? error :
            (fullRoute.length > 0 && simpleRouteList.length === fullRoute.length) ?
            <ul>
                {fullRoute.map((data, index) => (
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
                            transport_names={data.transport_names}
                            location_name={data.location_name}
                            location_info={data.location_info}/>
                        </div>
                        }
                    </li>
                    <br/>
                </>
                ))}
            </ul>
            :
            <BouncyBouncy/>
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
                &nbsp;•
                Bus Stop
            </>
        )
    }

    if (props.location_type === "mrt_stn" && stnCode) {
        return (
            <>
                {`${props.location_name} (${stnCode})`}
                &nbsp;•
                MRT Station
            </>
        )
    }

    return null
}

const TransportLabel = (props) => { // props: transport_mode, transport_names, location_name, location_info
    const [stnCode, setStnCode] = useState(null)
    const [src, setSrc] = useState(null)

    useEffect(() => {
        const fetchTransportData = async () => {
            if (
                props.transport_mode === "train"
                || props.transport_mode === "TTtransfer"
                || props.transport_mode === "BTtransfer"
            ) {
                const code = await stationToCode(props.location_info)
                setStnCode(code)
                const imageSrc = codeToMRTImagePath(code)
                setSrc(imageSrc)
            }
        }
        fetchTransportData()
    }, [props.location_info, props.transport_mode])

    if (props.transport_mode === "train") {
        return (
            <>
                Take {props.transport_names} to {props.location_name} <img className='mrticon' src={src} alt={stnCode}/>
            </>
        )
    }

    if (props.transport_mode === "bus") {
        return (
            props.transport_names.length < 2 ?
            <> Change to Bus {props.transport_names[0]} at {props.location_name} </>
            :
            <>
                Take any Buses&nbsp;
                 {props.transport_names.map((item, index) => (
                    <React.Fragment key={index}>
                        {index > 0 && "/"}
                        <span>{item}</span>
                    </React.Fragment>
                ))} 
                &nbsp;to {props.location_name}
            </>
        )
    }

    if (props.transport_mode === "TTtransfer") {
        return (
            <>
                Transfer MRT to {stnCode} <img className='mrticon' src={src} alt={stnCode}/>
            </>
        )
    }

    if (props.transport_mode === "BTtransfer") {
        return (
            <>
                Go to MRT Platform {stnCode} <img className='mrticon' src={src}/>
            </>
        )
    }

    if (props.transport_mode === "TBtransfer") {
        return (
            <>
                Go to Bus Stop {props.location_name}
            </>
        )
    }

    if (props.transport_mode === "BBtransfer") {
        return (
            <>
                {
                    props.transport_names.length < 2 ?
                    <> Change to Bus {props.transport_names[0]} at {props.location_name} </>
                    :
                    <>
                        Change to any Buses&nbsp;
                        {props.transport_names.map((item, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && "/"}
                                <span>{item}</span>
                            </React.Fragment>
                        ))}
                        &nbsp;at {props.location_name} 
                    </>
                }
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
