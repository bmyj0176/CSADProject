import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from './Components/ToggleThemeButton';
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./stylesheets/login_register.css";

export const login = async (email, password, navigate, inputSetErrors = null) => {
  
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/auth/login`, { 
      email: email.trim().toLowerCase(),
      password: password.trim(),
     });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('username', response.data.username);
    localStorage.setItem('savedarrivaltimes', JSON.stringify(response.data.savedarrivaltimes));
    console.log('Login successful');
    navigate("/");
    window.location.reload();
  } catch (error) {
    console.error(error);
    console.log('Login failed');  
    if (inputSetErrors) {
      const newErrors = { email: '', password: '', misc: '' }
      if (error.response.status === 404) { // email doesn't exist
        document.getElementById("email").focus()
        newErrors.email = "Email isn't registered."
      } else if (error.response.status === 401) {
        document.getElementById("password").focus()
        newErrors.password = "Wrong password."
      } else if (error.response.status === 500) {
        console.error(error);
        newErrors.misc = "Internal Server Error. Please try again later."
      } 
      inputSetErrors(newErrors)
    }
  }
}

function Login() {

  const { isDarkTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation()
  const retainedData = location.state // from login page

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  var [errors, setErrors] = useState({
    email: '',
    password: '',
    misc: ''
  })

  useEffect(() => {
    if (retainedData) {
      setEmail(retainedData.email)
      setPassword(retainedData.password)
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateInput())
      await login(email, password, navigate, setErrors);
  }
  
  const validateInput = () => {
    let isValid = true
    const newErrors = { email: '', password: '', misc: '' }
    if (email === "") {
      document.getElementById("email").focus()
      newErrors.email = "Please enter your email."
      isValid = false
    }
    else if (password === "") {
      document.getElementById("password").focus()
      newErrors.password = "Please enter your password."
      isValid = false
    }
    setErrors(newErrors)
    return isValid
  }

  return (
    <>

      <img className="nyoomlogin" src={isDarkTheme ? "./images/nyoom.png":"./images/nyoom_light.png" }/>

      <h1 style={{textAlign:'center'}}>Login</h1>
      <form onSubmit={handleSubmit}>
        <p>
          Email: &nbsp;
          <input type="text" id="email" placeholder="Enter Your Email Here" value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
          <span className="error">{errors.email}</span>
        </p>
        <p>
          Password: &nbsp;
          <input type="password" id="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
          <span className="error">{errors.password}</span>
        </p>
        <p>
          Don't have an account? &nbsp;
          <Link 
          to="/register" 
          style={{textDecorationLine:"underline"}} 
          className='links'
          state={{email: email, password: password}}>
            Register now
          </Link>
        </p>
        <button type="submit">Login</button>
        <span className="error">{errors.misc}</span>
      </form>
    </>
  );
}

export default Login;
