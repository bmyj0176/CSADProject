import express from 'express'
import fetch from 'node-fetch'

const router = express.Router();

// Bus Arrival API route
router.get('/onemap-search', async (req, res) => {
    const searchVal = req.query.searchVal; // Getting busStopCode from query params
  
    if (!searchVal) {
      return res.status(400).json({ error: 'searchVal is required' });
    }
  
    try {
      const response = await fetch(
        `https://www.onemap.gov.sg/api/common/elastic/search?returnGeom=Y&getAddrDetails=N&pageNum=1&searchVal=${searchVal}`, 
        {
          method: 'GET',
          headers: {
            'Authorization': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlMDMwNmM2YjY1NjJkMDg5MWE3ODMyNWFhNDY1OTE2MyIsImlzcyI6Imh0dHA6Ly9pbnRlcm5hbC1hbGItb20tcHJkZXppdC1pdC1uZXctMTYzMzc5OTU0Mi5hcC1zb3V0aGVhc3QtMS5lbGIuYW1hem9uYXdzLmNvbS9hcGkvdjIvdXNlci9zZXNzaW9uIiwiaWF0IjoxNzM4NTY4NTg2LCJleHAiOjE3Mzg4Mjc3ODYsIm5iZiI6MTczODU2ODU4NiwianRpIjoiNU5LS0FybWtkRFluRnlZUCIsInVzZXJfaWQiOjU1NzQsImZvcmV2ZXIiOmZhbHNlfQ.8EVAm0lqbmUs18LNLWZqHGS4MEiojpvlImpAQEk9gP4", // Your API key here
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