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
import GetStarted from './pages/GetStarted.js';
import React, { useState, useEffect } from "react";
import { PopupProvider } from "./pages/Popup.js";


export default function App() {

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
              <Route path="getstarted" element={<GetStarted />} />
              </Route> {/*End of branch of NavBar*/}
      </Routes> 
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />); 