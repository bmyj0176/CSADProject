import { getjson } from "./helper_functions"



export async function getTrainMap() {
    let train_transfer = await getjson('./datasets/platform.json');
    let train_paths = await getjson('./datasets/station.json');
    let interchanges = await getjson('./datasets/interchanges.json');
    let map = buildAdjacencyList(train_paths, train_transfer);
    return [map, interchanges]
}

function buildAdjacencyList(time_between_stations, connections) {

    const adjMap = {};

    for (let i in time_between_stations){ //adding time between stations
        let stationList = time_between_stations[i]["stations"];
        let trainLine = time_between_stations[i]["line"];
        makeTrainMap(stationList, trainLine, adjMap);
    }
    
    makeTrainMap(connections, "TTtransfer", adjMap); //adding cross platform transfers

    return adjMap;
}

function makeTrainMap(stationList, train, adjMap) {
    let method = [train];
    for (const { s1, s2, time } of stationList) {
        //creating stop if it currently doesnt exist
        if (!adjMap[s1]) adjMap[s1] = {};
        if (!adjMap[s2]) adjMap[s2] = {};
        
        // if linkage doesnt exist, create it and make train num list
        if (adjMap[s1][s2] === undefined) { // s1 to s2
            adjMap[s1][s2] = {time, method};
        }

        if (adjMap[s2][s1] === undefined) { // s2 to s1
            adjMap[s2][s1] = {time, method};
        }

    }

    return true;
}

export function dijkstra(graph, start, end, interchanges) {
    let final_time_taken = Infinity;
    let final_predecessors = {};
    let final_end = "";
    if (start in interchanges[1]) {
        start = interchanges[1][start];
    } else if (typeof(start) === "string") {
        start = [start];
    }
    if (end in interchanges[1]) {
        end = interchanges[1][end];
    } else if (typeof(end) === "string") {
        end = [end];
    }
    
    for (let realstart of start) {
        for (let realend of end) {
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
            distances[realstart] = 0;
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

            // add time taken for each interchange at start into a list
            if (distances[realend] < final_time_taken) {
                final_time_taken = distances[realend];
                final_predecessors = predecessors;
                final_end = realend;
            }
        }
    }
    let predecessors = final_predecessors;


    let time_taken = final_time_taken;
    // If the end node is unreachable
    if (time_taken === Infinity) {
        return `No route from ${start} to ${end}.`;
    }

    // Reconstruct the shortest route from start to end using the predecessors map
    let route = [];
    let current = final_end;
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
        if (interchanges[0].includes(current_station)) { //if inside interchange list, is interchange
            let current_interchange = current_station.length > 3 ? current_station.slice(0, 3) : "";
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
        time_taken: time_taken,
        route: route,
        simple_route: simple_route
    };
    }


// running Dijkstra algorithm between the two stations





// console.clear();
// let [map, interchanges] = await getTrainMap();

// let longest = Infinity;
// let longestroute = [];
// let longestsimple = [];
// let startTime = performance.now();
// for (let k=0; k<1; k++){
//     let i1 = Math.floor(Math.random() * Object.keys(map).length);
//     let i2 = Math.floor(Math.random() * Object.keys(map).length);
//     if (i1 === i2) {continue;}
//     let location1 = Object.keys(map)[i1];
//     let location2 = Object.keys(map)[i2];
//     console.log(Object.keys(map)[i1], "to", Object.keys(map)[i2]);
//     let {time_taken, route, simple_route} = dijkstra(map, location1, location2, interchanges);
//     if (time_taken < longest) {
//         longest = time_taken;
//         longestroute = route;
//         longestsimple = simple_route;
//     }
// } console.log(longest, longestroute, longestsimple);
// console.log(dijkstra(map, "Novena", "Dover", interchanges));
// let endTime = performance.now();
// let timeTaken = endTime - startTime;
// console.log("Total time taken : " + timeTaken + " milliseconds");