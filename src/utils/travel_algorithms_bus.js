import { getjson } from "./helper_functions"



export async function getBusMap() {
    let bus_dist = await getjson('./datasets/busstops_map.json');
    let bus_stop_info = await getjson('./datasets/bus_stops_complete.json');
    let opp_bus_stops = await getjson('./datasets/opposite_bus_stops.json');
    let map = await buildAdjacencyList(bus_dist, opp_bus_stops);
    let code_to_name = await buildCodeToName(bus_stop_info);
    return [map, code_to_name]
}


async function buildAdjacencyList(time_between_busstops, opp_bus_stops) {

    const adjMap = {};

    for (let bus_num in time_between_busstops) { 
    
        if (bus_num.toLowerCase().includes("e")) {continue;} 
        let directions = time_between_busstops[bus_num];
        let prev_stop = directions["1"][0][0];
        makebusmap("1", directions, prev_stop, bus_num, adjMap);
        if (directions["2"]) {
            prev_stop = directions["1"][directions["1"].length-1][0];
            makebusmap("2",directions, prev_stop, bus_num, adjMap)
        }
    }

    
    let stops = Object.keys(opp_bus_stops);
    for (let stop_no of stops) {
        let stop_data = opp_bus_stops[stop_no]

        
        if (!adjMap[stop_no]) adjMap[stop_no] = {};
        for (let adj_stop of stop_data) { 
            let adj_stop_no = adj_stop[0];
            if (!adjMap[adj_stop_no]) adjMap[adj_stop_no] = {};
            if (!adjMap[stop_no]) adjMap[stop_no] = {};
            let dist = adj_stop[1];
            let time = 60 * dist / 4.5;
            if (!adjMap[stop_no][adj_stop_no]) {
                adjMap[stop_no][adj_stop_no] = {time, method:["BBtransfer"]};
            }
            if (!adjMap[adj_stop_no][stop_no]) {
            adjMap[adj_stop_no][stop_no] = {time, method:["BBtransfer"]};
            }
        }

    }
    return adjMap;     
}

function makebusmap(direction, directions, prev_stop, bus_num, adjMap) {
    let prev_dist = 0;
    for (const busstop of directions[direction]) {
        let stop = busstop[0];
        let dist = busstop[1]-prev_dist;
        if (dist === "0.0") {continue;}


    
    
    
    
    
        let time = dist/calculateSpeed(dist) * 60 + 0.7;


         
        if (!adjMap[prev_stop]) adjMap[prev_stop] = {};

         
        if (!adjMap[prev_stop][stop]) { 
            adjMap[prev_stop][stop] = {time, method:[bus_num]};
        } else { 
            adjMap[prev_stop][stop]["method"].push(bus_num);
        }
        
        prev_stop = stop;
        prev_dist = busstop[1];
    }

    return true;
}

async function buildCodeToName(bus_stop_info) {
    let codeToName = {}
    for (let busstop of bus_stop_info) {
        let code = busstop["BusStopCode"];
        let name = busstop["Description"];
        codeToName[code] = name;
    }
    return codeToName;
}

function calculateSpeed(distance) {
    let spd = 15 + 40 * (1 - Math.exp(-0.52 * distance));
    return spd;
}

export function dijkstra(graph, start, end, codeToName) {
    
    let distances = {};
    let predecessors = {}; 
    let visited = new Set();

    
    let nodes = Object.keys(graph);
    
    for (let node of nodes) {
        if (node === start) continue;
        distances[node] = [Infinity];
        predecessors[node] = null; 
    }
    distances[start] = [0];

    
    while (nodes.length) {
        
        nodes.sort((a, b) => distances[a][0] - distances[b][0]);
        let currentNode = nodes.shift();

        
        if (distances[currentNode] === Infinity) break;

        
        visited.add(currentNode);
        let filteredBus = [];
        
        for (let neighbour in graph[currentNode]) {
            if (!visited.has(neighbour)) {
                if (neighbour === currentNode) continue;
                
                let neighbouringDistance = Number(graph[currentNode][neighbour]["dist"]);
                let busUsed = graph[currentNode][neighbour]["bus_num"];

                
                let time = 0;
                if (neighbouringDistance <= 1)
                     {time = 60 * neighbouringDistance / 25;} 
                else {time = 60 * neighbouringDistance / 60;}
                let newDistance = distances[currentNode][0] + time + 0.4;
                if (predecessors[currentNode]) { 
                    let prevBusUsed = predecessors[currentNode][1];
                    
                    filteredBus = prevBusUsed.filter(item => busUsed.includes(item));
                    if (filteredBus.length === 0) {
                        newDistance += 10; 
                        filteredBus = busUsed;
                     }
                } else { 
                    filteredBus = busUsed;
                }

                
                newDistance = Number(newDistance.toFixed(2));
                if (newDistance < distances[neighbour][0]) {
                    
                    distances[neighbour][0] = newDistance;
                    predecessors[neighbour] = [currentNode, filteredBus]; 
                }
            }
        }
    }

    
    if (distances[end][0] === Infinity) {
        return `No route from ${start} to ${end}.`;
    } 
    console.log("predecessors", predecessors);
    console.log("distances", distances);
    
    
    let route = new Map();
    let current = end;
    while (current) {
        if (predecessors[current] == null) {route.set(current, []); break;}
        route.set(current, predecessors[current][1]);
        current = predecessors[current][0];
    }

    let transferCount = Math.round(distances[end] / 10000); 
    let subTime = Number((distances[end] % 10000).toFixed(2));
    console.log(transferCount, subTime);
    let finalTimeTaken = subTime + 6 * transferCount;
    

    

    let simple_route = new Map();
    let busUsed = [];
    let noOfStops = 1;
    let prev_stop = end;
    let prev_value = [];
    for (let [key, value] of route) {
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
            if (value[0][0] === "walk") { 
                let dist = Number(value[1]) * 1000;
                console.log("walk for", dist + "m to", stopName + ", stop ID", key);
            } else{
            console.log("take bus number", value[0].join(" or "), "to", stopName + ", stop ID", key + ", for", value[1], "stops");
            }
        } else {console.log("start at", stopName)}
    }



    
    return {
        time_taken: Math.round(distances[end][0]),
        route: route,
        simple_route: simple_route
    };
}

function busNotInList(value, busUsed) {
    return (value.every(item => !busUsed.includes(item)))
}






export async function run() {
    console.clear();
    let startTime = performance.now();
    let [map, codeToName] = await getBusMap();
    console.log(map);
    
    
    console.log(dijkstra(map, "27099", "44229", codeToName)); 
    
    let endTime = performance.now();
    let timeTaken = endTime - startTime;
    console.log("Total time taken : " + timeTaken + " milliseconds");
}

