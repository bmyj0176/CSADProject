/* eslint-disable react/react-in-jsx-scope */
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from './pages/Components/ToggleThemeButton.js';
import NavBar from "./pages/NavBar";
import Homepage from "./pages/Homepage"
import ArrivalTimes from "./pages/ArrivalTimes"
import TravelRoutes from "./pages/TravelRoutes"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NoPage from "./pages/Page404.js";
import About from "./pages/Profile/About.js";
import GetStarted from './pages/GetStarted.js';
import React, { useEffect } from "react";
import Audio from "./pages/Profile/Audio.js";
import Settings from "./pages/Profile/Settings.js";


export default function App() {

  useEffect(() => {
    localStorage.removeItem('popup_done')
  }, [])

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />} >
                {/*End of branch of NavBar*/}
                <Route index element={<Homepage />} />
                <Route path="arrivaltimes" element={<ArrivalTimes />} />
                <Route path="traveltimeest" element={<TravelRoutes />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<NoPage />} />
                <Route path="about" element={<About />} />
                <Route path="getstarted" element={<GetStarted />} />
                <Route path="settings" element={<Settings />} />
                <Route path="ost" element={<Audio />} />
                </Route> {/*End of branch of NavBar*/}
        </Routes> 
      </BrowserRouter>
    </ThemeProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />); 