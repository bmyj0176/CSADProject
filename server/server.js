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
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Authentication Routes
// Register Route
app.post('/auth/register', async (req, res) => {
  console.log('Received request at /auth/register');
  const { email, password } = req.body;
  const trimmedPassword = password.trim();

  try {
    console.log(`REGISTER user: ${email}`)
    console.log(`1IM Creating pass: ${trimmedPassword}`)
    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log('User created successfully');
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error saving user to DB:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
  
});

// Login Route
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const trimmedPassword = password.trim();

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.error({ error: 'User not found' });
      return res.status(401).json({ error: 'User not found' });
    }
    
    const passwordMatch = await bcrypt.compare(trimmedPassword, user.password);
    if (!passwordMatch) {
      console.error({ error: 'Invalid credentials' });
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error({ error: 'Login error' });
    res.status(500).json({ error: 'Login error' });
  }
});