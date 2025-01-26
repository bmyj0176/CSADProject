import React, { useEffect, useState } from "react";
import apiClient from "../api_announcements/apiClient";

const TrainAlerts = () => {
  const [alerts, setAlerts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrainAlerts = async () => {
      try {
        const response = await apiClient.get("TrainServiceAlerts");
        setAlerts(response.data.value);
      } catch (error) {
        setError("Failed to fetch train alerts. Please try again later.");
        console.error("API error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainAlerts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
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
    </div>
  );
};

export default TrainAlerts;