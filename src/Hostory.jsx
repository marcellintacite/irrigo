import React from "react";
import { Thermometer, ArrowUp, ArrowDown } from "lucide-react";

const temperatureData = [
  {
    id: 1,
    temperature: "22°C",
    status: "increasing",
    timestamp: "2024-09-27 8:00 AM",
  },
  {
    id: 2,
    temperature: "25°C",
    status: "increasing",
    timestamp: "2024-09-27 10:00 AM",
  },
  {
    id: 3,
    temperature: "27°C",
    status: "decreasing",
    timestamp: "2024-09-27 12:00 PM",
  },
  {
    id: 4,
    temperature: "24°C",
    status: "decreasing",
    timestamp: "2024-09-27 2:00 PM",
  },
];

export default function TemperatureHistory() {
  return (
    <div className="max-w-4xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-blue-gray-900 mb-6">
        Historique des températures
      </h1>

      <ul className="space-y-4">
        {temperatureData.map((item) => (
          <li
            key={item.id}
            className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm"
          >
            <div className="flex-shrink-0">
              <Thermometer className="w-6 h-6 text-blue-500" />
            </div>
            <div className="flex-1">
              <p className="text-lg font-medium text-blue-gray-800">
                {item.temperature}
              </p>
              <p className="text-sm text-gray-500">{item.timestamp}</p>
            </div>
            <div className="flex-shrink-0">
              {item.status === "increasing" ? (
                <ArrowUp className="w-6 h-6 text-green-500" />
              ) : (
                <ArrowDown className="w-6 h-6 text-red-500" />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
