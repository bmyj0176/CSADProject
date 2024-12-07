import axios from 'axios';

export async function BusArrival(busStopCode) {
    try {
        const response = await axios.get(`http://localhost:5000/api/bus-arrival?busStopCode=${busStopCode}`);
        return response.data; // Return the fetched JSON data
      } catch (error) {
        console.error('Error fetching bus data:', error);
      }
    return null
}