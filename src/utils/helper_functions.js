import { doxx, haversine, insertAndShift } from "./helper_functions2";
import { BusArrival } from "./api_caller";


export async function getjson(path) {
    return fetch(path) 
    .then(response => {
      return response.json() 
    })
    .then(data => {
      return data 
    })
  }







export async function getBusTiming(BusStopCode, BusNumber) {
    
    const response = await BusArrival(BusStopCode);
    if (!response || !response.Services) {
        return null 
    }
    const services = response.Services;
    if (services.length === 0) {
        return null
    }
    const service = services.find(service => service["ServiceNo"] === BusNumber); 
    if (!service || !service.NextBus || !service.NextBus?.EstimatedArrival) {
        return null
    }
    const nextBusDates = [
        service.NextBus?.EstimatedArrival || null,
        service.NextBus2?.EstimatedArrival || null,
        service.NextBus3?.EstimatedArrival || null
    ];
    const currentDate = new Date();
    return nextBusDates.map(nextBusDate => {
        if (!nextBusDate) {
            return "-";
        }
        const arrivalTime = new Date(nextBusDate);
        let diffMinutes = Math.floor((arrivalTime - currentDate) / 60000); 
        if (diffMinutes < 0) {
            diffMinutes = 0;
        }
        return diffMinutes === 0 ? "Now" : diffMinutes;
    });
}




export async function getBusStopInfo(BusStopCode, key) {
    const complete_list = await getjson('./datasets/bus_stops_complete.json');
    for (const dict of complete_list) {
        if (dict.BusStopCode === BusStopCode)
            return dict[key]
    }
    console.error("BusStopCode couldn't be found!")
    return null
}




export async function getAllBusStops(BusService, direction) {
    const stopNumberList = []
    const data = await getjson('./datasets/busstops_map.json')
    const list = data[BusService][direction]
    for (const item of list)
        stopNumberList.push(item[0])
    return stopNumberList
}



export async function getAllBusServices(BusStopCode) {
    const data = await getjson('./datasets/bus_services_at_stop.json')
    return data[BusStopCode];
}




export async function getBusDirections(BusService) {
    const directions = [];
    const data = await getjson('./datasets/busstops_map.json');
    const service = data[BusService];
    directions.push({
        direction: 1, 
        start: await getBusStopInfo(service["startend1"][0], "Description"),
        end: await getBusStopInfo(service["startend1"][1], "Description"),
    })
    if (!service["startend2"])
        return directions
    directions.push({
        direction: 2, 
        start: await getBusStopInfo(service["startend2"][0], "Description"),
        end: await getBusStopInfo(service["startend2"][1], "Description"),
    })
    return directions
}





export async function getRoadDistance(BusService, BSCode1, BSCode2) {
    let dist1 = null;
    let dist2 = null;
    const data = await getjson('./datasets/busstops_map.json');
    for (const direction of ["1", "2"]) {
        const list = data[BusService][direction];
        dist1 = Object.fromEntries(list)[BSCode1];
        dist2 = Object.fromEntries(list)[BSCode2];
        if (dist1 && dist2)
            break;
    }
    
    return Math.abs(BSCode1 - BSCode2);
}





export function searchInList(searchQuery, inputList, cap = 50) {
    const outputList = []
    const outputListIndexes = [] 
    const cleaned_searchQuery = searchQuery.toLowerCase().replace(/\s+/g, '').replace(/[^\w\s]/g, '')
    
    for (let n = 0; n < inputList.length; n++) {
        const cleaned_item = inputList[n].toLowerCase().replace(/\s+/g, '').replace(/[^\w\s]/g, '') 
        if (cleaned_item.startsWith(cleaned_searchQuery)) {
            outputList.push(inputList[n])
            outputListIndexes.push(n)
            if (cap != null && outputList.length >= cap) 
                return outputList;
        }
    }
    
    for (let n = 0; n < inputList.length; n++) { 
        const cleaned_item = inputList[n].toLowerCase().replace(/\s+/g, '').replace(/[^\w\s]/g, '') 
        if (cleaned_item.includes(cleaned_searchQuery)) {
            if (!outputListIndexes.includes(n)) 
                outputList.push(inputList[n])
            if (cap != null && outputList.length >= cap) 
                return outputList;
        }
    }
    return outputList;
}


export function searchInDualList(searchQuery, inputList, cap = 50, splicelistsize = null) {
    let excludedList = []
    if (splicelistsize) {
        excludedList = inputList.map(sublist => sublist.slice(splicelistsize, inputList.length))
        inputList = inputList.map(sublist => sublist.slice(0, splicelistsize))
    }
    const outputList = []
    const outputListIndexes = [] 
    const cleaned_searchQuery = searchQuery.toLowerCase().replace(/\s+/g, '').replace(/[^\w\s]/g, '')

    
    for (let n = 0; n < inputList.length; n++) {
        const cleaned_item = inputList[n].map(item => item.toLowerCase().replace(/\s+/g, '').replace(/[^\w\s]/g, '')) 
        if (cleaned_item.some(item => item.startsWith(cleaned_searchQuery))) {
            outputList.push([...inputList[n], ...excludedList[n]])
            outputListIndexes.push(n)
            if (cap != null && outputList.length >= cap) 
                return outputList;
        }
    }
    
    for (let n = 0; n < inputList.length; n++) { 
        const cleaned_item = inputList[n].map(item => item.toLowerCase().replace(/\s+/g, '').replace(/[^\w\s]/g, '')) 
        if (cleaned_item.some(item => item.includes(cleaned_searchQuery))) {
            if (!outputListIndexes.includes(n)) 
                outputList.push([...inputList[n], ...excludedList[n]])
            if (cap != null && outputList.length >= cap) 
                return outputList;
        }
    }
    return outputList;
}


export async function nearestBusStops(cap = 50) {
    let outputList = Array(cap).fill({"BusStopCode": "", "Distance": Infinity}) 
    
    const [hereLat, hereLon] = await doxx(); 
    
    
    if (hereLat === null || hereLon === null) {
        console.error("Unable to retrieve Geolocation data.");
        return null;
    }

    const BSC_CoordsList = await getjson('./datasets/bus_stops_complete.json')
    for (let dict of BSC_CoordsList) {
        const distance = haversine(hereLat, hereLon, dict.Latitude, dict.Longitude)
        for (let i = 0; i < outputList.length; i++) {
            if (distance < outputList[i].Distance) {
                outputList = insertAndShift(outputList, i, {"BusStopCode": dict.BusStopCode, "Distance": distance})
                break
            }
        }
    }
    return outputList
}


export async function stationToCode(station_name) {
    const data = await getjson('./datasets/mrtname_code_map.json');
    return data[station_name]
}