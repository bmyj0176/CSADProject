import axios from 'axios';
import { busRouteAPIQuerySkip } from './helper_functions2';

export async function BusArrival(busStopCode) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/bus-arrival?busStopCode=${busStopCode}`);
      return response.data;
  } catch (error) {
    console.error('BusArrival API Call Failed: ', error);
  }
  return null
}

export async function BusRoutes(busService) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/bus-routes?skip=${busRouteAPIQuerySkip(busService)}`);
      return response.data;
  } catch (error) {
    console.error('BusRoutes API Call Failed: ', error);
  }
  return null
}

export async function BusStops(skipIndex) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/bus-stops?skip=${skipIndex}`)
      return response.data;
  } catch (error) {
    console.error('BusStops API Call Failed: ', error)
  }
  return null
}

export async function TrainAlertsService() {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/announcements`);
    return response.data;
  } catch (error) {
    console.error('TrainAlertsService API Call Failed: ', error);
  }
  return null
}