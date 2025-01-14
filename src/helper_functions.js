import { convertISO8601, timeDiffISO8601, doxx, haversine, insertAndShift } from "./helper_functions2";
import { BusArrival, BusRoutes, BusStops } from "./api_caller";

// THIS FUNCTION PARSES ENTIRE JSON OBJECT FROM A FILE PATH
export async function getjson(path) {
    return fetch(path) // fetch json then return as promise
    .then(response => {
      return response.json() // parse into js object (promise)
    })
    .then(data => {
      return data // returns object
    })
  }

// getBusTiming() returns the arrival times of the next 3 buses
// INPUT1 BusStopCode - (string) 5 digit code of bus stop, e.g. '46971', '83139'
// INPUT2 BusNumber - (string) bus number, e.g. 185, 901M
// OUTPUT times[] - (list of strings) minutes until the next 3 buses arrive, e.g. [3, 12, 19]
// buses arriving in <1 min will be "Arr" and if there's no bus it'll be "-"
export async function getBusTiming(BusStopCode, BusNumber) {
    // Fetch bus arrival data
    const response = await BusArrival(BusStopCode);
    const services = response.Services;
    if (services.length === 0)
        return ["-", "-", "-"]
    const service = services.find(service => service["ServiceNo"] === BusNumber);
    const times = []
    const currentDate = new Date().toISOString(); 
    const nextBusDates = []
    try {nextBusDates.push(service.NextBus?.EstimatedArrival)} catch {nextBusDates.push(null)}
    try {nextBusDates.push(service.NextBus2?.EstimatedArrival)} catch {nextBusDates.push(null)}
    try {nextBusDates.push(service.NextBus3?.EstimatedArrival)} catch {nextBusDates.push(null)}
    for (let nextBusDate of nextBusDates) {
        if (nextBusDate == "")
            times.push("-")
        else {
            let time = timeDiffISO8601(convertISO8601(nextBusDate), currentDate)/60
            if (time < 0) { time = 0 }
            time = Math.floor(time)
            if (time == 0) { time = "Arr" }
            times.push(time)
        }
    }
    return times
    
}

// INPUT1 busStopCode - (string) bus stop code of bus stop you want to query, e.g. "46971"
// INPUT2 key - (string) key of value you want to output, like "BusStopCode", "RoadName", "Description", "Latitude" or "Longitude"
// OUTPUT BusStopInfo - (dict) consists of "BusStopCode", "RoadName", "Description", "Latitude" & "Longitude"
export async function getBusStopInfo(BusStopCode, key) {
    const complete_list = await getjson('./datasets/bus_stops_complete.txt');
    for (const dict of complete_list) {
        if (dict.BusStopCode == BusStopCode)
            return dict[key]
    }
    console.error("BusStopCode couldn't be found!")
    return null
}

// INPUT1 BusService - (string) bus service e.g. "185"
// INPUT2 direction - (int Number) either 1 or 2
// OUTPUT stopNumberList - (list of String) all bus stops this bus service passes by, in order
export async function getAllBusStops(BusService, direction) {
    const stopNumberList = []
    const data = await getjson('./datasets/busstops_map.json')
    const list = data[BusService][direction]
    for (const item of list)
        stopNumberList.push(item[0])
    return stopNumberList
}

// INPUT BusStopCode - (string) bus stop code of the bus stop
// OUTPUT busServicesList - (list of strings) all bus services available at said bus stop
export async function getAllBusServices(BusStopCode) {
    const busServicesList = []
    const data = await BusArrival(BusStopCode)
    const list = data.Services
    for (const dict of list) {
        if (!busServicesList.includes(dict.ServiceNo))
            busServicesList.push(dict.ServiceNo)
    }
    return busServicesList
}

// INPUT1 BusService - (string) bus service e.g. "185"
// OUTPUT directions - (list of dicts) list count is number of directions, dict = {direction: x, start: "stationName", end: "stationName"}
// direction can only be 1 or 2; start and end is the busStopName of first and last stop (usually bus interchange)
export async function getBusDirections(BusService) {
    const directions = []
    const d1Dicts = []
    const d2Dicts = []
    const data = await BusRoutes(BusService)
    const list = data.value
    for (const dict of list) {
        if (dict.ServiceNo === BusService)
            (dict.Direction == 1) ? d1Dicts.push(dict.BusStopCode) : d2Dicts.push(dict.BusStopCode)
    }
    if (d1Dicts.length > 0) {
        const d1Start = await getBusStopInfo(d1Dicts[0], "Description")
        const d1End = await getBusStopInfo(d1Dicts[d1Dicts.length-1], "Description")
        directions.push({direction: 1, start: d1Start, end: d1End})
    }
    if (d2Dicts.length > 0) {
        const d2Start = await getBusStopInfo(d2Dicts[0], "Description")
        const d2End = await getBusStopInfo(d2Dicts[d2Dicts.length-1], "Description")
        directions.push({direction: 2, start: d2Start, end: d2End})
    }
        
    return directions
}

