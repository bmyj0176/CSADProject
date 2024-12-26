import fetch from 'node-fetch'

const router = express.Router();

// Bus Arrival API route
router.get('/bus-arrival', async (req, res) => {
    const busStopCode = req.query.busStopCode; // Getting busStopCode from query params
  
    if (!busStopCode) {
      return res.status(400).json({ error: 'BusStopCode is required' });
    }
  
    try {
      const response = await fetch(
        `https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=${busStopCode}`, 
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