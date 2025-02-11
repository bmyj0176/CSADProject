import express from 'express'
import fetch from 'node-fetch'

const router = express.Router();


router.get('/bus-routes', async (req, res) => {
    const skip = req.query.skip; 
  
    if (!skip) {
      skip = 0
    }
  
    try {
      const response = await fetch(
        `https://datamall2.mytransport.sg/ltaodataservice/BusRoutes?$skip=${skip}`, 
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