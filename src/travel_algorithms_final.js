import { getjson } from "./helper_functions";
import {getBusMap} from "./travel_algorithms_bus.js";
import { getTrainMap } from "./travel_algorithms.js";

export async function getAllMaps() {
    let mrtToBus = await getjson('./datasets/mrt_to_bus2.json');
    let busMap = await getBusMap(); // busMap[0] (obj) is adj map, busMap[1] (obj) is codeToName
    let trainMap = await getTrainMap(); // trainMap[0] (obj) is adj map, trainMap[1][0] (list) is all the interchanges, trainMap[1][1] (obj) is "Expo": ["Expo_CG", "Expo_DT"]
    let map = await mergeMaps(busMap[0], trainMap[0], mrtToBus);
    return [map, busMap[1], trainMap[1]];
}

async function mergeMaps(busMap, trainMap, mrtToBus) {
    const merged = {...busMap, ...trainMap};
    for (let trainStation in mrtToBus) {
        let busStops = mrtToBus[trainStation];
        for (let busStop of busStops) {
            let busNum = busStop[0];
            let dist = busStop[1];
            let time = 60 * dist / 4.5;
            if (busNum in merged) {
                merged[busNum][trainStation] = {time, method: ["B2Ttransfer"]};
            } else {
                merged[busNum] = {[trainStation]: {time, method: ["B2Ttransfer"]}};
            }
            if (trainStation in merged) {
                merged[trainStation][busNum] = {time, method: ["T2Btransfer"]};
            } else {
                merged[trainStation] = {[busNum]: {time, method: ["T2Btransfer"]}};
            }
        }
    }

    return merged;
}


export function dijkstra(graph, start, end, codeToName, interchanges, options) {
    // Create an object to store the shortest distance from the start node to every other node
    let distances = {};
    let predecessors = {}; // Map to store the predecessor of each node for route reconstruction
    let visited = new Set();

    // Get all the nodes of the graph
    let nodes = Object.keys(graph);
    // Initially, set the shortest distance to every node as Infinity except starting node
    for (let node of nodes) {
        if (node === start) continue;
        distances[node] = [Infinity];
        predecessors[node] = null; // No predecessor initially
    }
    distances[start] = [0];

    // Loop until all nodes are visited
    while (nodes.length) {
        // Sort nodes by distance and pick the closest unvisited node
        nodes.sort((a, b) => distances[a][0] - distances[b][0]);
        let currentNode = nodes.shift();

        // If the shortest distance to the closest node is still Infinity, then remaining nodes are unreachable and we can break
        if (distances[currentNode] === Infinity) break;

        // Mark the chosen node as visited
        visited.add(currentNode);
        let filteredBus = [];
        // For each neighboring node of the current node
        for (let neighbour in graph[currentNode]) {
            if (!visited.has(neighbour)) {
                if (neighbour === currentNode) continue;
                // Calculate tentative distance to the neighbouring node
                let neighbouringDistance = Number(graph[currentNode][neighbour]["dist"]);
                let busUsed = graph[currentNode][neighbour]["bus_num"];
                //console.log("busUsed", busUsed); // aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

                //let time = neighbouringDistance / (0.283 * Math.pow(neighbouringDistance, 0.3))
                let time = 0;
                if (neighbouringDistance <= 1)
                     {time = 60 * neighbouringDistance / 25;} 
                else {time = 60 * neighbouringDistance / 60;}
                let newDistance = distances[currentNode][0] + time + 0.4;
                if (predecessors[currentNode]) { //if not starting node
                    let prevBusUsed = predecessors[currentNode][1];
                    
                    filteredBus = prevBusUsed.filter(item => busUsed.includes(item));
                    if (filteredBus.length === 0) {
                        newDistance += 10; // 5/2/25 HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
                        filteredBus = busUsed;
                     }
                } else { // if starting node
                    filteredBus = busUsed;
                }

                // If the newly calculated distance is shorter than the previously known distance to this neighbour
                newDistance = Number(newDistance.toFixed(2));
                if (newDistance < distances[neighbour][0]) {
                    
                    distances[neighbour][0] = newDistance;
                    predecessors[neighbour] = [currentNode, filteredBus]; // Update predecessor
                }
            }
        }
    }

    // If the end node is unreachable
    if (distances[end][0] === Infinity) {
        return `No route from ${start} to ${end}.`;
    } 
    console.log("predecessors", predecessors);
    console.log("distances", distances);
    
    // Reconstruct the shortest route from start to end using the predecessors map
    let route = new Map();
    let current = end;
    while (current) {
        if (predecessors[current] == null) {route.set(current, []); break;}
        route.set(current, predecessors[current][1]);
        current = predecessors[current][0];
    }

    let transferCount = Math.round(distances[end] / 10000); // 5/2/25 find 2 routes, 1 least transfers, 1 fastest
    let subTime = Number((distances[end] % 10000).toFixed(2));
    console.log(transferCount, subTime);
    let finalTimeTaken = subTime + 6 * transferCount;
    //console.log(JSON.stringify(route, null, 2));

    //showing the route as only transfers

    let simple_route = new Map();
    let busUsed = [];
    let noOfStops = 1;
    let prev_stop = end;
    let prev_value = [];
    for (let [key, value] of route) {// add end to simple_route
        if (busNotInList(value, busUsed)) {
            simple_route.set(key, [value, 0]);
            if (key !== end) {
                prev_value = simple_route.get(prev_stop);
                if (prev_value[0][0] === "walk"){
                    prev_value[1] = graph[key][prev_stop]["dist"];
                } else {
                    prev_value[1] = noOfStops;
                }
                simple_route.set(prev_stop, prev_value)
            }
            busUsed = value;
            noOfStops = 1;
            prev_stop = key;
        } else {noOfStops += 1;}
    }
    console.log("end at", codeToName[end]); 
    for (let [key, value] of simple_route) {
        let stopName = codeToName[key];
        if (key !== start) {
            if (value[0][0] === "walk") { // to implement walking between stops or stations
                let dist = Number(value[1]) * 1000;
                console.log("walk for", dist + "m to", stopName + ", stop ID", key);
            } else{
            console.log("take bus number", value[0].join(" or "), "to", stopName + ", stop ID", key + ", for", value[1], "stops");
            }
        } else {console.log("start at", stopName)}
    }



    // Return both the shortest distance and the route
    return {
        time_taken: Math.round(distances[end][0]),
        route: route,
        simple_route: simple_route
    };
}

function busNotInList(value, busUsed) {
    return (value.every(item => !busUsed.includes(item)))
}

async function run() {
    console.clear();
    let startTime = performance.now();
    let [map, codeToName, interchanges] = await getAllMaps();
    console.log("map", map);
    console.log("bus", map[44399]);
    console.log("train", map["Choa Chu Kang_NS"]);

    console.log(dijkstra(map, "44399", "Choa Chu Kang_NS", codeToName, interchanges, {bus: true, train: true})); // opp blk 210 to douby ghaut
    let endTime = performance.now();
    let timeTaken = endTime - startTime;
    console.log("Total time taken : " + timeTaken + " milliseconds");
}

run();