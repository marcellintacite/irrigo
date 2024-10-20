import React from "react";

const PlantCard = ({ plant, onSelect }) => {
  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
      onClick={() => onSelect(plant)}
    >
      <img
        src={plant.imageUrl}
        alt={plant.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{plant.name}</h3>
        <p className="text-gray-600">{plant.description}</p>
      </div>
    </div>
  );
};

export default PlantCard;
