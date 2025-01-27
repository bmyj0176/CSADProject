import axios from "axios";
import API_CONFIG from "./apiconfig.js";

// Create Axios instance with base settings
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    "AccountKey": API_CONFIG.API_KEY,
    "accept": "application/json",
  },
  timeout: 10000,  // 10 seconds timeout
});

// Handle request and response interceptors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

export async function TrainAlertsService() {
  console.log("test2")
  try {
    const response = await axios.get(`https://datamall2.mytransport.sg/ltaodataservice/TrainServiceAlerts`);
    console.log("test")
    return response.data;
  } catch (error) {
    console.error('TrainAlertsService API Call Failed: ', error);
  }
  return null
}

export default apiClient;