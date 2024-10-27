import React, { useState, useEffect } from "react";
import { Power, Thermometer, CheckCircle, XCircle } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify"; // Import react-toastify
import { useUser } from "@clerk/clerk-react";
// Import les styles de toastify

const imgs = {
  hot: "./hot.jpg",
  cold: "./cold.jpg",
  mild: "./default.jpg",
  default: "./default.jpg",
};

const Dashboard = () => {
  const [pinValue, setPinValue] = useState(0);
  const [temperature, setTemperature] = useState(null); // Now represents moisture percentage
  const [hardwareStatus, setHardwareStatus] = useState("Unknown");
  const [motorStatus, setMotorStatus] = useState("Éteint"); // État du moteur
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      toast("Bienvenue sur le tableau de bord", { position: "top-right" });
    } else {
      window.location.href = "/";
    }
  });

  const authToken = "VjgDnrEE5_mALkdCPMkPSQhUpn-mh3Ug";

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
        notify(`Moteur ${newMotorStatus}`); // Notification lorsque le moteur est allumé/éteint
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
        setTemperature(response.data);
        console.log("Temperature:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching temperature", error);
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

  useEffect(() => {
    notify("Chargement du tableau de bord..."); // Notification de chargement
    fetchTemperature();
    checkHardwareStatus();
    const interval = setInterval(() => {
      fetchTemperature();
      checkHardwareStatus();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Function to get the background image based on the temperature
  const getBackgroundImage = () => {
    if (temperature >= 30) {
      return imgs.hot;
    } else if (temperature <= 15) {
      return imgs.cold;
    } else if (temperature > 15 && temperature < 30) {
      return imgs.mild;
    }
    return imgs.default;
  };

  // Function to get soil moisture message based on temperature percentage
  const getSoilMoistureMessage = (temp) => {
    if (temp >= 0 && temp < 20) {
      return "Sol très sec";
    } else if (temp >= 20 && temp < 40) {
      return "Sol sec";
    } else if (temp >= 40 && temp < 60) {
      return "Sol modérément humide";
    } else if (temp >= 60 && temp < 80) {
      return "Sol humide";
    } else if (temp >= 80 && temp <= 100) {
      return "Sol très humide";
    } else {
      return "Valeur non valide"; // Handle invalid temperature values
    }
  };

  return (
    <div
      className="relative h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${getBackgroundImage()})`,
      }}
    >
      {/* Dark overlay with blur */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg"></div>

      {/* Content overlay */}
      <div className="relative z-10 text-center p-10 bg-black bg-opacity-60 rounded-lg">
        {/* Température dans un style écran LED */}
        <div className="mb-6">
          <h2 className="text-white text-2xl mb-4">Humidité actuelle</h2>
          <div className="flex items-center justify-center bg-gray-800 text-yellow-300 text-6xl font-bold rounded-lg py-4 px-8">
            <Thermometer className="w-8 h-8 mr-2 text-yellow-300" />
            {temperature !== null ? (
              <p>
                {temperature} % - {getSoilMoistureMessage(temperature)}
              </p>
            ) : (
              <p className="text-white">Chargement...</p>
            )}
          </div>
        </div>

        {/* État du matériel avec point vert et icône */}
        <div className="mb-6">
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

        {/* État du moteur */}
        <div className="mb-6">
          <h2 className="text-white text-2xl mb-4">
            État du moteur : {motorStatus}
          </h2>
        </div>

        {/* Contrôler le moteur */}
        <div className="flex space-x-4 justify-center mb-6">
          <button
            className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 "
            onClick={() => togglePin(1)}
            disabled={
              motorStatus === "Allumé" || hardwareStatus === "Disconnected"
            }
          >
            <Power className="w-5 h-5 mr-2" />
            Allumer
          </button>
          <button
            className="flex items-center px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 "
            onClick={() => togglePin(0)}
            disabled={
              motorStatus === "Éteint" || hardwareStatus === "Disconnected"
            }
          >
            <Power className="w-5 h-5 mr-2" />
            Éteindre
          </button>
        </div>

        {/* Bouton supplémentaire pour contrôler le moteur */}
        <div className="flex items-center justify-center space-x-2">
          <Power className="w-6 h-6 text-white" />
          <h2 className="text-white text-xl">Contrôler le moteur</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
