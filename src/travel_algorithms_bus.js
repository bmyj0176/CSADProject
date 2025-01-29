import { getjson } from "./helper_functions"
// import { getRoadDistance, getBusStopInfo} from "./helper_functions"


export async function getMap() {
    let mrt_to_bus = await getjson('./datasets/mrt_to_bus.json');
    let bus_dist = await getjson('./datasets/busstops_map.json');
    let interchanges = await getjson('./datasets/interchanges.json');
    let map = buildAdjacencyList(bus_dist, mrt_to_bus);
    return [map, interchanges]
}


function buildAdjacencyList(time_between_busstops, connections) {

    const adjMap = {};

    for (let bus_num in time_between_busstops) { //adding time between stations
        //let bus_num = "2";
        let directions = time_between_busstops[bus_num];
        let prev_stop = directions["1"][0][0];
        let prev_dist = 0;
        for (const busstop of directions["1"]) {
            let stop = busstop[0];
            let dist = busstop[1]-prev_dist;
            dist = dist.toFixed(1);
            if (dist === "0.0") {continue;}
            let dist_and_bus_num = {dist, bus_num};
            // Add connection from s1 to s2
            if (!adjMap[stop]) adjMap[stop] = {};
            adjMap[stop][prev_stop] = dist_and_bus_num;
            // Add connection from s2 to s1
            if (!adjMap[prev_stop]) adjMap[prev_stop] = {};
            adjMap[prev_stop][stop] = dist_and_bus_num;
            prev_stop = stop;
            prev_dist = busstop[1];
        }
        
        prev_stop = directions["1"][directions["1"].length-1][0];
        prev_dist = 0;
        if (directions["2"]) {
            for (const busstop of directions["2"]) {
                let stop = busstop[0];
                let dist = busstop[1]-prev_dist;
                dist = dist.toFixed(1);
                if (dist === "0.0") {continue;}
                let dist_and_bus_num = {dist, bus_num};
                // Add connection from s1 to s2
                if (!adjMap[stop]) adjMap[stop] = {};
                adjMap[stop][prev_stop] = dist_and_bus_num;
                // Add connection from s2 to s1
                if (!adjMap[prev_stop]) adjMap[prev_stop] = {};
                adjMap[prev_stop][stop] = dist_and_bus_num;
                prev_stop = stop;
                prev_dist = busstop[1];
            }
        }
    }
    
    // for (const { p1, p2, time } of connections) { //adding cross platform transfers
    //     // Add connection from s1 to s2
    //     if (!adjMap[p1]) adjMap[p1] = {};
    //     adjMap[p1][p2] = time;
    // }

    return adjMap;     
}

export function dijkstra(graph, start, end) {
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
        // For each neighboring node of the current node
        for (let neighbour in graph[currentNode]) {
            if (!visited.has(neighbour)) {
                if (neighbour === currentNode) continue;
                // Calculate tentative distance to the neighbouring node
                let neighbouringDistance = Number(graph[currentNode][neighbour]["dist"]);
                let busUsed = graph[currentNode][neighbour]["bus_num"];
                let newDistance = distances[currentNode][0] + neighbouringDistance;
                if (predecessors[currentNode] !== undefined) {
                    if (busUsed !== predecessors[currentNode][1]) {
                        newDistance += 50;
                     } // 30/1/25 make dijkstra take multiple nodes if distance is the same
                }
                




                newDistance = Number(newDistance.toFixed(1));

                // If the newly calculated distance is shorter than the previously known distance to this neighbour
                if (newDistance < distances[neighbour][0]) {
                    
                    distances[neighbour][0] = newDistance;
                    predecessors[neighbour] = [currentNode, graph[currentNode][neighbour]["bus_num"]]; // Update predecessor
                }
            }
        }
    }

    // If the end node is unreachable
    if (distances[end][0] === Infinity) {
        return `No route from ${start} to ${end}.`;
    }
    console.log(predecessors);
    console.log(distances);

    // Reconstruct the shortest route from start to end using the predecessors map
    let route = {};
    let current = end;
    while (current) {
        if (predecessors[current] == null) {break;}
        route[current] = predecessors[current][1];
        current = predecessors[current][0];
    }
    console.log(route);

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


export async function runshit() {
    console.clear();
    let [map, interchanges] = await getMap();
    let startTime = performance.now();
    console.log(dijkstra(map, "44251", "08057"));
    let endTime = performance.now();
    let timeTaken = endTime - startTime;
    console.log("Total time taken : " + timeTaken + " milliseconds");
}

//runshit();