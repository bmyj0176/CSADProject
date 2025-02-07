import { getjson } from "./helper_functions"
// import { getRoadDistance, getBusStopInfo} from "./helper_functions"


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

    for (let bus_num in time_between_busstops) { //adding time between stations
    // let bus_num = 2;
        if (bus_num.toLowerCase().includes("e")) {continue;} // to remove all express services, no one uses this shit
        let directions = time_between_busstops[bus_num];
        let prev_stop = directions["1"][0][0];
        let prev_dist = 0;
        makebusmap("1", directions, prev_stop, prev_dist, bus_num, adjMap);
        if (directions["2"]) {
            prev_stop = directions["1"][directions["1"].length-1][0];
            prev_dist = 0;
            makebusmap("2",directions, prev_stop, prev_dist, bus_num, adjMap)
        }
    }

    // adding nearby bus stops through walking
    let stops = Object.keys(opp_bus_stops);
    for (let stop_no of stops) {
        let stop_data = opp_bus_stops[stop_no]

        //creating stop if it currently doesnt exist
        if (!adjMap[stop_no]) adjMap[stop_no] = {};
        for (let adj_stop of stop_data) { // adding the thing for real
            let adj_stop_no = adj_stop[0];
            if (!adjMap[adj_stop_no]) adjMap[adj_stop_no] = {};
            let dist = adj_stop[1];
            dist = dist.toFixed(3);
            adjMap[stop_no][adj_stop_no] = {dist, bus_num:["B2BTransfer"]};
            adjMap[adj_stop_no][stop_no] = {dist, bus_num:["B2BTransfer"]};
        }

    }
    return adjMap;     
}

function makebusmap(direction, directions, prev_stop, prev_dist, bus_num, adjMap) {
    for (const busstop of directions[direction]) {
        let stop = busstop[0];
        let dist = busstop[1]-prev_dist;
        dist = dist.toFixed(1);
        if (dist === "0.0") {continue;}

         //creating stop if it currently doesnt exist
        if (!adjMap[stop]) adjMap[stop] = {};
        if (!adjMap[prev_stop]) adjMap[prev_stop] = {};

         // if linkage doesnt exist, create it and make bus num list
        if (adjMap[stop][prev_stop] === undefined) { // s1 to s2
            adjMap[stop][prev_stop] = {dist, bus_num:[bus_num]};
        } else { // if linkage exists already, add bus num to list.
            adjMap[stop][prev_stop]["bus_num"].push(bus_num);
        }

        if (adjMap[prev_stop][stop] === undefined) { // s2 to s1
            adjMap[prev_stop][stop] = {dist, bus_num:[bus_num]};
        } else {
            adjMap[prev_stop][stop]["bus_num"].push(bus_num);
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

export function dijkstra(graph, start, end, codeToName) {
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



// running Dijkstra algorithm between the two stations


export async function runshit() {
    console.clear();
    let startTime = performance.now();
    let [map, codeToName] = await getBusMap();
    console.log(map);
    //console.log(dijkstra(map, "44399", "08057")); // opp blk 210 to douby ghaut
    //console.log(dijkstra(map, "44399", "19039")); // opp blk 210 to dover mrt
    console.log(dijkstra(map, "27099", "44229", codeToName)); // clementi int to changi airport
    //console.log(dijkstra(map, "44021", "46009")); // bukit panjang to woodlands int
    let endTime = performance.now();
    let timeTaken = endTime - startTime;
    console.log("Total time taken : " + timeTaken + " milliseconds");
}

//runshit();