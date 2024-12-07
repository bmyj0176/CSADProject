import { get_json } from './file_reader.js'

export async function shortest_path (station1, station2) {
    path = Array()
    // COOK HERE
    return path
}

export async function time_between_stations (path) {
    let time = 0
    // COOK HERE
    return time
}

// THE FOLLOWING IS JUST AN EXAMPLE ON HOW U CAN GET A DICT FROM THE JSON FILE
async function example() {
    result = await get_json('./jsondata/station.json')
    // result WILL JUST BE THE ENTIRE DICT
    const NSLStations = data.find(item => item.line === "North South Line")?.stations;
    // NSLStations will be the dict for NSL (i havent cfmed if this works, its from chatgpt)
}