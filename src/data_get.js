import { BusArrival } from "./api_caller";

export async function BusArrivalTimes(BusStopCode, BusNumber) {
    try {
        // Fetch bus arrival data
        const response = await BusArrival(BusStopCode);
        const services = response.Services;

        // Ensure data exists and find the specific bus service
        if (!services) {
            throw new Error("Services not found");
        }
        const service = services.find(service => service["ServiceNo"] === BusNumber);

        // Handle case where the service is not found
        if (!service) {
            throw new Error(`Service ${BusNumber} not found at bus stop ${BusStopCode}`);
        }

        // Extract arrival times
        const list_arrival_times = [];
        list_arrival_times.push(service.NextBus.EstimatedArrival);
        list_arrival_times.push(service.NextBus2.EstimatedArrival);
        list_arrival_times.push(service.NextBus3.EstimatedArrival);

        return list_arrival_times;
    } catch (error) {
        console.error(error.message);
        return [];
    }
}
