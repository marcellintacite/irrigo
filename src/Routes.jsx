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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Accueil />,
  },
  {
    path: "dashboard",
    element: (
      <div className="h-screen w-full">
        <Navbar />
        <div className="flex relative flex-1 h-full overflow-y-auto pt-1">
          <Sidebar />
          <div className="flex-1 h-full">
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
        path: "history",
        element: <TemperatureHistory />,
      },
    ],
  },
]);
