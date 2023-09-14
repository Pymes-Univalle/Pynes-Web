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
          

          <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-1/2">
            <div className="w-full">
              <h1 className="text-4xl font-bold text-white">¿Olvidaste tu contraseña?</h1>

               <p className="mt-4 text-gray-500 dark:text-gray-400">
                No te preocupes, ingresa tu correo Electrónicoy te enviaremos una nueva.
              </p> 

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
                

                <Button className="flex items-center  justify-center mt-4 text-white rounded-lg shadow-md bg-blue-500 hover:bg-blue-400 w-full h-13">
                  <h1 className="px-4 py-3 w-5/6 text-base text-center text-white font-bold">
                    Recuperar contraseña
                  </h1>
                </Button>
                
                <div className="mt-2 justify-end">
                  <a href="/Login/" className="font-bold text-blue-500  hover:underline hover:p-2 cursor-pointer">
                   ← Iniciar Sesión
                  </a>
                </div>
              </form>
            </div>
          </div>
          <div className="hidden bg-cover lg:block lg:w-1/2">
            <img
              className="h-screen w-full"
              alt="Imagen"
              src="https://images.pexels.com/photos/6205525/pexels-photo-6205525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            ></img>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default page;
