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
    downloadJSON(database);
}

export async function bus_services_at_stop() {
  const database = {};
  const bsc_list = await getjson('./datasets/bus_stop_codes.json');

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
  downloadJSON(database);
}

export async function allbusstops() {
  const database = [];
  for (let skip = 0; num < 5000; num+=500) {
    console.log("cycle", num);
    const rawdata = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/bus-stops?skip=${skip}`);
    const value = rawdata.data.value;
    console.log(database)
  }
  console.log(database);
  downloadJSON(database);
}