// INPUT1 BusService - (string) bus service connecting two stops
// INPUT2 BSCode1 - (string) first bus stop code
// INPUT3 BSCode2 - (string) second bus stop code
// OUTPUT distance - (Number) distance in km between two bus stops
export async function getRoadDistance(BusService, BSCode1, BSCode2) {
    let stop1 = null;
    let stop2 = null;
    const data = await BusRoutes(BusService)
    const list = data.value
    for (let dict of list) {
        if (dict.ServiceNo === BusService) {
            if (dict.BusStopCode === BSCode1 || dict.BusStopCode === BSCode2) {
                if (!stop1) { stop1 = { ...dict }; }
                else if (!stop2) { 
                    stop2 = { ...dict }; 
                    break;
                }
            }
        }
    }
    return Math.abs(stop1.Distance - stop2.Distance);
}

// INPUT1 searchQuery - (string) the search term/substring for the list
// INPUT2 list - (list of strings) the full list of things that can be searched for
// INPUT3 cap - (int number) hard caps the total entries, default = 50 (RECOMMENDED TO REDUCE LAG)
// OUTPUT outputList - (list of strings) list of entries that is a product of substring
export function searchInList(searchQuery, inputList, cap = 50) {
    const outputList = []
    const outputListIndexes = [] // primary search filtering
    const cleaned_searchQuery = searchQuery.toLowerCase().replace(/\s+/g, '').replace(/[^\w\s]/g, '')
    // PRIMARY SEARCH - if substring at start of string
    for (let n = 0; n < inputList.length; n++) {
        const cleaned_item = inputList[n].toLowerCase().replace(/\s+/g, '').replace(/[^\w\s]/g, '') // for search ease, remove spaces, special chars & case sensitivity
        if (cleaned_item.startsWith(cleaned_searchQuery)) {
            outputList.push(inputList[n])
            outputListIndexes.push(n)
            if (cap != null && outputList.length >= cap) 
                return outputList;
        }
    }
    // SECONDARY SEARCH - if substring at anywhere, will appear below primary search results
    for (let n = 0; n < inputList.length; n++) { 
        const cleaned_item = inputList[n].toLowerCase().replace(/\s+/g, '').replace(/[^\w\s]/g, '') // for search ease, remove spaces, special chars & case sensitivity
        if (cleaned_item.includes(cleaned_searchQuery)) {
            if (!outputListIndexes.includes(n)) // only if not already filtered by primary search
                outputList.push(inputList[n])
            if (cap != null && outputList.length >= cap) 
                return outputList;
        }
    }
    return outputList;
}

// same as searchInList, but list contains lists of 2, example: [[1, 2], [3, 4], [3, 5]]
export function searchInDualList(searchQuery, inputList, cap = 50, splicelistsize = null) {
    let excludedList = []
    if (splicelistsize) {
        excludedList = inputList.map(sublist => sublist.slice(splicelistsize, inputList.length))
        inputList = inputList.map(sublist => sublist.slice(0, splicelistsize))
    }
    const outputList = []
    const outputListIndexes = [] // primary search filtering
    const cleaned_searchQuery = searchQuery.toLowerCase().replace(/\s+/g, '').replace(/[^\w\s]/g, '')

    // PRIMARY SEARCH - if substring at start of string
    for (let n = 0; n < inputList.length; n++) {
        const cleaned_item = inputList[n].map(item => item.toLowerCase().replace(/\s+/g, '').replace(/[^\w\s]/g, '')) // for search ease, remove spaces, special chars & case sensitivity
        if (cleaned_item.some(item => item.startsWith(cleaned_searchQuery))) {
            outputList.push([...inputList[n], ...excludedList[n]])
            outputListIndexes.push(n)
            if (cap != null && outputList.length >= cap) 
                return outputList;
        }
    }
    // SECONDARY SEARCH - if substring at anywhere, will appear below primary search results
    for (let n = 0; n < inputList.length; n++) { 
        const cleaned_item = inputList[n].map(item => item.toLowerCase().replace(/\s+/g, '').replace(/[^\w\s]/g, '')) // for search ease, remove spaces, special chars & case sensitivity
        if (cleaned_item.some(item => item.includes(cleaned_searchQuery))) {
            if (!outputListIndexes.includes(n)) // only if not already filtered by primary search
                outputList.push([...inputList[n], ...excludedList[n]])
            if (cap != null && outputList.length >= cap) 
                return outputList;
        }
    }
    return outputList;
}
// INPUT1 cap - (int number) hard caps the total entries, default = 50 (EXTREMELY RECOMMENDED TO REDUCE LAG)
// OUTPUT outputList - (list of dicts) gives the top x closest bus stop codes to user location, and its distance in km
export async function nearestBusStops(cap = 50) {
    let outputList = Array(cap).fill({"BusStopCode": "", "Distance": Infinity}) // creates a list of cap size
    
    const [hereLat, hereLon] = await doxx(); // [position.coords.latitude, position.coords.longitude]
    
    // If coordinates are null, log an error and return early
    if (hereLat === null || hereLon === null) {
        console.error("Unable to retrieve Geolocation data.");
        return null;
    }

    const BSC_CoordsList = await getjson('./datasets/bsc_coords.txt')
    for (let dict of BSC_CoordsList) {
        const distance = haversine(hereLat, hereLon, dict.Lat, dict.Lon)
        for (let i = 0; i < outputList.length; i++) {
            if (distance < outputList[i].Distance) {
                outputList = insertAndShift(outputList, i, {"BusStopCode": dict.BusStopCode, "Distance": distance})
                break
            }
        }
    }
    return outputList
}