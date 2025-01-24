import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

import registerRouter from './register.js';
import loginRouter from './login.js';
import busArrivalAPIRouter from './bus_arrival_api.js';
import busRoutesAPIRouter from './bus_routes_api.js';
import busStopsAPIRouter from './bus_stops_api.js';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', registerRouter);
app.use('/auth', loginRouter);
app.use('/api', busArrivalAPIRouter);
app.use('/api', busRoutesAPIRouter);
app.use('/api', busStopsAPIRouter);

// Start server
const port = 5000;
app.listen(port, () => {
    console.log(`Backend server running on deprecated roblox code 🗣️🗣️🗣️🗣️🗣️🔥🔥 at Port 5000`);
});