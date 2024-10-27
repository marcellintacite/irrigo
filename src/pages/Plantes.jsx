import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import PlantCard from "../components/PlantCard";
import { CheckCircle, XCircle } from "lucide-react";

export const mockPlantsData = [
  {
    id: 1,
    name: "Tomate",
    description:
      "La tomate appelée tomatier est une plante qui nécessite beaucoup de soleil et un arrosage régulier.",
    imageUrl: "/tomate.jpg",
    waterInstructions:
      "Arrosez profondément 2-3 fois par semaine, évitez l’arrosage des feuilles pour prévenir les maladies.",
    humidity: "60-70%",
    sunlight: "6-8 heures de lumière directe par jour",
  },
  {
    id: 2,
    name: "Carotte",
    description:
      "La carotte préfère un sol meuble et bien drainé, avec des arrosages modérés.",
    imageUrl: "/carottes.jpg",
    waterInstructions:
      "Arrosez légèrement tous les jours ou tous les 2 jours, selon l’humidité du sol.",
    humidity: "55-65%",
    sunlight: "Plein soleil à mi-ombre",
  },
];

const authToken = "VjgDnrEE5_mALkdCPMkPSQhUpn-mh3Ug";

const Plantes = () => {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [motorStatus, setMotorStatus] = useState("Éteint");
  const [pinValue, setPinValue] = useState(0);
  const [temperature, setTemperature] = useState(null);
  const [temperatureData, setTemperatureData] = useState([]);
  const [lcdMessage, setLcdMessage] = useState("En cours...");
  const [hardwareStatus, setHardwareStatus] = useState("Unknown");

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTemperature();
      checkHardwareStatus();
    }, 3000); // Fetch temperature every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const notify = (message) => {
    toast(message, { position: "top-right" });
  };

  const togglePin = (value) => {
    setPinValue(value);
    axios
      .get(
        `https://blynk.cloud/external/api/update?token=${authToken}&V0=${value}`
      )
      .then((response) => {
        const newMotorStatus = value === 1 ? "Allumé" : "Éteint";
        setMotorStatus(newMotorStatus);
        notify(`Moteur ${newMotorStatus}`);
        console.log("Pin updated", response);
      })
      .catch((error) => {
        console.error("Error updating pin", error);
        notify("Erreur lors de la mise à jour du moteur");
      });
  };

  const fetchTemperature = () => {
    axios
      .get(`https://blynk.cloud/external/api/get?token=${authToken}&V2`)
      .then((response) => {
        const newTemperature = response.data;
        setTemperature(newTemperature);

        // Add new temperature data point with current time
        setTemperatureData((prevData) => [
          ...prevData,
          { temperature: newTemperature, time: new Date().toLocaleTimeString() },
        ]);

        // Update the LCD message
        setLcdMessage(`Humidité: ${newTemperature}%`);
        console.log("Temperature:", newTemperature);
      })
      .catch((error) => {
        console.error("Error fetching temperature", error);
        setLcdMessage("Erreur de lecture");
      });
  };

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

  const handleCardClick = (plant) => {
    setSelectedPlant(plant);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPlant(null);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col p-6 space-y-6 md:space-y-0 md:space-x-6 gap-8 transition-all">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockPlantsData.map((plant) => (
          <PlantCard key={plant.id} plant={plant} onSelect={handleCardClick} />
        ))}
      </div>

      {selectedPlant && (
        <div className="bg-white rounded-lg p-6 shadow-lg w-full flex flex-wrap gap-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4">{selectedPlant.name}</h2>
            <p className="mb-4">{selectedPlant.description}</p>
            <p className="mb-4">{selectedPlant.waterInstructions}</p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded"
                  onClick={() => togglePin(1)}
                >
                  Allumer
                </button>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded"
                  onClick={() => togglePin(0)}
                >
                  Fermer
                </button>
                <span className="ml-2">Moteur {motorStatus}</span>

                <div className="mb-6 mt-5">
         
        </div>
              </div>
              <div className="mt-4 bg-gray-900 text-white p-4 rounded-md text-center">
                <h3 className="text-lg">Écran LCD</h3>
                <p>{lcdMessage}</p>
                <h2 className="text-white text-2xl mb-4 flex items-center justify-center space-x-2">
            {hardwareStatus === "Connected" ? (
              <>
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span>État du matériel : Connecté</span>
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6 text-red-500" />
                <span>État du matériel : Déconnecté</span>
              </>
            )}
          </h2>
              </div>
            </div>
            <button
              className="mt-6 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded w-full"
              onClick={closeModal}
            >
              Close
            </button>
          </div>

          {/* Temperature Area Chart */}
          <div className="flex-1 ml-8">
            <h3 className="text-lg font-bold mb-4">Humidité en temps réel</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="temperature"
                  stroke="#8884d8"
                  fill="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plantes;
