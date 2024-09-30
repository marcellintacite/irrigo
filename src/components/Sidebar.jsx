import { useClerk } from "@clerk/clerk-react";
import { History } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "./Button";

export default function Sidebar() {
  const activeStyle = "bg-primary-500  bg-opacity-80 text-white";
  const { pathname } = useLocation();
  const { signOut } = useClerk();
  console.log(pathname);

  return (
    <aside className="relative hidden md:flex flex-col h-full max-w-[20rem] bg-white bg-clip-border rounded-xl p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5">
      <nav
        className="flex min-w-[200px] flex-col justify-between h-[60vh]
       gap-1 p-2 font-sans text-base font-normal text-blue-gray-700"
      >
        {/* Dashboard link */}
        <div>
          <Link
            to="/dashboard"
            className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start ${
              pathname === "/dashboard"
                ? activeStyle
                : "hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900"
            }`}
          >
            <div className="grid mr-4 place-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            Tableau de bord
          </Link>

          {/* History link */}
          <Link
            to="/dashboard/history"
            className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start ${
              pathname === "/dashboard/history"
                ? activeStyle
                : "hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900"
            }`}
          >
            <div className="grid mr-4 place-items-center">
              <History className="w-5 h-5" />
            </div>
            Historique
          </Link>
        </div>

        {/* Logout link */}
        <Button
          onClick={() =>
            signOut({
              redirectUrl: "/",
            })
          }
          className="flex items-center w-full p-3 leading-tight rounded-lg outline-none text-start  hover:bg-opacity-80  mt-4 bg-red-500 border  text-red-600 hover:bg-red-900 transition-all"
        >
          <div className="grid mr-4 place-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          Se déconnecter
        </Button>
      </nav>
    </aside>
  );
}
