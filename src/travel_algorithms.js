import { get_json } from "./file_reader"
import { getRoadDistance } from "./helper_functions"

async function test() {
    await get_json('./datasets/platform.json') 
    // gets platform-to-platform travel time in mins

    await get_json('./datasets/station.json') 
    // gets mrt station-to-station travel time in mins

    await getRoadDistance(BusService, BSCode1, BSCode2) 
    // gets distance in km between two bus stops
    // BusService is bus number like 185,,, BSCode1 and BSCode2 are the bus stop codes like 26969

    await getBusStopInfo(key, value)
    // INPUT1 key - (string) can be "BusStopCode", "RoadName" or "Description", e.g. "Description"
    // INPUT2 value - (string) has to be the corresponding value you are searching for, e.g. "Dover Stn Exit B"
    // OUTPUT BusStopInfo - (list of dicts) dicts consist of "BusStopCode", "RoadName", "Description", "Latitude" and "Longitude"
    // 
    // EXAMPLE USAGE:
    //      await getBusStopInfo("BusStopCode", "19039")
    // RESULTS IN:
    //      [{
	//	        BusStopCode: "19039",
	//	        Description: "Dover Stn Exit B",
	//	        Latitude: 1.31167951129602,
	//	        Longitude: 103.77868390552867,
	//	        RoadName: "C'wealth Ave West"
	//      }]
}

export async function shortest_path (station1, station2) {
    let path = []
    // COOK HERE
    return path
}

export async function time_between_stations (path) {
    let time = 0
    // COOK HERE
    return time
}

