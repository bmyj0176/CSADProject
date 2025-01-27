import axios from 'axios';
import { getjson, getBusStopInfo } from './helper_functions';
import { downloadJSON, haversine } from './helper_functions2';
import { BusArrival, BusRoutes, BusStops } from './api_caller';

export async function busstop_map() {
    const database = {};
    for (let num = 0; num < 52; num++) {
      console.log("cycle", num);
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
    downloadJSON(database, "busstop_map");
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
      database.push(dict);
    }
    skip += 500;
  }
  console.log(database);
  downloadJSON(database, "bus_stops_complete");
}

export async function bus_services_at_stop() {
  const database = {};
  const bsc_list = [];
  const data = await getjson('./datasets/bus_stops_complete.json');
  for (const dict of data) {
    bsc_list.push(dict.BusStopCode)
  }

  // Function to process in batches of 10
  const batchSize = 10;
  for (let i = 0; i < bsc_list.length; i += batchSize) {
      // Create a batch of 10 items
      const batch = bsc_list.slice(i, i + batchSize);

      // Wait for all promises in the batch to resolve
      await Promise.all(batch.map(async (bsc) => {
          const data = await BusArrival(bsc);
          const list = data.Services.map(svc => svc.ServiceNo);
          database[bsc] = list;
          console.log(bsc);
      }));
  }

  console.log(database);
  downloadJSON(database, "bus_services_at_stop");
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

export async function mrt_to_bus() {
  const database = {}
  console.log(database);
  downloadJSON(database, "mrt_to_bus")
}

export async function bus_stops_info() {
  const database = []
  const rawdata = await getjson('./datasets/bus_stops_complete.json');

  console.log(database);
  downloadJSON(database, "bus_stops_info")
}

export async function busstops_near_mrt() {
  const database = {}
  console.log(database);
  downloadJSON(database, "busstops_near_mrt")
}

