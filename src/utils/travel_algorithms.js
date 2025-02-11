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

    for (let i in time_between_stations){ 
        let stationList = time_between_stations[i]["stations"];
        let trainLine = time_between_stations[i]["line"];
        makeTrainMap(stationList, trainLine, adjMap);
    }
    
    makeTrainMap(connections, "TTtransfer", adjMap); 

    return adjMap;
}

function makeTrainMap(stationList, train, adjMap) {
    let method = [train];
    for (const { s1, s2, time } of stationList) {
        
        if (!adjMap[s1]) adjMap[s1] = {};
        if (!adjMap[s2]) adjMap[s2] = {};
        
        
        if (adjMap[s1][s2] === undefined) { 
            adjMap[s1][s2] = {time, method};
        }

        if (adjMap[s2][s1] === undefined) { 
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
            
            let distances = {};
            let predecessors = {}; 
            let visited = new Set();

            
            let nodes = Object.keys(graph);

            
            for (let node of nodes) {
                distances[node] = Infinity;
                predecessors[node] = null; 
            }
            distances[realstart] = 0;
            
            while (nodes.length) {
                
                nodes.sort((a, b) => distances[a] - distances[b]);
                let currentNode = nodes.shift();

                
                if (distances[currentNode] === Infinity) break;

                
                visited.add(currentNode);
                
                
                for (let neighbour in graph[currentNode]) {
                    if (!visited.has(neighbour)) {
                        
                        let newDistance = distances[currentNode] + graph[currentNode][neighbour];
                        
                        
                        if (newDistance < distances[neighbour]) {
                            distances[neighbour] = newDistance;
                            predecessors[neighbour] = currentNode; 
                        }
                    }
                }
            }

            
            if (distances[realend] < final_time_taken) {
                final_time_taken = distances[realend];
                final_predecessors = predecessors;
                final_end = realend;
            }
        }
    }
    let predecessors = final_predecessors;


    let time_taken = final_time_taken;
    
    if (time_taken === Infinity) {
        return `No route from ${start} to ${end}.`;
    }

    
    let route = [];
    let current = final_end;
    while (current) {
        route.unshift(current);
        current = predecessors[current];
    }

    
    let simple_route = [route[0]];
    let past_station = "";
    let past_interchange = "";

    for (let i in route) {
        let current_station = route[i];
        if (interchanges[0].includes(current_station)) { 
            let current_interchange = current_station.length > 3 ? current_station.slice(0, 3) : "";
            if (current_interchange === past_interchange) { 
                simple_route.push(past_station, current_station); 
            } else {
                past_interchange = current_interchange;
            }
        }
        past_station = current_station;
    }

    simple_route.push(route[route.length - 1]) 

    
    return {
        time_taken: time_taken,
        route: route,
        simple_route: simple_route
    };
    }

    




























