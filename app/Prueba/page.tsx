'use client'
import React from "react";
import { Input } from "@nextui-org/react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function App() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
    <Input
      label="Contraseña"
      type={isVisible ? "text" : "password"}
      endContent={
        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <FaEye className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
    />
    
    </>
    

    
  );
}
