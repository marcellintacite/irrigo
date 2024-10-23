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
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";

const Visualiser = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [chartType, setChartType] = useState("line");

  const formatTime = (milliseconds) => {
    const date = new Date(milliseconds * 1000);
    const localDate = date.toLocaleString();
    return `${localDate}`;
  };

  const calculateMean = () => {
    if (data.length === 0) return 0;
    const totalMoisture = data.reduce((sum, point) => sum + point.moisture, 0);
    return (totalMoisture / data.length).toFixed(2); // Format to 2 decimal places
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const parsedData = result.data.map((row) => ({
          time: parseInt(row.Time.trim(), 10),
          moisture: parseFloat(row["Moisture "].trim()),
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

  const renderChart = () => {
    // Reverse the data order to show past data first
    const sortedData = [...data].reverse();
  
    switch (chartType) {
      case "line":
        return (
          <LineChart data={sortedData}>
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
              formatter={(value, name) => [`${value} %`, name]}
              labelFormatter={(label) => `Date: ${formatTime(label)}`} // Format date when hovering
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="moisture"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        );
      case "bar":
        return (
          <BarChart data={sortedData}>
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
              formatter={(value) => [`${value} %`]}
              labelFormatter={(label) => `Date: ${formatTime(label)}`} // Format date when hovering
            />
            <Legend />
            <Bar dataKey="moisture" fill="#8884d8" />
          </BarChart>
        );
      case "area":
        return (
          <AreaChart data={sortedData}>
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
              formatter={(value) => [`${value} %`]}
              labelFormatter={(label) => `Date: ${formatTime(label)}`} // Format date when hovering
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="moisture"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        );
      default:
        return null;
    }
  };
  
  

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Visualisation des Données de Humidité du Sol</h1>

{
  !data.length > 0 && 
      <div
        {...getRootProps()}
        className="dropzone flex flex-col items-center justify-center border-dashed border-2 border-gray-400 rounded-lg p-8 mb-4 cursor-pointer transition duration-200 hover:bg-gray-100"
      >
        <input {...getInputProps()} />
        <p className="text-center">
          Veuillez déposer ou importer un fichier CSV contenant les données que vous voulez afficher.
          <br />
          <small className="text-gray-600">
            Tips: Pour avoir les données historiques, rendez-vous dans le menu historique et téléchargez la partie.
          </small>
        </p>
      </div>
}

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <select
        className="mb-4 p-2 border border-gray-400 rounded"
        value={chartType}
        onChange={(e) => setChartType(e.target.value)}
      >
        <option value="line">Graphique linéaire</option>
        <option value="bar">Graphique à barres</option>
        <option value="area">Graphiques en surface</option>
      </select>

      {data.length > 0 && (
        <div className="w-full h-96 mt-4">
          <ResponsiveContainer>
            {renderChart()}
          </ResponsiveContainer>
        </div>
      )}

{data.length > 0 && (
  <div
  className={`mt-4 p-4 border rounded-md ${
    calculateMean() < 30
      ? 'bg-red-200 border-red-500 text-red-800'
      : calculateMean() <= 50
      ? 'bg-blue-200 border-blue-500 text-blue-800'
      : calculateMean() <= 60
      ? 'bg-orange-200 border-orange-500 text-orange-800'
      : 'bg-green-200 border-green-500 text-green-800'
  }`}
>
  <p className="font-bold">
    Moyenne de l'humidité du sol pour cette période : <strong>{calculateMean()}%</strong>
  </p>
  <p>
    Conclusion: Une humidité moyenne de {calculateMean()}% indique que le sol est dans un état idéal pour la croissance des plantes. Cela signifie que les ressources en eau sont optimales, favorisant une bonne santé des cultures.
  </p>
</div>

)}

    </div>
  );
};

export default Visualiser;
