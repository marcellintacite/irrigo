import React from "react";

const PlantDetails = ({ plant }) => {
  if (!plant) {
    return (
      <div className="text-gray-500 mt-2">
        Sélectionnez une plante pour voir les détails
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6  ">
      <div className="bg-white shadow-lg rounded-lg p-6  ">
        <h2 className="text-2xl font-semibold mb-4">{plant.name}</h2>
        <p className="mb-2 text-gray-700">{plant.description}</p>
        <p>
          <span className="font-semibold">Instructions d'arrosage :</span>{" "}
          {plant.waterInstructions}
        </p>
        <p>
          <span className="font-semibold">Humidité requise :</span>{" "}
          {plant.humidity}
        </p>
        <p>
          <span className="font-semibold">Exposition au soleil :</span>{" "}
          {plant.sunlight}
        </p>
      </div>
    </div>
  );
};

export default PlantDetails;
