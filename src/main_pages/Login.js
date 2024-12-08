import axios from 'axios';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      alert('Login successful');
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <p>
        Email:
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </p>
      <p>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </p>
      <p>
        Don't have an account? <Link to="/register">Sign up now</Link>
      </p>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
