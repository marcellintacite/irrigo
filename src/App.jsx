import React, { useState, useEffect } from "react";
import axios from "axios";

const BlynkControlApp = () => {
  const [pinValue, setPinValue] = useState(0);
  const [temperature, setTemperature] = useState(null);
  const [hardwareStatus, setHardwareStatus] = useState("Unknown"); // State for hardware connection status
  const [historyData, setHistoryData] = useState([]); // State for storing history data

  // Auth token from Blynk
  const authToken = "VjgDnrEE5_mALkdCPMkPSQhUpn-mh3Ug";

  // Function to toggle the pin (turn ON/OFF the device)
  const togglePin = (value) => {
    setPinValue(value);
    axios
      .get(
        `https://blynk.cloud/external/api/update?token=${authToken}&V0=${value}`
      )
      .then((response) => {
        console.log("Pin updated", response);
      })
      .catch((error) => {
        console.error("Error updating pin", error);
      });
  };

  // Function to fetch temperature data from Blynk
  const fetchTemperature = () => {
    axios
      .get(`https://blynk.cloud/external/api/get?token=${authToken}&V2`)
      .then((response) => {
        setTemperature(response.data);
        console.log("Temperature:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching temperature", error);
      });
  };

  // Function to check hardware connection status
  const checkHardwareStatus = () => {
    axios
      .get(
        `https://blynk.cloud/external/api/isHardwareConnected?token=${authToken}`
      )
      .then((response) => {
        const status = response.data ? "Connected" : "Disconnected";
        setHardwareStatus(status);
        console.log("Hardware status:", status);
      })
      .catch((error) => {
        console.error("Error fetching hardware status", error);
      });
  };

  // Function to fetch historical data
  const fetchHistoryData = () => {
    const period = "1h"; // Example period (e.g., "1h" for 1 hour)
    const granularityType = "minute"; // Example granularity (minute-level data)
    const sourceType = "virtual"; // Source type for virtual pin
    const tzName = "UTC"; // Timezone
    const format = "json"; // Desired format (json or file)
    const pin = "V2"; // Pin for temperature data

    axios
      .get(
        `https://blynk.cloud/external/api/data/get?token=${authToken}&period=${period}&granularityType=${granularityType}&sourceType=${sourceType}&tzName=${tzName}&format=${format}&pin=${pin}`
      )
      .then((response) => {
        setHistoryData(response.data);
        console.log("History data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching history data", error);
      });
  };

  // Fetch temperature and check hardware status when the component mounts
  useEffect(() => {
    fetchTemperature();
    checkHardwareStatus();
    fetchHistoryData();
    const interval = setInterval(() => {
      fetchTemperature();
      checkHardwareStatus();
    }, 5000); // Fetch every 5 seconds
    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Blynk Control App</h1>

      <div style={styles.statusContainer}>
        <h2>Hardware Status: {hardwareStatus}</h2>
      </div>

      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => togglePin(1)}>
          Turn ON
        </button>
        <button style={styles.button} onClick={() => togglePin(0)}>
          Turn OFF
        </button>
      </div>

      <div style={styles.temperatureContainer}>
        <h2>Current Temperature</h2>
        {temperature !== null ? (
          <p style={styles.temperature}>{temperature}°C</p>
        ) : (
          <p>Loading temperature...</p>
        )}
      </div>

      <div style={styles.historyContainer}>
        <h2>Temperature History</h2>
        <BlynkHistoryApp historyData={historyData} />
      </div>
    </div>
  );
};

// Component to display the historical data
const BlynkHistoryApp = ({ historyData }) => {
  return (
    <div>
      {historyData.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((entry, index) => (
              <tr key={index}>
                <td>{new Date(entry[0] * 1000).toLocaleString()}</td>
                <td>{entry[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No history data available</p>
      )}
    </div>
  );
};

// Simple CSS in JS for styling
const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  statusContainer: {
    marginBottom: "20px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "30px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
  temperatureContainer: {
    marginTop: "30px",
  },
  temperature: {
    fontSize: "36px",
    fontWeight: "bold",
  },
  historyContainer: {
    marginTop: "30px",
  },
  table: {
    margin: "0 auto",
    borderCollapse: "collapse",
    width: "80%",
  },
  th: {
    borderBottom: "1px solid black",
    padding: "8px",
  },
  td: {
    borderBottom: "1px solid black",
    padding: "8px",
  },
};

export default BlynkControlApp;
