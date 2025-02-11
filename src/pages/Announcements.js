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

  
  const handleAdd = async () => {
    if (!newAnnouncement.trim()) return;
    await AddAnnouncement({
      message: newAnnouncement
    })
    await updateAnnouncements();
    setNewAnnouncement("")
  };

  
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


  
  
  
  

  
  
  
  

  if (loading) return <BouncyBouncy/>;
  
  
  return (
    <>
      <h1 id="ANheader">NYOOM SITE ANNOUNCEMENTS</h1>
      <div className="ANpanel">
        <ul>
          {data.map((dict, index) => (
            <li key={index}>
              {isAdmin ? (
                <input className="inputmsg"
                  type="text"
                  value={dict.message}
                  onChange={(e) => handleEdit(index, e.target.value)} 
                  style={{ marginRight: "10px" }}
                />
              ) : (
                <span className="displaymsg">{dict.message}</span>
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
            value={newAnnouncement}  
            onChange={(e) => setNewAnnouncement(e.target.value)}  
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
      <h1 className="ANapihead">Train Service Alerts</h1>
      {messages.length === 0 ? (
        <p className="ANapimsg">All train services are running smoothly.</p>
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