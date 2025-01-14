async function busstop_map() {
    const database = {};
    for (let num = 0; num < 52; num++) {
        console.log("cycle", num);
        const rawdata = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/bus-routes?skip=${num * 500}`);
        const value = rawdata.data.value;
        for (const dict of value) {
            if (!database[dict.ServiceNo]) {  
                database[dict.ServiceNo] = {};  
            }
            const innerMap = database[dict.ServiceNo];
            if (!innerMap[dict.Direction]) {  
                innerMap[dict.Direction] = []; 
            }
            const innestMap = innerMap[dict.Direction];
            innestMap.push([dict.BusStopCode, dict.Distance]);
        }
    }

    console.log(database);
    downloadJSON(database)
}