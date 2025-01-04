import { get_json } from "./file_reader";

export function convertISO8601(time) {
    const date = new Date(time);
    return date.toISOString();
}

export function timeDiffISO8601(time1, time2) {
    const date1 = new Date(time1);
    const date2 = new Date(time2);

    // Calculate difference in milliseconds
    const diffInMilliseconds = date1 - date2;

    // Convert to seconds
    const diffInSeconds = diffInMilliseconds / 1000;

    return diffInSeconds
}

// input is a bus number/service
// output is the index for $skip bus route API parameter for finding the bus service data
export function busRouteAPIQuerySkip(busNumber) {
    const firstBusPer500 = [
        "10", "105", "10e", "117M", "123", "13", "135", "14", "145", "151", 
        "156", "160", "166", "16M", "174", "178A", "185", "190", "196e", "200", 
        "231", "249", "268", "296", "30e", "334", "36B", "40", "45", "50", 
        "518", "55", "60", "63A", "657", "67", "70", "74", "79T", "81", 
        "851", "854", "858B", "87", "89e", "913M", "95", "961M", "966A", "974", 
        "980", "990"];
        for (let n = 0; n < firstBusPer500.length; n++) {
            if (busNumber === firstBusPer500[n]) { // if bus selection hits the mark
                if (n === 0)
                    return 0;
                else
                    return (n*500-250);
            } 
            if (n === (firstBusPer500.length-1)) { // if already final page
                return n*500;
            }
            let testList = null
            if (n === 0)
                testList = ["0", firstBusPer500[n], busNumber];
            else
                testList = [firstBusPer500[n-1], firstBusPer500[n], busNumber];
            testList.sort();
            if (busNumber === testList[1]) // bus index is squished between these two pages is true
                return (n-1)*500
        }
}

// INPUT1 dict - (dict)
// INPUT2 list - (list of dicts)
// OUTPUT isFound - (bool) false: NOT FOUND, true: FOUND
export function dict_in_list(dict, list) {
    return list.some(item =>
        Object.entries(dict).every(([key, value]) => item[key] === value)
    );
}

export async function doxx() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                resolve([position.coords.latitude, position.coords.longitude]);  // Resolve with coordinates
              },
              (error) => {
                console.error("Geolocation error:", error.message);  // Log the error instead of rejecting
                resolve([null, null]);  // Resolve with null values instead of rejecting the promise
              }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");  // Log a message if geolocation is not available
            resolve([null, null]);  // Resolve with null values
        }
    });
}

export function haversine(lat1, lon1, lat2, lon2) { // pythagoras but for geographical coords
    const R = 6371; // Earth's radius in km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

export function insertAndShift(list, index, newValue) {
    list.splice(index, 0, newValue); // adds newValue at index
    
    // remove the last element
    list.pop(); 
    
    return list;
}

// INPUT bsc_list - (list of strings) bus stop codes
// OUTPUT filtered_list (list of lists) mapped lists of nearby mrts, no nearby is empty
export async function checkForNearbyMRTs (bsc_list) {
    const filtered_list = []
    const data = await get_json('./datasets/busstops_near_mrt.json')
    for (const bsc of bsc_list) {
        filtered_list.push((bsc in data) ? data[bsc] : [])
    }
    return filtered_list
}

// INPUT - (string) code of MRT station
// OUTPUT - (string) path to image
export function codeToMRTImagePath(code) {
    let station_code = code.replace(/[0-9]/g, "")
    let path = './images/MRTIcons/'
    switch (station_code) {
        case "BP":
        case "PE":
        case "PTC":
        case "PW":
        case "SE":
        case "STC":
        case "SW":
            path += "LRT"
            break
        case "CC":
        case "CE":
            path += "CCL"
            break
        case "CG":
        case "EW":
            path += "EWL"
            break
        case "NE":
            path += "NEL"
            break
        case "NS":
            path += "NSL"
            break
        case "DT":
            path += "DTL"
            break
        case "TE":
            path += "TEL"
            break
        default:
            break
    }
    path += ".png"
    return path
}