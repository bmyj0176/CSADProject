import { getjson } from "./helper_functions"
import { getRoadDistance, getBusStopInfo} from "./helper_functions"

// console.log('YOOOOOOOOOOO');

//CLEAR VARIABLE -- TURN OFF WHEN DONE
let clear = false;


if (clear === true) {
    console.clear();
}


export async function getMap() {
    let mrt_to_bus = await getjson('./datasets/mrt_to_bus.json');
    let bus_dist = await getjson('./datasets/busstops_map.json');
    let map = buildAdjacencyList(bus_dist, mrt_to_bus);
    return map
} 

// let mrt_to_bus = await getjson('./public/datasets/mrt_to_bus.json');
// let bus_dist = await getjson('./datasets/busstops_map.json');
// let map = buildAdjacencyList(bus_dist, mrt_to_bus);
// console.log(map);


function buildAdjacencyList(time_between_busstops, connections) {

    const adjMap = {};

    for (let i in time_between_busstops){ //adding time between stations
        let x = time_between_busstops[i]["stations"]
        for (const { s1, s2, time } of x) {
            // Add connection from s1 to s2
            if (!adjMap[s1]) adjMap[s1] = {};
            adjMap[s1][s2] = time;
    
            // Add connection from s2 to s1 (assuming undirected graph)
            if (!adjMap[s2]) adjMap[s2] = {};
            adjMap[s2][s1] = time;
        }
    }
    
    for (const { p1, p2, time } of connections) { //adding cross platform transfers
        // Add connection from s1 to s2
        if (!adjMap[p1]) adjMap[p1] = {};
        adjMap[p1][p2] = time;

        // Add connection from s2 to s1 (assuming undirected graph)
        if (!adjMap[p2]) adjMap[p2] = {};
        adjMap[p2][p1] = time;
    }

    return adjMap;
}
/*
export function dijkstra(graph, start, end) {
    // Create an object to store the shortest distance from the start node to every other node
    let distances = {};
    let predecessors = {}; // Map to store the predecessor of each node for route reconstruction
    let visited = new Set();

    // Get all the nodes of the graph
    let nodes = Object.keys(graph);

    // Initially, set the shortest distance to every node as Infinity except starting node
    for (let node of nodes) {
        distances[node] = Infinity;
        predecessors[node] = null; // No predecessor initially
    }
    distances[start] = 0;

    // Loop until all nodes are visited
    while (nodes.length) {
        // Sort nodes by distance and pick the closest unvisited node
        nodes.sort((a, b) => distances[a] - distances[b]);
        let currentNode = nodes.shift();

        // If the shortest distance to the closest node is still Infinity, then remaining nodes are unreachable and we can break
        if (distances[currentNode] === Infinity) break;

        // Mark the chosen node as visited
        visited.add(currentNode);

        // For each neighboring node of the current node
        for (let neighbour in graph[currentNode]) {
            if (!visited.has(neighbour)) {
                // Calculate tentative distance to the neighbouring node
                let newDistance = distances[currentNode] + graph[currentNode][neighbour];

                // If the newly calculated distance is shorter than the previously known distance to this neighbour
                if (newDistance < distances[neighbour]) {
                    distances[neighbour] = newDistance;
                    predecessors[neighbour] = currentNode; // Update predecessor
                }
            }
        }
    }

    // If the end node is unreachable
    if (distances[end] === Infinity) {
        return `No route from ${start} to ${end}.`;
    }

    // Reconstruct the shortest route from start to end using the predecessors map
    let route = [];
    let current = end;
    while (current) {
        route.unshift(current);
        current = predecessors[current];
    }

    //showing the route as only transfers
    let simple_route = [route[0]];
    let past_station = "";
    let past_interchange = "";

    for (let i in route) {
        let current_station = route[i];
        let thirdLastChar = current_station.charAt(current_station.length - 3);

        if (thirdLastChar === "_") { //if third last char is a "_", its an interchange
            let current_interchange = current_station.length > 3 ? current_station.slice(0, -3) : "";
            if (current_interchange === past_interchange) { //if 2 interchanges are the same, its a transfer
                simple_route.push(past_station, current_station); 
            } else {
                past_interchange = current_interchange;
            }
        }
        past_station = current_station;
    }

    simple_route.push(route[route.length - 1]) //add destination to simple route

    // Return both the shortest distance and the route
    return {
        time_taken: distances[end],
        route: route,
        simple_route: simple_route
    };
}

// running Dijkstra algorithm between the two stations
let startTime = performance.now();
console.log(dijkstra(map, "Marina South Pier", "Bangkit"));
let endTime = performance.now();
let timeTaken = endTime - startTime;
console.log("Total time taken : " + timeTaken + " milliseconds");

export async function shortest_path (station1, station2) {
    let path = []
    // COOK HERE
    path = test();
    return path
}

export async function time_between_stations (path) {
    let time = 0
    // COOK HERE
    return time
}
    */