import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import * as React from "react";

import { createBrowserRouter, Outlet } from "react-router-dom";
import Accueil from "./components/Accueil";
import Dashboard from "./Dashboard";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import TemperatureHistory from "./Hostory";
import Apropos from "./pages/Apropos";
import Visualiser from "./pages/Graphique";
import Plantes from "./pages/Plantes";
import { PlantesId } from "./components/PlanteId";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Accueil />,
  },
  {
    path: "/a-propos",
    element: <Apropos />,
  },
  {
    path: "dashboard",
    element: (
      <div className="h-screen w-full">
        <Navbar />
        <div className="flex relative flex-1 h-full overflow-y-auto pt-1">
          <Sidebar />
          <div className="flex-1 h-full ">
            <Outlet />
          </div>
        </div>
      </div>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "graphique",
        element: <Visualiser />,
      },
      {
        path: "plantes",
        element: <Plantes />,
      },
      {
        path:"plantes/:id",
        element: <PlantesId/>
      },
      {
        path: "history",
        element: <TemperatureHistory />,
      },
    ],
  },
]);
