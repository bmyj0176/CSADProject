import React, { useEffect, useState } from "react";
import BouncyBouncy from './Components/LoadingIcon.js';
import { TrainAlertsService } from "../utils/api_caller.js";
import { ReadAnnouncements, AddAnnouncement, DeleteAnnouncement, EditAnnouncement } from "../utils/api_caller.js";
import "./stylesheets/announcements.css";
import axios from "axios";

const Announcements = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [data, setData] = useState([])
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [isAdmin, setIsAdmin] = useState(() => {
    const email = localStorage.getItem('email')
      if (!email) 
        return false
      return (email === "nyoom123@gmail.com")
    }
  )

  useEffect(() => {
    const fetchTrainAlerts = async () => {
      try {
        const response = await TrainAlertsService()
        console.log('Announcements successful');
      } catch (error) {
        console.error(error);
        console.log('Announcements failed'); 
      }
    };

    fetchTrainAlerts();
  }, []);

  useEffect(() => {
    updateAnnouncements();
  }, []);

  const updateAnnouncements = async () => {
    const data = await ReadAnnouncements();
    setData(data);
  };

  // Add a new announcement
  const handleAdd = async () => {
    if (!newAnnouncement.trim()) return;
    await AddAnnouncement({
      message: newAnnouncement
    })
    await updateAnnouncements();
    setNewAnnouncement("")
  };

  // Delete an announcement
  const handleDelete = async (index) => {
    await DeleteAnnouncement(data[index].id);
    await updateAnnouncements();
  };

  const handleEdit = async (index, new_message) => {
    await EditAnnouncement(data[index].id, new_message);
    await updateAnnouncements();
  }

  useEffect(() => {
    const fetchTrainAlerts = async () => {
      try {
        // EXPECTED STRUCTURE (from real case):
        // "value":
        // {
        //   "Status": 1,
        //   "AffectedSegments": [],
        //   "Message": [
        //     {
        //     "Content": "9:00am: NSL - Please expect longer waiting time of up to 5 min on NSEWL train service due to an engineering vehicle fault. Free regular bus and bridging bus services are available between Bishan and Woodlands. Passengers are advised to use TEL and CCL.",
        //     "CreatedDate": "2025-02-07 09:01:48"
        //     }
        //   ]
        // }
        const response = await TrainAlertsService();
        if (response.value) {
          const value = response.value
          if (value.Message) {
            const messages = value.Message
            setMessages(messages);
          }
        }
      } catch (error) {
        setError("Failed to fetch train alerts. Please try again later.");
        console.error("API error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainAlerts();
  }, []);

// Load announcements from localStorage on first render
  // useEffect(() => {
  //   const savedAnnouncements = JSON.parse(localStorage.getItem("announcements")) || [];
  //   setAnnouncements(savedAnnouncements);
  // }, []);

  // // Save to localStorage whenever announcements change
  // useEffect(() => {
  //   localStorage.setItem("announcements", JSON.stringify(announcements));
  // }, [announcements]);

  if (loading) return <BouncyBouncy/>;
  // if (error) return <p style={{ color: "red" }}>{error}</p>;
  
  return (
    <>
      <h1 id="ANheader">NYOOM SITE ANNOUNCEMENTS</h1>
      <div className="ANpanel">
        <ul>
          {data.map((dict, index) => (
            <li key={index}>
              {isAdmin ? (
                <input className="msg"
                  type="text"
                  value={dict.message}
                  onChange={(e) => handleEdit(index, e.target.value)} 
                  style={{ marginRight: "10px" }}
                />
              ) : (
                <span>{dict.message}</span>
              )}
              {isAdmin && <button onClick={() => handleDelete(index)}>🗑️ Delete</button>}
            </li>
          ))}
        </ul>
      </div>
      {isAdmin && (
        <div className="add">
          <input
            type="text"
            placeholder="New Announcement"
            value={newAnnouncement}  // Bind the input value to the state
            onChange={(e) => setNewAnnouncement(e.target.value)}  // Update the state as the user types
          />
          <button onClick={handleAdd}>➕ Add</button>
          <pre>
          🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩<br/>
          ⬛⬛🟩🟩🟩🟩🟩🟩🟩🟩🟩<br/>
          🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟩🟩<br/>
          ⬛⬛🟩⬛⬛⬛🟩⬛🟨🟨🟨🟩🟩<br/>
          ⬛⬛⬛🟨⬛⬛⬛🟨🟧🟨🟧<br/>
          🟨🟨🟨🟨🟨🟥🟨🟨🟨🟧🟨🟩🟩<br/>
          🟨🟥🟥🟥🟥🟨🟨🟨🟧🟨🟧🟩🟩<br/>
          🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨<br/>
          ⬛️⬛️⬛🟨⬜️⬜️⬜️⬜️⬜️🟨🟨<br/>
          🟨🟨⬛️🟨⬜️⬜️⬜️⬜️⬜️🟨🟨⬛🟨🟨<br/>
          🟨🟨⬛️🟨⬜️⬜️⬜️⬜️⬜️🟨🟨⬛🟨🟨
          </pre>
        </div>
      )}
      <h1>Train Service Alerts</h1>
      {messages.length === 0 ? (
        <p style={{ color: "green" }}>All train services are running smoothly.</p>
      ) : (
        <div>
          <h2>Alerts:</h2>
          <ul>
            {messages.map((message, index) => (
              <li key={index}>
                <strong>Message:</strong> {message.Content} <br />
                <strong>Date Posted:</strong> {message.CreatedDate} <br />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Announcements;