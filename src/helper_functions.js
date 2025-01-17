import { doxx, haversine, insertAndShift } from "./helper_functions2";
import { BusArrival } from "./api_caller";

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
// buses arriving in <1 min will be "Now" and if there's no bus it'll be "-"
// if there's no bus services, output will just be null
export async function getBusTiming(BusStopCode, BusNumber) {
    // Fetch bus arrival data
    const response = await BusArrival(BusStopCode);
    if (!response.Services)
        return null
    const services = response.Services;
    if (services.length === 0)
        return null
    const service = services.find(service => service["ServiceNo"] === BusNumber); // return all bus service matching it
    if (!service || !service.NextBus || service.NextBus?.EstimatedArrival) {
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
        let diffMinutes = Math.floor((arrivalTime - currentDate) / 60000); // Milliseconds to minutes
        if (diffMinutes < 0) {
            diffMinutes = 0;
        }
        return diffMinutes === 0 ? "Now" : diffMinutes;
    });
}

// INPUT1 busStopCode - (string) bus stop code of bus stop you want to query, e.g. "46971"
// INPUT2 key - (string) key of value you want to output, like "BusStopCode", "RoadName", "Description", "Latitude" or "Longitude"
// OUTPUT BusStopInfo - (dict) consists of "BusStopCode", "RoadName", "Description", "Latitude" & "Longitude"
export async function getBusStopInfo(BusStopCode, key) {
    const complete_list = await getjson('./datasets/bus_stops_complete.txt');
    for (const dict of complete_list) {
        if (dict.BusStopCode === BusStopCode)
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

// INPUT1 BusService - (string) bus service connecting two stops
// INPUT2 BSCode1 - (string) first bus stop code
// INPUT3 BSCode2 - (string) second bus stop code
// OUTPUT distance - (Number) distance in km between two bus stops
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