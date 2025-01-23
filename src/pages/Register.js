import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { ThemeContext } from './Components/ToggleThemeButton';
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./stylesheets/login_register.css";
import { login } from './Login';

function Register() {

  const { isDarkTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation()
  const retainedData = location.state // from login page

  var [username, setUsername] = useState('');
  var [email, setEmail] = useState('');
  var [password, setPassword] = useState('');
  var [password2, setPassword2] = useState('');
  var [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    misc: ''
  })

  useEffect(() => {
    if (retainedData) {
      setEmail(retainedData.email)
      setPassword(retainedData.password)
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault(); // prevents default submission, makes this function intercept 
    setUsername(username.trim())
    setEmail(email.trim())
    if (validateInput()) {
      try {
        const savedarrivaltimes = localStorage.getItem("savedarrivaltimes")
        const data = {
          username: username.trim(), 
          email: email.trim().toLowerCase(), 
          password: password,
        }
        if (savedarrivaltimes)
          data.savedarrivaltimes = JSON.parse(savedarrivaltimes);
        await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/auth/register`, data);
        console.log('Registration successful');
        //await login(email, password, navigate);
      } catch (error) {
        console.log(error)
        const newErrors = { username: '', email: '', password: '', password2: '', misc: ''}
        if (error.response.status === 409) { // email already exists error
          document.getElementById("email").focus()
          newErrors.email = "Email already exists, please login instead."
        } else if (error.response.status === 500) {
          newErrors.misc = "Internal Server Error. Please try again later."
        } else {
          console.error(error);
          console.log('Registration failed for other reasons');
        }
        setErrors(newErrors)
      }
    }
  };
  
  // returns true if successful, otherwise return false
  const validateInput = () => {
    let isValid = true
    const newErrors = { username: '', email: '', password: '', password2: '', misc: ''}
    if (username === "") {
      document.getElementById("username").focus() // .focus() changes selection to that element
      newErrors.username = "Please enter a username."
      isValid = false
    }
    else if (email === "") {
      document.getElementById("email").focus()
      newErrors.email = "Please enter your email."
      isValid = false
    }
    else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) // regex
    {
      document.getElementById("email").focus()
      newErrors.email = "You have entered an invalid email address."
      isValid = false
    }
    else if (password === "") {
      document.getElementById("password").focus()
      newErrors.password = "Please enter a password."
      isValid = false
    }
    else if (password.length < 8) {
      document.getElementById("password").focus()
      newErrors.password = "Passwords must be at least 8 characters."
      isValid = false
    }
    else if (password !== password2) {
      document.getElementById("password2").focus()
      newErrors.password2 = "Passwords do not match."
      isValid = false
    }
    setErrors(newErrors)
    return isValid
  }

  return (
    <>
      <img className="nyoomlogin" src={isDarkTheme ? "./images/nyoom.png":"./images/nyoom_light.png" }/>
      
      <h1 style={{textAlign:'center'}}>Register</h1>
      <form onSubmit={handleRegister}>
        <p>
          Username: &nbsp;
          <input 
          type="text" 
          id="username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Your Username Here"/>
          <br/>
          <span className="error">{errors.username}</span>
        </p>
        <p>
          Email: &nbsp;
          <input 
          type="text" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Enter Your Email Here"/>
          <br/>
          <span className="error">{errors.email}</span>
        </p>
        <p>
          Password: &nbsp;
          <input 
          type="password" 
          id="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Enter Password"/>
          <br/>
          <span className="error">{errors.password}</span>
        </p>
        <p className="confirmpass">
          Confirm Password: &nbsp;
          <input 
          type="password" 
          id="password2" 
          className="confirmpass2" 
          size="15" 
          value={password2} 
          onChange={(e) => setPassword2(e.target.value)} 
          placeholder="Enter Password"/>
          <br/>
          <span className="error">{errors.password2}</span>
        </p>
        <p>
          Already have an account? &nbsp;
          <Link 
          to="/login" 
          className='links' 
          style={{textDecorationLine:"underline"}}
          state={{email: email, password: password}}>
            Login
          </Link>
        </p>
        <button type="submit">Register</button>
        <div className="error">{errors.misc}</div>
      </form>
    </>
  );
}

export default Register;
