'use client'
import React from "react";
import { Input, Checkbox, Button } from "@nextui-org/react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import GOOGLE_MAPS_API_KEY from "@/googleMapsConfig";

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const center = {
  lat: -17.329855,
  lng: -66.224047,
};

export default function App() {
  return (
    <div className="bg-blanco min-h-screen ">
      <div className="mx-auto max-w-5xl">
        <h1 className=" text-black text-2xl text-center font-bold mb-8 mt-5"> Crear Orgnizacion </h1>
        <form className=" p-5 border-1 shadow">
          <div className="mb-5 mt-5">
            
                <Input id="nombre" key="outside" type="text" label="Nombre"  />
          
          </div>
          <div className="mb-5">
            <Input id="correo" key="outside" type="gmail" label="Gmail" />
          </div>
          <div className="mb-5">
            <Input
              id="contrasena"
              key="outside"
              type="password"
              label="Contraseña"
            />
          </div>
          <div className="mb-5">
            <Input id="celular" key="outside" label="Celular" />
          </div>
          <div className="mb-5">
            <label>Ubicación:</label>
            <div style={mapContainerStyle}>
              <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={10}
                >
                  <Marker position={center} />
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
          <div className="mb-5">
            <Checkbox id="crearProductos" defaultSelected color="success">
              Success
            </Checkbox>
          </div>
          <div className="mb-5">
            <Input id="nit" key="outside" label="Nit" />
          </div>
          <Button type="submit" color="primary">
            Enviar
          </Button>
        </form>
      </div>
    </div>
  );
}
