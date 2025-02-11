import { getjson } from "./helper_functions";
import {getBusMap} from "./travel_algorithms_bus.js";
import { getTrainMap } from "./travel_algorithms.js";

export async function getAllMaps() {
    let mrtToBus = await getjson('./datasets/mrt_to_bus2.json');
    let busMap = await getBusMap(); 
    let trainMap = await getTrainMap(); 
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
            if (!merged[busNum]) merged[busNum] = {};
            if (!merged[trainStation]) merged[trainStation] = {};
            if (!merged[busNum][trainStation]) {
                merged[busNum][trainStation] = {time, method: ["BTtransfer"]};
            } 
            if (!merged[trainStation][busNum]) {
                merged[trainStation][busNum] = {time, method: ["TBtransfer"]};
            }
        }
    }

    return merged;
}


export async function dijkstra(graph, start, end, codeToName, interchanges, options) {
    let final_time_taken = Infinity;
    let final_predecessors = {};
    let final_end = "";
    let final_start = "";
    let final_distances = {};
    let endarr = [];
    let startarr = [];

    if (start in interchanges) {
        startarr = interchanges[start];
    } else if (typeof(start) === "string") {
        startarr = [start];
    }
    if (end in interchanges) {
        endarr = interchanges[end];
    } else if (typeof(end) === "string") {
        endarr = [end];
    }

    for (let realstart of startarr) {
        for (let realend of endarr) {
            
            let distances = {};
            let predecessors = {}; 
            let visited = new Set();

            
            let nodes = Object.keys(graph);
            
            for (let node of nodes) {
                if (node === realstart) continue;
                distances[node] = Infinity;
                predecessors[node] = null; 
            }
            distances[realstart] = 0;

            
            while (nodes.length) {
                
                nodes.sort((a, b) => distances[a] - distances[b]);
                let currentNode = nodes.shift();

                
                if (distances[currentNode] === Infinity) break; 

                
                visited.add(currentNode);
                let filteredBus = [];

                
                for (let neighbour in graph[currentNode]) {
                    if (!visited.has(neighbour)) {
                        if (neighbour === currentNode) continue;
                        
                        let neighbouringDistance = Number(graph[currentNode][neighbour]["time"]);
                        let totalDistance = distances[currentNode] + neighbouringDistance;
                        let method = graph[currentNode][neighbour]["method"];
                        
                        
                        if (method.some(item => /\d/.test(item))) { 
                            if (predecessors[currentNode]) { 
                                let prevBusUsed = predecessors[currentNode][1];
                                filteredBus = prevBusUsed.filter(item => method.includes(item));
                                if (filteredBus.length === 0) {
                                    if (!prevBusUsed.includes("TBtransfer") && !prevBusUsed.includes("BBtransfer")) {
                                        totalDistance += 10; 
                                        neighbouringDistance += 10;
                                    }
                                    filteredBus = method;
                                }
                            } else { 
                                filteredBus = method;
                            }
                        }
                        
                        
                        else if (method.length === 1 && !method[0].includes("transfer") && !/\d/.test(method[0])) {
                            filteredBus = method;
                        }
                        
                        else if (method[0].includes("BBtransfer") || method[0].includes("TBtransfer") || method[0].includes("BTtransfer") ) {
                            if (currentNode !== realend){
                                totalDistance += 10;
                                neighbouringDistance += 10;
                                filteredBus = method;
                            }
                        } else if (method[0].includes("TTtransfer")) {
                            filteredBus = method;
                        } else {console.error("unidentified method detected.", method);}

                        
                        if (totalDistance < distances[neighbour]) {
                            distances[neighbour] = totalDistance;
                            predecessors[neighbour] = [currentNode, filteredBus, neighbouringDistance]; 
                        }
                    }
                }
            }


            
            if (distances[realend] < final_time_taken) {
                final_distances = distances;
                final_predecessors = predecessors;
                final_end = realend;
                final_start = realstart;
                final_time_taken = distances[realend];
            }
        }
    }
    if (final_distances[end] === Infinity) {
        return `No route from ${start} to ${end}.`;
    } 

    let predecessors = final_predecessors;
    let distances = final_distances;

    
    
    
    
    
    let route = new Map();
    let current = final_end;
    while (current) {
        if (predecessors[current] == null) {route.set(current, []); break;}
        route.set(current, [predecessors[current][1], distances[current], predecessors[current][2]]);
        current = predecessors[current][0];
    }
    let flippedRoute = new Map([...route].reverse());

    let transferCount = Math.round(distances[end] / 10000); 
    let subTime = Number((distances[end] % 10000).toFixed(2));
    
    let finalTimeTaken = subTime + 6 * transferCount;
    

    console.log(route);
    

    let simple_route = new Map();
    let busUsed = route.get(final_end)[0];
    let noOfStops = 1;
    let prev_stop = final_end;
    let prev_value = [busUsed, 0];
    let prev_dist = distances[end];
    simple_route.set(final_end, prev_value);
    for (let [key, value] of route) {
        if (key !== final_start) {
            if (busNotInList(value[0], busUsed)) {
                simple_route.set(key, [value[0]]);
                prev_value = simple_route.get(prev_stop);
                if (prev_stop === final_end) {
                    prev_dist = route.get(final_end)[1];
                } else {prev_dist = route.get(prev_stop)[1];}
                prev_value[1] = prev_dist - distances[key];
                prev_value[2] = noOfStops;
                simple_route.set(prev_stop, prev_value);

                prev_stop = key; 
                busUsed = value[0];
                noOfStops = 1;
            } else {noOfStops += 1;}
        } else if (key === final_start) {
            prev_value = simple_route.get(prev_stop);
            if (prev_stop === end) {
                prev_dist = route.get(final_end)[1];
            } else {prev_dist = route.get(prev_stop)[1];}
            prev_value[1] = prev_dist - distances[key];
            prev_value[2] = noOfStops;
            simple_route.set(prev_stop, prev_value);
        }
    } simple_route.set(final_start, []);

    let flippedSimpleRoute = new Map([...simple_route].reverse());
    
    return {
        time_taken: distances[final_end],
        route: flippedRoute,
        simple_route: flippedSimpleRoute,
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
    console.log("bus", map["44399"]);
    console.log("train", map["Choa Chu Kang_NS"]);

    console.log(dijkstra(map, "Dover", "27449", codeToName, interchanges, true)); 
    let endTime = performance.now();
    let timeTaken = endTime - startTime;
    console.log("Total time taken : " + timeTaken + " milliseconds");
}
