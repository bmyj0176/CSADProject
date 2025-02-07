import { getjson } from "./helper_functions";
import {getBusMap} from "./travel_algorithms_bus.js";
import { getTrainMap } from "./travel_algorithms.js";

export async function getAllMaps() {
    let mrtToBus = await getjson('./datasets/mrt_to_bus2.json');
    let busMap = await getBusMap(); // busMap[0] (obj) is adj map, busMap[1] (obj) is codeToName
    let trainMap = await getTrainMap(); // trainMap[0] (obj) is adj map, trainMap[1][0] (list) is all the interchanges, trainMap[1][1] (obj) is "Expo": ["Expo_CG", "Expo_DT"]
    mergeMaps(busMap[0], trainMap[0], mrtToBus);
    return [busMap, trainMap];
}

console.clear();
let [busMap, trainMap] = await getAllMaps();
console.log(busMap[0]["01012"]);
console.log(trainMap[0]["Choa Chu Kang_NS"]);

function mergeMaps(busMap, trainMap, mrtToBus) {
    console.log(mrtToBus);
    const merged = {...busMap, ...trainMap};
    console.log(merged);
}


export async function dijkstra() {
    
}