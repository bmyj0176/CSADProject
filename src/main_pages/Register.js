import axios from 'axios';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Register() {

  var [username, setUsername] = useState('');
  var [email, setEmail] = useState('');
  var [password, setPassword] = useState('');
  var [password2, setPassword2] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents default submission, makes this function intercept 
    setUsername(username.trim())
    setEmail(email.trim())
    if (validateInput()) {
      try {
        await axios.post('http://localhost:5000/auth/register', { 
          username: username.trim(), 
          email: email.trim(), 
          password: password, 
        });
        alert('Registration successful');
      } catch (error) {
        console.error(error);
        alert('Registration failed');
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
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!regex.test(email))
    {
      document.getElementById("email").focus()
      document.getElementById("err_email").innerHTML = "You have entered an invalid email address."
      return false
    }
    return true
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <p>
        Username:
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <div class="error" id="err_username" style={{color:'#E03E57'}}></div> {/* '#E03E57' isdocument.getElementById("err_username").innerHTML =  red*/}
      </p>
      <p>
        Email:
        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div class="error" id="err_email" style={{color:'#E03E57'}}></div>
      </p>
      <p>
        Password:
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div class="error" id="err_password" style={{color:'#E03E57'}}></div>
      </p>
      <p>
        Confirm Password:
        <input type="password" id="password2" value={password2} onChange={(e) => setPassword2(e.target.value)}/>
        <div class="error" id="err_password2" style={{color:'#E03E57'}}></div>
      </p>
      <p>
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
