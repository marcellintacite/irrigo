import React, { useEffect, useState } from "react";
import { Thermometer, ArrowUp, ArrowDown } from "lucide-react";
import axios from "axios";

export default function TemperatureHistory() {
  const authToken = "VjgDnrEE5_mALkdCPMkPSQhUpn-mh3Ug";
  const fetchHistoryData = () => {
    const period = "week"; // Example period (e.g., "1h" for 1 hour)
    const granularityType = "minute"; // Example granularity (minute-level data)
    const sourceType = "AVG"; // Source type for virtual pin
    const tzName = "UTC"; // Timezone

    const pin = "V2"; // Pin for temperature data

    axios
      .get(
        `https://blynk.cloud/external/api/data/get?token=${authToken}&period=${period}&granularityType=${granularityType}&sourceType=${sourceType}&tzName=${tzName}&pin=${pin}`
      )
      .then((response) => {
        // the response send a link
        console.log("History data:", response.data);
        const link = response.data;
        // open link in new tab
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
