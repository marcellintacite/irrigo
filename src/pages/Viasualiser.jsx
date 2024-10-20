import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Visualiser = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const formatTime = (milliseconds) => {
    const date = new Date(milliseconds);
    return `${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const parsedData = result.data.map((row) => ({
          time: parseInt(row.Time.trim(), 10), // Trim spaces and convert Time to integer
          moisture: parseFloat(row["Moisture "].trim()), // Trim spaces and convert Moisture to float
        }));
        setData(parsedData);
      },
      error: (err) => setError("Error parsing CSV file. Please try again."),
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".csv",
  });

  return (
    <div className="p-6">
      <div
        {...getRootProps()}
        className="dropzone flex flex-col items-center justify-center border-dashed border-2 border-gray-400 rounded-lg p-8 mb-4 cursor-pointer transition duration-200 hover:bg-gray-100"
      >
        <input {...getInputProps()} />
        <p className="text-center">
          Veuillez déposer ou importer un fichier CSV contenant les données que
          vous voulez afficher.
          <br />
          <small className="text-gray-600">
            Tips: Pour avoir les données historiques, rendez-vous dans le menu
            historique et téléchargez la partie.
          </small>
        </p>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {data.length > 0 && (
        <div className="w-full h-96 mt-4">
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                tickFormatter={formatTime}
                label={{
                  value: "Time",
                  position: "insideBottomRight",
                  offset: 0,
                  className: "text-sm font-semibold",
                }}
              />
              <YAxis
                label={{
                  value: "Moisture (%)",
                  angle: -90,
                  position: "insideLeft",
                  className: "text-sm font-semibold",
                }}
              />
              <Tooltip
                formatter={(value, name) => [`${value}`, name]}
                labelFormatter={(label) => `Time: ${formatTime(label)}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="moisture"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Visualiser;
