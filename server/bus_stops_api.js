import express from 'express'
import fetch from 'node-fetch'

const router = express.Router();

// Bus Arrival API route
router.get('/bus-stops', async (req, res) => {
    const skip = req.query.skip; 
  
    if (!skip) {
      skip = 0
    }
  
    try {
      const response = await fetch(
        `https://datamall2.mytransport.sg/ltaodataservice/BusStops?$skip=${skip}`, 
        {
          method: 'GET',
          headers: {
            'AccountKey': process.env.API_KEY, // Your API key here
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

export default router