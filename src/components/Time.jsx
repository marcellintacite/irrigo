import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Time() {
  const authToken = "VjgDnrEE5_mALkdCPMkPSQhUpn-mh3Ug";
  const [temperature, setTemperature] = useState(null);
  const [temperatureData, setTemperatureData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTemperature();
    }, 3000); // Fetch temperature every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const fetchTemperature = () => {
    axios
      .get(`https://blynk.cloud/external/api/get?token=${authToken}&V2`)
      .then((response) => {
        const newTemperature = response.data;
        setTemperature(newTemperature);

        // Add new temperature data point with the full time in French format
        setTemperatureData((prevData) => [
          ...prevData,
          {
            humidite: newTemperature,
            time: new Date().toLocaleString(),
          },
        ]);

        console.log("Temperature:", newTemperature);
      })
      .catch((error) => {
        console.error("Error fetching temperature", error);
      });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white p-2 shadow-md rounded">
          <p className="label">{`Heure: ${label}`}</p>
          <p className="intro">{`Humidité: ${payload[0].value}%`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-full p-5">
      <h3 className="text-lg font-bold mb-4">Température en temps réel</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={temperatureData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={[0, 100]} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="humidite"
            stroke="#8884d8"
            fill="#8884d8"
            activeDot={{ r: 8 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
