import React, { useState } from "react";
import axios from "axios";

export default function TemperatureHistory() {
  const [period, setPeriod] = useState("DAY"); // State for selected period
  const authToken = "VjgDnrEE5_mALkdCPMkPSQhUpn-mh3Ug";
  
  const fetchHistoryData = () => {
    const granularityType = "minute"; // Example granularity (minute-level data)
    const sourceType = "AVG"; // Source type for virtual pin
    const tzName = "UTC"; // Timezone
    const pin = "V2"; // Pin for temperature data

    axios
      .get(
        `https://blynk.cloud/external/api/data/get?token=${authToken}&period=${period}&granularityType=${granularityType}&sourceType=${sourceType}&tzName=${tzName}&pin=${pin}`
      )
      .then((response) => {
        // the response sends a link
        console.log("History data:", response.data);
        const link = response.data;
        // open link in a new tab
        window.open(link.link, "_blank");
      })
      .catch((error) => {
        console.error("Error fetching history data", error);
      });
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-blue-gray-900 mb-6">
        Historique des températures
      </h1>

      {/* Dropdown for selecting the period */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Sélectionnez la période :
        </label>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="border rounded-md p-2 w-full"
        >
          <option value="HOUR">Heure</option>
          <option value="DAY">Jour</option>
          <option value="WEEK">Semaine</option>
          {/* <option value="THREE_MONTHS">Trimestre</option> */}
        </select>
      </div>

      <div className="h-[50vh] bg-white rounded-md flex justify-center items-center">
        <button
          className="
            bg-primary-600
            hover:bg-primary-700
            text-white
            font-bold
            py-2
            px-4
            rounded
          "
          onClick={fetchHistoryData}
        >
          Télécharger l'historique
        </button>
      </div>
    </div>
  );
}
