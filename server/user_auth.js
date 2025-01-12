import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './models/User.js';

const router = express.Router();

// register route
router.post('/register', async (req, res) => {
    const { username, email, password, savedarrivaltimes } = req.body;
  
    try {
      // check if email exists
      const user = await User.findOne({ email });
      if (user) {
        return res.status(409).json({ error: 'Email already exists' })
      }

      console.log('savedarrivaltimes')
      console.log(savedarrivaltimes)

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        ...(savedarrivaltimes && { savedarrivaltimes }),
      });

      console.log('newUser')
      console.log(newUser)
  
      await newUser.save();
      console.log('User created successfully');
      return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error)
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
        return res.status(404).json({ error: 'User not found' });
      }

      const passwordMatch = await bcrypt.compare(trimmedPassword, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      return res.status(200).json({ 
        token, 
        username: user.username,
        savedarrivaltimes: user.savedarrivaltimes, 
      }); // send stuff to frontend
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
  });

export default router