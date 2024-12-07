import { api_key } from './api_reader.js';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './models/User.js';

dotenv.config();

const app = express();
const port = 5000;

// middleware
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

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Authentication Routes
// Register Route
app.post('/auth/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Login Route
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});