'use client'
import React from "react";
import { Button } from "@nextui-org/react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import GOOGLE_MAPS_API_KEY from "@/googleMapsConfig";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from "next/router";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: -17.329855,
  lng: -66.224047,
};

export default function Detalles() {
  const router = useRouter();
  const { id, latitud, longitud, nombre , correo , nit } = router.query; // Captura el ID, latitud y longitud de la URL

  const parsedLatitud = typeof latitud === 'string' ? parseFloat(latitud) : null;
  const parsedLongitud = typeof longitud === 'string' ? parseFloat(longitud) : null;

  console.log("ID:", id);
  console.log("Latitud:", latitud);
  console.log("Longitud:", longitud);
  console.log("Nombre:", nombre);
  console.log("Correo:", correo);
  console.log("Nit:", nit);

  return (
    <div className="bg-blanco min-h-screen text-black ">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-black text-2xl text-center font-bold mb-8 mt-5"> Visualizar Organización </h1>
        <div className=" p-5 border-1 shadow ">
            <div className="mb-5 mt-5">
            <strong>Nombre:</strong> {nombre}
          </div>
          <div className="mb-5">
            <strong>Gmail:</strong> {correo}
          </div>
          <div className="mb-5">
            <strong>Nit:</strong> {nit}
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
          <Button
            color="primary"
            onClick={() => router.push("/ListaDeOrganizaciones")} // Navegar de vuelta a la lista
          >
            Volver
          </Button>
        </div>
      </div>
    </div>
  );
}
