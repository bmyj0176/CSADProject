import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./stylesheets/login_register.css";

export const login = async (email, password, navigate) => {
  
  try {
    const response = await axios.post('http://localhost:5000/auth/login', { 
      email: email.trim(),
      password: password.trim(),
     });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('username', response.data.username);
    console.log('Login successful');
    navigate("/");
    window.location.reload();
  } catch (error) {
    console.error(error);
    console.log('Login failed');
  }
}

function Login() {

  const navigate = useNavigate();
  const location = useLocation()
  const retainedData = location.state // from login page

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (retainedData) {
      setEmail(retainedData.email)
      setPassword(retainedData.password)
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password, navigate);
  }

  return (
    <>

      <img className="nyoomlogin" src="./images/nyoom.png"/>

      <h1 style={{textAlign:'center'}}>Login</h1>
      <form onSubmit={handleSubmit}>
        <p>
          Email: <nbsp/>
          <input type="text" placeholder="Enter Your Email Here" value={email} onChange={(e) => setEmail(e.target.value)} />
        </p>
        <p>
          Password: <nbsp/>
          <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </p>
        <p>
          Don't have an account? &nbsp;
          <Link 
          to="/register" 
          style={{textDecorationLine:"underline"}} 
          className='links'
          state={{email: email, password: password}}>
            Sign up now
          </Link>
        </p>
        <p>
          <Link to="/" style={{textDecorationLine:"underline", color:"grey"}} className='links'>Continue as guest</Link>
        </p>
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
