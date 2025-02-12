import axios from 'axios';
import { busRouteAPIQuerySkip } from './helper_functions2';

// INPUT: busStopCode etc. "46971"
// OUTPUT: json
export async function BusArrival(busStopCode) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/bus-arrival?busStopCode=${busStopCode}`);
      return response.data;
  } catch (error) {
    console.error('BusArrival API Call Failed: ', error);
  }
  return null
}

// INPUT: busService etc. "901M"
// OUTPUT: json
export async function BusRoutes(busService) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/bus-routes?skip=${busRouteAPIQuerySkip(busService)}`);
      return response.data;
  } catch (error) {
    console.error('BusRoutes API Call Failed: ', error);
  }
  return null
}

// INPUT: skipIndex because it limits to 500 entries by default, loop with skipIndex starting 0
// OUTPUT: json
export async function BusStops(skipIndex) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/bus-stops?skip=${skipIndex}`)
      return response.data;
  } catch (error) {
    console.error('BusStops API Call Failed: ', error)
  }
  return null
}

// OUTPUT: json
export async function TrainAlertsService() {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/train_alerts`);
    return response.data;
  } catch (error) {
    console.error('TrainAlertsService API Call Failed: ', error);
  }
  return null
}

// INPUT: string like "dover"
// OUTPUT: json
export async function OnemapSearch(searchVal) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/onemap-search?searchVal=${searchVal}`);
    return response.data;
  } catch (error) {
    console.error('Onemap Search API Call Failed: ', error);
  }
}

export async function AddAnnouncement(doc) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_API_URL}/api/announcements/add`, 
      { message: doc.message || "" } // Send in request body
    );  
    console.log("added")  
  } catch (error) {
    console.error('AddAnnouncement API Call Failed: ', error);
  }
}

export async function DeleteAnnouncement(id) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_API_URL}/api/announcements/delete`, 
      { id } // Send in request body
    );  
    console.log("deleted")  
  } catch (error) {
    console.error('DeleteAnnouncement API Call Failed: ', error);
  }
}

export async function ReadAnnouncements() {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/announcements/read`);
    return response.data.announcements;
    console.log("readed")  
  } catch (error) {
    console.error('ReadAnnouncements API Call Failed: ', error);
  }
}

export async function EditAnnouncement(id, new_message) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_API_URL}/api/announcements/edit`, 
      { id, new_message: new_message || "" } // Send in request body
    );
    console.log("edited")  
  } catch (error) {
    console.error('EditAnnouncement API Call Failed: ', error);
  }
}