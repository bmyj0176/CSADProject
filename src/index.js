/* eslint-disable react/react-in-jsx-scope */
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./pages/NavBar";
import Homepage from "./pages/Homepage"
import ArrivalTimes from "./pages/ArrivalTimes"
  import ArrivalTimesList from "./pages/ArrivalTimes/ArrivalTimesList";
import TravelTimeEST from "./pages/TravelTimeEST"
  import FindRoutes from "./pages/TravelTimeEST/FindRoutes";
  import SavedRoutes from "./pages/TravelTimeEST/SavedRoutes";
import Login from "./pages/Login"
import Register from "./pages/Register"
import NoPage from "./pages/Page404.js";
import About from "./pages/Profile/about";
import Settings from "./pages/Profile/settings";
import LoadingPage from "./pages/LoadingPage";
import Popup from "./pages/Popup.js"
import React, { useState, useEffect } from "react";


export default function App() {

const [userLoggedIn, setUserLoggedIn] = useState(false);

// Update localStorage when authentication state changes
useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    setUserLoggedIn(true);
  }
}, []);

// Handle login
const handleLogin = () => {
  setUserLoggedIn(true); // Update state
};

// Handle logout
const handleLogout = () => {
  setUserLoggedIn(false); // Update state
};

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />} >
              {/*End of branch of NavBar*/}
              <Route index element={<Homepage />} />
              <Route path="arrivaltimes" element={<ArrivalTimes />} />
              <Route path="traveltimeest" element={<TravelTimeEST />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="*" element={<NoPage />} />
              <Route path="about" element={<About />} />
              <Route path="settings" element={<Settings />} />
              </Route> {/*End of branch of NavBar*/}
      </Routes> 
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />); 