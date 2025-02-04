import React, { useEffect, useState } from "react";
import apiClient from "../api_announcements/apiClient";
import BouncyBouncy from './Components/LoadingIcon.js';
import { TrainAlertsService } from "../api_caller.js";
import "./stylesheets/announcements.css";

const Announcements  = ({ isAdmin }) => {
  const [alerts, setAlerts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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






  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState("");

  














  if (loading) return <BouncyBouncy/>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  
  return (
    <>
      <h1 id="ANheader">NYOOM SITE ANNOUNCEMENTS</h1>
      <div className="ANpanel">
        test
      </div>
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