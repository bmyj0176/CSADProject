import React, { useEffect, useState } from "react";
import apiClient from "../api_announcements/apiClient";
import BouncyBouncy from './Components/LoadingIcon.js';
import { TrainAlertsService } from "../api_caller.js";
import "./stylesheets/announcements.css";

const Announcements  = ({ isAdmin }) => {
  const [alerts, setAlerts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  isAdmin = (true);

  useEffect(() => {
    const fetchTrainAlerts = async () => {
      try {
        const response = await TrainAlertsService();
        console.log(response);
        setAlerts(response.data);
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
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  
  return (
    <>
      <h1 id="ANheader">NYOOM SITE ANNOUNCEMENTS</h1>
      <div className="ANpanel">
        <ul>
          {announcements.map((text, index) => (
            <li key={index}>
              {isAdmin ? (
                <input
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
      {alerts?.Status === 1 ? (
        <p style={{ color: "green" }}>All train services are running smoothly.</p>
      ) : (
        <div>
          <h2>Alerts:</h2>
          {alerts?.AffectedSegments.length > 0 ? (
            <ul>
              {alerts.AffectedSegments.map((segment, index) => (
                <li key={index}>
                  <strong>Line:</strong> {segment.Line} <br />
                  <strong>Direction:</strong> {segment.Direction} <br />
                  <strong>Status:</strong> {segment.Status}
                </li>
              ))}
            </ul>
          ) : (
            <p>No specific affected segments.</p>
          )}

          {alerts?.Message.length > 0 && (
            <div>
              <h3>Messages:</h3>
              <ul>
                {alerts.Message.map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Announcements;