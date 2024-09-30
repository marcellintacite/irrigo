import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import Button from "./Button";
import Drawer from "react-modern-drawer";

//import styles 👇
import "react-modern-drawer/dist/index.css";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { isSignedIn, user, isLoaded } = useUser();
  const { pathname } = useLocation();

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <div class="px-4 py-4 mx-auto sm:max-w-xl md:max-w-full md:px-24 lg:px-8 shadow">
      <div class="relative flex items-center justify-between">
        <a
          href="/"
          aria-label="Company"
          title="Company"
          class="inline-flex items-center"
        >
          <img src="./logo.png" alt="irrigo" className="w-12 h-10" />

          <span class="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
            Irrigo
          </span>
        </a>
        <ul class=" items-center hidden space-x-8 lg:flex">
          <li>
            <a
              href="/"
              aria-label="Our product"
              title="Our product"
              class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
            >
              Fonctionalités
            </a>
          </li>

          <li>
            <a
              href="/"
              aria-label="About us"
              title="About us"
              class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
            >
              A propos
            </a>
          </li>
          <li>
            {user ? (
              <UserButton />
            ) : (
              <SignInButton>
                <Button>Connexion</Button>
              </SignInButton>
            )}
          </li>
        </ul>
        {/* <!-- Mobile menu --> */}
        <div class="lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            class="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={() => setOpen(!open)}
          >
            <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
              ></path>
              <path
                fill="currentColor"
                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
              ></path>
              <path
                fill="currentColor"
                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
              ></path>
            </svg>
          </button>

          <Drawer
            open={open}
            onClose={toggleDrawer}
            direction="right"
            className="bla bla bla"
          >
            <div>
              <div class="p-5 bg-white border rounded shadow-sm">
                <div class="flex items-center justify-between mb-4">
                  <div></div>
                  <div>
                    <button
                      aria-label="Close Menu"
                      onClick={() => setOpen(false)}
                      title="Close Menu"
                      class="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                    >
                      <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <nav>
                  <ul class="space-y-4 flex flex-col gap-3">
                    {user && (
                      <>
                        <li className="border-b-2 py-2">
                          <Link
                            to={"/dashboard"}
                            aria-label="Tableau de bord"
                            class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            Tableau de bord
                          </Link>
                        </li>
                        <li className="border-b-2 py-2">
                          <Link
                            to={"/dashboard/history"}
                            aria-label="Tableau de bord"
                            class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                          >
                            Historique
                          </Link>
                        </li>
                      </>
                    )}
                    <li className="border-b-2 py-2">
                      <a
                        href="/"
                        aria-label="Our product"
                        title="Our product"
                        class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Accueil
                      </a>
                    </li>

                    <li className="border-b-2 py-2">
                      <a
                        href="/"
                        aria-label="About us"
                        title="About us"
                        class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        A propos
                      </a>
                    </li>

                    <li>
                      {user ? (
                        <UserButton />
                      ) : (
                        <SignInButton>
                          <Button>Connexion</Button>
                        </SignInButton>
                      )}
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    </div>
  );
}
