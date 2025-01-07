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

  useEffect(() => {
    if (retainedData) {
      setEmail(retainedData.email)
      setPassword(retainedData.password)
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents default submission, makes this function intercept 
    setUsername(username.trim())
    setEmail(email.trim())
    if (validateInput()) {
      try {
        await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/auth/register`, { 
          username: username.trim(), 
          email: email.trim(), 
          password: password, 
        });
        console.log('Registration successful');
        await login(email, password, navigate);
      } catch (error) {
        console.error(error);
        console.log('Registration failed');
      }
    }
  };

  // returns true if successful, otherwise return false
  const validateInput = () => {
    const errorElements = document.getElementsByClassName("error")
    for (const element of errorElements)
      element.innerHTML = ""
    if (username === "") {
      document.getElementById("username").focus() // .focus() changes selection to that element
      document.getElementById("err_username").innerHTML = "Please enter a username."
      return false
    }
    if (email === "") {
      document.getElementById("email").focus()
      document.getElementById("err_email").innerHTML = "Please enter your email."
      return false
    }
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!regex.test(email))
      {
        document.getElementById("email").focus()
        document.getElementById("err_email").innerHTML = "You have entered an invalid email address."
        return false
      }
    if (password === "") {
      document.getElementById("password").focus()
      document.getElementById("err_password").innerHTML = "Please enter a password."
      return false
    }
    if (password.length < 8) {
      document.getElementById("password").focus()
      document.getElementById("err_password").innerHTML = "Passwords must be at least 8 characters."
      return false
    }
    if (password !== password2) {
      document.getElementById("password2").focus()
      document.getElementById("err_password2").innerHTML = "Passwords do not match."
      return false
    }
    return true
  }

  return (
    <>
      <img className="nyoomlogin" src={isDarkTheme ? "./images/nyoom.png":"./images/nyoom_light.png" }/>
      
      <h1 style={{textAlign:'center'}}>Register</h1>
      <form onSubmit={handleSubmit}>
        <p>
          Username: <nbsp/>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Your Username Here"/>
          <div class="error" id="err_username" style={{color:'#E03E57'}}></div> {/* '#E03E57' isdocument.getElementById("err_username").innerHTML =  red*/}
        </p>
        <p>
          Email: <nbsp/>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email Here"/>
          <div class="error" id="err_email" style={{color:'#E03E57'}}></div>
        </p>
        <p>
          Password: <nbsp/>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password"/>
          <div class="error" id="err_password" style={{color:'#E03E57'}}></div>
        </p>
        <p className="confirmpass">
          Confirm Password: <nbsp/>
          <input className="confirmpass2" size="15" type="password" id="password2" value={password2} onChange={(e) => setPassword2(e.target.value)} placeholder="Enter Password"/>
          <div class="error" id="err_password2" style={{color:'#E03E57'}}></div>
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
      </form>
    </>
  );
}

export default Register;
