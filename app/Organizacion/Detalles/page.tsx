'use client'
import React from "react";
import { Button } from "@nextui-org/react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import GOOGLE_MAPS_API_KEY from "@/googleMapsConfig";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from "next/router";
import {organizations} from "@/prueba"; // Importa tus datos

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: -17.329855,
  lng: -66.224047,
};

interface DetallesProps {
  id: string | undefined;
};

export default function Detalles({ id }: DetallesProps) {

  

  // Busca el elemento en tus datos
  const item = organizations.find((item) => item.id === id);

  if (!item) {
    return <div>No se encontró el elemento con ID {id}</div>;
  }

  const parsedLatitud = typeof item.latitude === 'string' ? parseFloat(item.latitude) : null;
  const parsedLongitud = typeof item.longitude === 'string' ? parseFloat(item.longitude) : null;

  return (
    <div className="bg-blanco min-h-screen text-black ">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-black text-2xl text-center font-bold mb-8 mt-5"> Visualizar Organización </h1>
        <div className=" p-5 border-1 shadow ">
            <div className="mb-5 mt-5">
            <strong>Nombre:</strong> {item.name}
          </div>
          <div className="mb-5">
            <strong>Gmail:</strong> {item.email}
          </div>
          <div className="mb-5">
            <strong>Nit:</strong> {item.nit}
          </div>
          <div className="mb-5">
            <label>Ubicación:</label>
            <div style={mapContainerStyle}>
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={{
                    lat: parsedLatitud || center.lat,
                    lng: parsedLongitud || center.lng,
                  }}
                  zoom={10}
                >
                  {parsedLatitud !== null && parsedLongitud !== null && (
                    <Marker position={{ lat: parsedLatitud, lng: parsedLongitud }} />
                  )}
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
}
