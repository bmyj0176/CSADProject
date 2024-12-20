import axios from 'axios';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./stylesheets/login_register.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { 
        email: email.trim(),
        password: password.trim(),
       });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      window.location.reload();
      alert('Login successful');
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  return (
    <>
      <h1 style={{textAlign:'center'}}>Login</h1>
      <form onSubmit={handleSubmit}>
        <p>
          Email: <nbsp/>
          <input type="text" placeholder="Enter Your Email Here" value={email} onChange={(e) => setEmail(e.target.value)} />
        </p>
        <p>
          Password: <nbsp/>
          <input type="password" placeholder="Enter Password"value={password} onChange={(e) => setPassword(e.target.value)} />
        </p>
        <p>
          Don't have an account? <Link to="/register" style={{textDecorationLine:"underline"}} className='links'>Sign up now</Link>
        </p>
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
