import axios from 'axios';
import { getjson, getBusStopInfo } from './helper_functions';
import { downloadJSON, haversine } from './helper_functions2';
import { BusArrival, BusRoutes, BusStops } from './api_caller';

export async function run_all_updates() {
  await busstops_map();
  await bus_stops_complete();
  await bus_services_at_stop();
  await opposite_bus_stops();
  await bus_services();
  await mrt_to_bus2();
  await busstops_near_mrt();
  await bus_stops_info();
}

export async function busstops_map() {
    const database = {};
    for (let num = 0; num < 52; num++) {
      console.log(`cycle ${num}/52`);
      const rawdata = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/bus-routes?skip=${num * 500}`);
      const value = rawdata.data.value;
      for (const dict of value) {
        // creating 
        if (!database[dict.ServiceNo]) {  
            database[dict.ServiceNo] = {};  
        }
        const innerMap = database[dict.ServiceNo];
        if (!innerMap[dict.Direction]) {  
            innerMap[dict.Direction] = []; 
        }
        const innestMap = innerMap[dict.Direction];
        innestMap.push([dict.BusStopCode, dict.Distance]);
        // storing start & end busstops
        if (dict.Direction === 1) {
          if (!innerMap["startend1"]) {
            innerMap["startend1"] = [dict.BusStopCode, dict.BusStopCode];
          }
          innerMap["startend1"][1] = dict.BusStopCode ;
        } else { // === 2
          if (!innerMap["startend2"]) {
            innerMap["startend2"] = [dict.BusStopCode, dict.BusStopCode];
          }
          innerMap["startend2"][1] = dict.BusStopCode;
        }
      }
    }
    console.log(database);
    downloadJSON(database, "busstops_map");
}

export async function bus_stops_complete() {
  const database = [];
  let skip = 0;
  while (true) {
    const rawdata = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/bus-stops?skip=${skip}`);
    const value = rawdata.data.value;
    if (value.length === 0)
      break;
    for (const dict of value) {
      console.log(dict.BusStopCode);
      database.push(dict);
    }
    skip += 500;
  }
  console.log(database);
  downloadJSON(database, "bus_stops_complete");
}

export async function bus_services_at_stop() {
  const database = {};
  const data = await getjson('./datasets/bus_stops_complete.json');
  for (const dict of data) {
    database[dict.BusStopCode] = []; // filling up first
  }
  const map = await getjson('./datasets/busstops_map.json');
  for (const busService in map) {
    console.log(busService);
    const inner_map = map[busService];
    for (const busStopData of inner_map["1"]) {
      database[busStopData[0]].push(busService);
      console.log(`${busService} to ${busStopData[0]}`)
    }
    if ("2" in inner_map) {
      for (const busStopData of inner_map["2"]) {
        database[busStopData[0]].push(busService);
        console.log(`${busService} to ${busStopData[0]}`)
      }
    }
    
  }
  for (const key in database) {
    database[key] = sortBusServices(database[key]);
  }

  console.log(database);
  downloadJSON(database, "bus_services_at_stop");
}

function sortBusServices(list) {
  return list.sort((a, b) => {
    // Extract numeric part for comparison
    const numA = parseInt(a, 10);
    const numB = parseInt(b, 10);

    // Handle cases where numeric part is equal (e.g., "243G" and "243W")
    if (numA === numB) {
      return a.localeCompare(b); // Compare full strings lexicographically
    }

    // Sort by numeric value
    return numA - numB;
  });
}

export async function opposite_bus_stops() {
  const database = {}
  const data = await getjson('./datasets/bus_stops_complete.json');
  for (const dict1 of data) {
    database[dict1.BusStopCode] = []
    for (const dict2 of data) {
      if (dict1 !== dict2) {
        const dist = haversine(dict1.Latitude, dict1.Longitude, dict2.Latitude, dict2.Longitude)
        if (dist < 0.2) {
          database[dict1.BusStopCode].push([dict2.BusStopCode, dist])
        }
      }
    }
  }
  console.log(database);
  downloadJSON(database, "opposite_bus_stops")
}

export async function bus_services() {
  const database = []
  let skip = 0;
  while (true) {
    const rawdata = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/bus-routes?skip=${skip}`);
    const value = rawdata.data.value
    console.log(value)
    if (value.length === 0)
      break;
    for (const dict of value) {
      if (!database.includes(dict.ServiceNo)) {
        database.push(dict.ServiceNo)
      }
    }
    skip += 500;
  }
  console.log(database);
  downloadJSON(database, "bus_services")
}

export async function mrt_to_bus2() {
  const database = {}
  const mrtlist = await getjson('./datasets/mrt_coords.json');
  const buslist = await getjson('./datasets/bus_stops_complete.json')
  for (const mrt_dict of mrtlist) {
    database[mrt_dict.station_name] = [];
    // Algorithm:
    // 1. add the top 2 nearest bus stop
    // 2. add any other bus stops within (2nd nearest bus stop + 0.1)km
    let closest1_dict = Infinity; // nearest bus stop
    let closest2_dict = Infinity; // 2nd nearest bus stop
    for (const bus_dict of buslist) {
      const dist = haversine(mrt_dict.lat, mrt_dict.lng, bus_dict.Latitude, bus_dict.Longitude);
      if (dist < closest1_dict) {
        closest2_dict = closest1_dict;
        closest1_dict = dist;    
      } else if (dist < closest2_dict)
        closest2_dict = dist;
    }
    const distRange = closest2_dict + 0.1;
    for (const bus_dict of buslist) {
      const dist = haversine(mrt_dict.lat, mrt_dict.lng, bus_dict.Latitude, bus_dict.Longitude);
      if (dist <= distRange)
        database[mrt_dict.station_name].push([bus_dict.BusStopCode, dist])
    }
    database[mrt_dict.station_name].sort((a, b) => a[1] - b[1]);
  }
  console.log(database);
  downloadJSON(database, "mrt_to_bus2")
}

export async function busstops_near_mrt() {
  const database = {}
  const data = await getjson('./datasets/mrt_to_bus2.json');
  const map = await getjson('./datasets/mrtname_code_map.json');
  for (const key in data) {
    for (const sublist of data[key]) {
      if (!(sublist[0] in database)) { // not in database
        database[sublist[0]] = [map[key]];
      } else {
        database[sublist[0]].push(map[key])
      }
    }
  }
  console.log(database);
  downloadJSON(database, "busstops_near_mrt")
}

export async function bus_stops_info() {
  const database = []
  const data = await getjson('./datasets/bus_stops_complete.json');
  const mrtdata = await getjson('./datasets/busstops_near_mrt.json');
  for (const dict of data) {
    const list = [dict.RoadName, dict.BusStopCode, []]
    if (mrtdata[dict.BusStopCode]) {
      for (const mrtcode of mrtdata[dict.BusStopCode]) {
        list[2].push(mrtcode)
      }
    }
    database.push(list)
  }
  console.log(database);
  downloadJSON(database, "bus_stops_info")
}

