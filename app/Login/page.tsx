"use client";
import React from "react";
import { Button} from "@nextui-org/react";
import { motion } from "framer-motion";

const page = () => {
  return (
    <motion.div
      className="w-full content-center items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center min-h-screen">
          <div className="hidden bg-cover lg:block lg:w-1/2">
            <img
              className="h-screen w-full"
              src="https://images.pexels.com/photos/5749155/pexels-photo-5749155.jpeg"
            ></img>
          </div>

          <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-1/2">
            <div className="w-full">
              <h1 className="text-4xl font-bold text-white">INICIAR SESIÓN</h1>

              {/* <p className="mt-4 text-gray-500 dark:text-gray-400">
                Let’s get you all set up so you can verify your personal account
                and begin setting up your profile.
              </p> */}

              <form className="">
                <div className="mt-6">
                  <h1 className="text-gray-500 dark:text-gray-300">
                    Correo Electrónico
                  </h1>
                  <input
                    type="email"
                    placeholder="Ingresa tu correo Electrónico"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="mt-6">
                  <h1 className="text-gray-500 dark:text-gray-300">
                    Contraseña
                  </h1>
                  <input
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <Button className="flex items-center  justify-center mt-4 text-white rounded-lg shadow-md bg-blue-500 hover:bg-blue-400 w-full h-13">
                  <h1 className="px-4 py-3 w-5/6 text-base text-center text-white font-bold">
                    Iniciar Sesión
                  </h1>
                </Button>
                <Button className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md bg-gray-100  w-full h-13">
                  <div className="px-4 py-3">
                    <svg className="h-6 w-6" viewBox="0 0 40 40">
                      <path
                        d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                        fill="#FFC107"
                      />
                      <path
                        d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                        fill="#FF3D00"
                      />
                      <path
                        d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                        fill="#4CAF50"
                      />
                      <path
                        d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                        fill="#1976D2"
                      />
                    </svg>
                  </div>
                  <h1 className="px-4 py-3 w-5/6 text-base text-center text-gray-600 font-bold">
                    Iniciar Sesión con Google
                  </h1>
                </Button>
                <div className="mt-2 justify-end">
                  <a className="font-bold text-blue-500  hover:underline hover:p-2 cursor-pointer">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default page;
