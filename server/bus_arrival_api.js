import express from 'express'
import fetch from 'node-fetch'

const router = express.Router();


router.get('/bus-arrival', async (req, res) => {
    const busStopCode = req.query.busStopCode; 
  
    if (!busStopCode) {
      return res.status(400).json({ error: 'BusStopCode is required' });
    }
  
    try {
      const response = await fetch(
        `https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=${busStopCode}`, 
        {
          method: 'GET',
          headers: {
            'AccountKey': process.env.LTA_API_KEY, 
            'Accept': 'application/json',  
          },
        }
      );
  
      if (!response.ok) {
        return res.status(500).json({ error: 'Error fetching data from the API' });
      }
  
      const data = await response.json();
      res.json(data); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

export default router