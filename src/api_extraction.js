async function busstop_map() {
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