import { convertISO8601, timeDiffISO8601 } from "./helper_func2";
import { BusArrival, BusStops } from "./api_caller";

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