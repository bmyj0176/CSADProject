import { get_json } from "./file_reader"
import { getRoadDistance, getBusStopInfo} from "./helper_functions"

async function test() {
    //let x = await get_json('./datasets/platform.json')
    // gets platform-to-platform travel time in mins

    //await get_json('./datasets/station.json')
    // gets mrt station-to-station travel time in mins

    //await getRoadDistance(BusService, BSCode1, BSCode2) 
    // gets distance in km between two bus stops
    // BusService is bus number like 185,,, BSCode1 and BSCode2 are the bus stop codes like 26969


    //await getBusStopInfo(key, value)
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

console.clear();
let train_transfer = await get_json('./datasets/platform.json');
let train_paths = await get_json('./datasets/station.json');
let trains2 = new Object();
let trains = train_paths[0]["stations"];
let map = buildAdjacencyList(trains);


function buildAdjacencyList(connections) {
    const adjMap = {};

    for (const { s1, s2, time } of connections) {
        // Add connection from s1 to s2
        if (!adjMap[s1]) adjMap[s1] = {};
        adjMap[s1][s2] = time;

        // Add connection from s2 to s1 (assuming undirected graph)
        if (!adjMap[s2]) adjMap[s2] = {};
        adjMap[s2][s1] = time;
    }

    return adjMap;
}

export function dijkstra(graph, start, end) {
    // Create an object to store the shortest distance from the start node to every other node
    let distances = {};

    // A set to keep track of all visited nodes
    let visited = new Set();

    // Get all the nodes of the graph
    let nodes = Object.keys(graph);

    // Initially, set the shortest distance to every node as Infinity except starting node
    for (let node of nodes) {
        distances[node] = Infinity;
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

        // For each neighbouring node of the current node
        for (let neighbour in graph[currentNode]) {
            // If the neighbour hasn't been visited yet
            if (!visited.has(neighbour)) {
                // Calculate tentative distance to the neighbouring node
                let newDistance = distances[currentNode] + graph[currentNode][neighbour];

                // If the newly calculated distance is shorter than the previously known distance to this neighbour
                if (newDistance < distances[neighbour]) {
                    // Update the shortest distance to this neighbour
                    distances[neighbour] = newDistance;
                }
            }
        }
    }

    // Return the shortest distance from the start node to all nodes
    let output = "Time from " + start + " to " + end + " is " + distances[end] + " min.";
    return output;
}

// Example: Find shortest distances from node A to all other nodes in the graph
console.log(dijkstra(map, "Woodlands_NS", "Choa Chu Kang_NS")); // Outputs: {8}

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