import { convertISO8601, timeDiffISO8601 } from "./helper_func2";
import { BusArrivalTimes } from "./data_get";

// getBusTiming() returns the arrival times of the next 3 buses
// INPUT1 BusStopCode - (int) 5 digit code of bus stop, e.g. 46971, 83139
// INPUT2 BusNumber - (string) bus number, e.g. 185, 901M
// OUTPUT times[] - (list of ints) minutes until the next 3 buses arrive, e.g. [3, 12, 19]
export async function getBusTiming(BusStopCode, BusNumber) {
    const times = []
    const currentDate = new Date().toISOString();
    const nextBusDates = await BusArrivalTimes(BusStopCode, BusNumber)
    for (let nextBusDate of nextBusDates) {
        let time = timeDiffISO8601(convertISO8601(nextBusDate), currentDate)/60
        if (time < 0) { time = 0 }
        time = Math.floor(time)
        times.push(time)
    }
    return times
}