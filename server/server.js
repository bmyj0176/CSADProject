import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userAuthRouter from './user_auth.js';
import busArrivalAPIRouter from './bus_arrival_api.js';
import busRoutesAPIRouter from './bus_routes_api.js';
import busStopsAPIRouter from './bus_stops_api.js';

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', userAuthRouter);
app.use('/api', busArrivalAPIRouter);
app.use('/api', busRoutesAPIRouter);
app.use('/api', busStopsAPIRouter);

// start server
app.listen(process.env.PORT, () => {
  console.log(`Backend server running on deprecated roblox code 🗣️🗣️🗣️🗣️🗣️🔥🔥 (port ${process.env.PORT})`);
});

// mongodb connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((error) => console.error('MongoDB connection error:', error));