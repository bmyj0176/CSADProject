import { convertISO8601, timeDiffISO8601, doxx, haversine, insertAndShift } from "./helper_functions2";
import { BusArrival, BusRoutes, BusStops } from "./api_caller";
import { get_list } from "./file_reader"

// getBusTiming() returns the arrival times of the next 3 buses
// INPUT1 BusStopCode - (string) 5 digit code of bus stop, e.g. '46971', '83139'
// INPUT2 BusNumber - (string) bus number, e.g. 185, 901M
// OUTPUT times[] - (list of ints) minutes until the next 3 buses arrive, e.g. [3, 12, 19]
export async function getBusTiming(BusStopCode, BusNumber) {
    // Fetch bus arrival data
    const response = await BusArrival(BusStopCode);
    const services = response.Services;
    const service = services.find(service => service["ServiceNo"] === BusNumber);

    const times = []
    const currentDate = new Date().toISOString(); 
    const nextBusDates = [service.NextBus.EstimatedArrival, service.NextBus2.EstimatedArrival, service.NextBus3.EstimatedArrival];
    for (let nextBusDate of nextBusDates) {
        if (nextBusDate == "")
            times.push(null)
        else {
            let time = timeDiffISO8601(convertISO8601(nextBusDate), currentDate)/60
            if (time < 0) { time = 0 }
            time = Math.floor(time)
            times.push(time)
        }
    }
    return times
    
}

// INPUT1 key - (string) can be "BusStopCode", "RoadName" or "Description", e.g. "Description"
// INPUT2 value - (string) has to be the corresponding value you are searching for, e.g. "Dover Stn Exit B"
// OUTPUT BusStopInfo - (list of dicts) dicts consist of "BusStopCode", "RoadName", "Description", "Latitude" and "Longitude"
export async function getBusStopInfo(key, value) {
    const output = []
    const valid_keys = ["BusStopCode", "RoadName", "Description"];
    if (!valid_keys.includes(key)) { // doesnt include the right key
        console.error("Invalid Key Given!")
        return null
    }
    const maxSkip = 5000
    for (let skip = 0; skip <= maxSkip; skip += 500) {
        const data = await BusStops(skip)
        const list = data["value"]
        for (let dict of list) {
            if (dict[key] === value) {
                output.push(dict)
            } 
        }
    }
    if (output.length !== 0)
        return output
    console.error("Key-value couldn't be found!")
    return null
}

// INPUT1 BusService - (string) bus service connecting two stops
// INPUT2 BSCode1 - (string) first bus stop code
// INPUT3 BSCode2 - (string) second bus stop code
// OUTPUT distance - (Number) distance in km between two bus stops
export async function getRoadDistance(BusService, BSCode1, BSCode2) {
    let stop1 = null;
    let stop2 = null;
    const data = await BusRoutes(BusService)
    const list = data["value"]
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
// INPUT3 cap - (int number) hard caps the total entries, default = 500 (RECOMMENDED TO REDUCE LAG)
// OUTPUT outputList - (list of strings) list of entries that is a product of substring
export function searchInList(searchQuery, inputList, cap = 500) {
    const outputList = []
    for (let item of inputList) {
        if (item.startsWith(searchQuery)) {
            outputList.push(item)
            if (cap != null && outputList.length >= cap) { break; }
        }
    }
    return outputList;
}

// INPUT1 cap - (int number) hard caps the total entries, default = 500 (EXTREMELY RECOMMENDED TO REDUCE LAG)
// OUTPUT outputList - (list of dicts) gives the top x closest bus stop codes to user location, and its distance in km
export async function nearestBusStops(cap = 500) {
    let outputList = Array(cap).fill({"BusStopCode": "", "Distance": Infinity}) // creates a list of cap size
    
    const [hereLat, hereLon] = await doxx(); // [position.coords.latitude, position.coords.longitude]
    
    // If coordinates are null, log an error and return early
    if (hereLat === null || hereLon === null) {
        console.error("Unable to retrieve Geolocation data.");
        return null;
    }

    const BSC_CoordsList = await get_list('./datasets/bsc_coords.txt')
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