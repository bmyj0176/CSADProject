/* eslint-disable react/react-in-jsx-scope */
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./pages/NavBar";
import Homepage from "./pages/Homepage"
import ArrivalTimes from "./pages/ArrivalTimes"
  import ArrivalTimesList from "./pages/ArrivalTimes/ArrivalTimesList";
import TravelTimeEST from "./pages/TravelTimeEST"
  import FindRoutes from "./pages/TravelTimeEST/FindRoutes";
  import SavedRoutes from "./pages/TravelTimeEST/SavedRoutes";
import Login from "./pages/Login"
import Register from "./pages/Register"
import NoPage from "./pages/NoPage";
import About from "./pages/Profile/about";
import Settings from "./pages/Profile/settings";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />} >
              {/*End of branch of NavBar*/}
              <Route index element={<Homepage />} />
              <Route path="arrivaltimes" element={<ArrivalTimes />} />
              <Route path="traveltimeest" element={<TravelTimeEST />} >
                    {/*Start of branch of TravelTimeEST*/}
                    <Route path="findroutes" element={<FindRoutes />} />
                    <Route path="savedroutes" element={<SavedRoutes />} />
                    </Route> {/*End of branch of TravelTimeEST*/}
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