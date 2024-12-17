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
            let testList = [firstBusPer500[n], firstBusPer500[n+1], busNumber];
            testList.sort();
            if (busNumber === testList[1]) // bus index is squished between these two pages is true
                return n*500
        }
}

export function stealCoords() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("Latitude: " + position.coords.latitude);
            console.log("Longitude: " + position.coords.longitude);
            return [position.coords.latitude, position.coords.longitude]
          },
          (error) => {
            console.error("Error: " + error.message);
          }
        );
    } else {
        console.log("Geolocation is not supported by this browser.");
    }    
}

export function haversine(lat1, lon1, lat2, lon2) { // pythagoras but for world coords
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