import axios from 'axios';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Register() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(`1. sending ${username} + ${email} + ${password}`)
      await axios.post('http://localhost:5000/auth/register', { 
        username: username.trim(), 
        email: email.trim(), 
        password: password.trim(), 
      });
      alert('Registration successful');
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <p>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </p>
      <p>
        Email:
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </p>
      <p>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </p>
      <p>
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
