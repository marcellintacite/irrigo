import React from "react";
import { motion } from "framer-motion"; // Si tu veux des animations douces
import Navbar from "../components/Navbar";

export default function Apropos() {
  return (
    <div className="lg:mx-11 mx-0">
      <Navbar />
      <div className="bg-white min-h-screen flex flex-col items-center py-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-8">
          À propos de <span className="text-primary-500">Irrigo</span>
        </h1>

        {/* Section principale */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 px-4">
          {/* Texte principal */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <h2 className="text-3xl text-gray-700 mb-4">
              Arrosage Automatique Intelligent
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              <span className="text-primary-600 font-semibold">Irrigo</span> est
              une application moderne qui facilite l'arrosage automatique et à
              distance de vos jardins et espaces verts. Avec des fonctionnalités
              avancées comme la surveillance en temps réel de l'humidité du sol,
              et la possibilité de contrôler le moteur d'irrigation où que vous
              soyez, Irrigo est conçu pour simplifier l'entretien de vos plantes
              tout en optimisant la consommation d'eau.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Utilisant la technologie IoT avec{" "}
              <span className="text-primary-600  font-semibold">Blynk</span>,
              nous vous offrons une solution complète pour améliorer la gestion
              de l'irrigation. L'application vous permet de surveiller votre
              jardin, d'ajuster l'arrosage automatiquement en fonction des
              conditions du sol et de consulter l'historique de vos activités.
            </p>
          </motion.div>

          {/* Image d'illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <img
              src="./irrigo.jpg"
              alt="Arrosage automatique"
              className="rounded-xl shadow-lg w-full h-auto object-cover"
            />
          </motion.div>
        </div>

        {/* Section fonctionnalités */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-12 px-4 mt-16">
          {/* Image d'illustration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <img
              src={"./tech.png"}
              alt="Contrôle du moteur"
              className="rounded-xl shadow-lg w-full h-auto object-cover"
            />
          </motion.div>

          {/* Texte sur les fonctionnalités */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <h2 className="text-3xl text-gray-700 mb-4">
              Pourquoi choisir Irrigo ?
            </h2>
            <ul className="text-lg text-gray-600 list-disc list-inside leading-relaxed">
              <li className="mb-2">
                <span className="text-primary-600  font-semibold">
                  Contrôle à distance
                </span>{" "}
                : Gérez votre système d'irrigation depuis n'importe où, à tout
                moment.
              </li>
              <li className="mb-2">
                <span className="text-primary-600  font-semibold">
                  Surveillance en temps réel
                </span>{" "}
                : Visualisez l'humidité du sol et ajustez l'arrosage en fonction
                des conditions actuelles.
              </li>
              <li className="mb-2">
                <span className="text-primary-600  font-semibold">
                  Gestion efficace de l'eau
                </span>{" "}
                : Optimisez l'utilisation de l'eau en arrosant uniquement
                lorsque nécessaire.
              </li>
              <li className="mb-2">
                <span className="text-primary-600  font-semibold">
                  Historique complet
                </span>{" "}
                : Consultez l'historique des actions du moteur et ajustez vos
                cycles d'arrosage en conséquence.
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Appel à l'action */}
      </div>
    </div>
  );
}
