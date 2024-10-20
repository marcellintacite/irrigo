import React, { useState } from "react";
import PlantCard from "../components/PlantCard";
import PlantDetails from "../components/PlantsDetails";

const Plantes = () => {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const mockPlantsData = [
    {
      id: 1,
      name: "Tomatier",
      description:
        "Le tomatier est une plante qui nécessite beaucoup de soleil et un arrosage régulier.",
      imageUrl: "/tomate.jpg",
      waterInstructions:
        "Arrosez profondément 2-3 fois par semaine, évitez l’arrosage des feuilles pour prévenir les maladies.",
      humidity: "60-70%",
      sunlight: "6-8 heures de lumière directe par jour",
    },
    {
      id: 2,
      name: "Carottier",
      description:
        "Le carottier préfère un sol meuble et bien drainé, avec des arrosages modérés.",
      imageUrl: "/carottes.jpg",
      waterInstructions:
        "Arrosez légèrement tous les jours ou tous les 2 jours, selon l’humidité du sol.",
      humidity: "55-65%",
      sunlight: "Plein soleil à mi-ombre",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row p-6 space-y-6 md:space-y-0 md:space-x-6">
      {/* Section gauche pour les cartes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockPlantsData.map((plant) => (
          <PlantCard key={plant.id} plant={plant} onSelect={setSelectedPlant} />
        ))}
      </div>

      {/* Section droite pour afficher les détails */}
      <div className="md:w-1/3">
        <PlantDetails plant={selectedPlant} />
      </div>
    </div>
  );
};

export default Plantes;
