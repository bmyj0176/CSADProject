import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userAuthRouter from './user_auth.js';
import busArrivalAPIRouter from './bus_arrival_api.js';

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', userAuthRouter);
app.use('', busArrivalAPIRouter);

// start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

// mongodb connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((error) => console.error('MongoDB connection error:', error));