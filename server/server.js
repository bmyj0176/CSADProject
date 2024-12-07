import { api_key } from './api_reader.js';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';  // Make sure to install node-fetch

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Bus Arrival route
app.get('/api/bus-arrival', async (req, res) => {
  const busStopCode = req.query.busStopCode; // Getting busStopCode from query params
  const apiKey = await api_key(); // Insert your API key here

  if (!busStopCode) {
    return res.status(400).json({ error: 'BusStopCode is required' });
  }

  try {
    const response = await fetch(
      `https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=${busStopCode}`, 
      {
        method: 'GET',
        headers: {
          'AccountKey': apiKey, // Your API key here
          'Accept': 'application/json',  // You can specify this as JSON
        },
      }
    );

    if (!response.ok) {
      return res.status(500).json({ error: 'Error fetching data from the API' });
    }

    const data = await response.json();
    res.json(data); // Sending the API response data to React frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
