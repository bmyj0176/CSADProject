import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './models/User.js';

const router = express.Router();

// register route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // check if email exists
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(409).json({ error: 'Email already exists' })
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
      console.log('User created successfully');
      return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error saving user to DB:', error);
      return res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
    
  });
  
  // login route
  router.post('/login', async (req, res) => {
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
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  
      res.status(200).json({ token, username: user.username }); // send token & username to frontend
    } catch (error) {
      console.error({ error: 'Login error' });
      res.status(500).json({ error: 'Login error' });
    }
  });

export default router