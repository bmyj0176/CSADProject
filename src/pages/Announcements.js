import React, { useEffect, useState } from "react";
import BouncyBouncy from './Components/LoadingIcon.js';
import { TrainAlertsService } from "../utils/api_caller.js";
import "./stylesheets/announcements.css";

const Announcements = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [announcements, setAnnouncements] = useState([]);
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
  useEffect(() => {
    const savedAnnouncements = JSON.parse(localStorage.getItem("announcements")) || [];
    setAnnouncements(savedAnnouncements);
  }, []);

  // Save to localStorage whenever announcements change
  useEffect(() => {
    localStorage.setItem("announcements", JSON.stringify(announcements));
  }, [announcements]);

  // Add a new announcement
  const handleAdd = () => {
    if (!newAnnouncement.trim()) return;
    const updatedAnnouncements = [...announcements, newAnnouncement];
    setAnnouncements(updatedAnnouncements);
    setNewAnnouncement("");
  };

  // Edit an announcement
  const handleEdit = (index, newText) => {
    const updatedAnnouncements = [...announcements];
    updatedAnnouncements[index] = newText;
    setAnnouncements(updatedAnnouncements);
  };

  // Delete an announcement
  const handleDelete = (index) => {
    const updatedAnnouncements = announcements.filter((_, i) => i !== index);
    setAnnouncements(updatedAnnouncements);
  };


  if (loading) return <BouncyBouncy/>;
  // if (error) return <p style={{ color: "red" }}>{error}</p>;
  
  return (
    <>
      <h1 id="ANheader">NYOOM SITE ANNOUNCEMENTS</h1>
      <div className="ANpanel">
        <ul>
          {announcements.map((text, index) => (
            <li key={index}>
              {isAdmin ? (
                <input className="msg"
                  type="text"
                  value={text}
                  onChange={(e) => handleEdit(index, e.target.value)}
                  style={{ marginRight: "10px" }}
                />
              ) : (
                <span>{text}</span>
              )}
              {isAdmin && <button onClick={() => handleDelete(index)}>🗑️ Delete</button>}
            </li>
          ))}
        </ul>
      </div>
      {isAdmin && (
        <div>
          <input
            type="text"
            value={newAnnouncement}
            onChange={(e) => setNewAnnouncement(e.target.value)}
            placeholder="New Announcement"
          />
          <button onClick={handleAdd}>➕ Add</button>
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