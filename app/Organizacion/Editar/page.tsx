'use client'
import React, { useEffect, useState } from "react";
import { Input, Checkbox, Button } from "@nextui-org/react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import GOOGLE_MAPS_API_KEY from "@/googleMapsConfig";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useSearchParams } from "next/navigation";
import { organizations } from "@/prueba";
import { text } from "node:stream/consumers";



const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: -17.329855,
  lng: -66.224047,
};

interface User {
  nombre: string;
  correo: string;
  contrasena: string;
  celular: string;
  estado: number;
  fechaActualizacion: Date;
}

interface Organization {
  latitud: number;
  longitud: number;
  nit: string;
  crearProductos: number;
}

export default function Editar() {

  const [crearProductos, setCrearProductos] = React.useState(false);

  const axios = require('axios');

  const [organization, setOrganization] = useState(null);
  const valor = useSearchParams();
  const id = valor.get('id');
  const handleCrearProductosChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCrearProductos(event.target.checked);
  };

  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [markers, setMarkers] = React.useState<google.maps.LatLngLiteral[]>([]);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
        const newMarker = event.latLng.toJSON();
        setMarkers([newMarker]);
       
    }
  };

 
  
  
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/organizacion/${id}`);
        if (response.status === 200) {
          const data = await response.data;
          const organizacionData = await data.organizacion;
          setOrganization(organizacionData);
          

        } else {
          console.error("Error al obtener la organización");
        }
      } catch (error) {
        console.error("Error al obtener la organización:", error);
      }
    };
        fetchData();
    }, []);
    if (!organization) {
        return <div>Cargando...</div>;
      }
    
   
   
   
    console.log(organization);
  return (
    <div className="bg-blanco min-h-screen text-black ">
      <div className="mx-auto max-w-5xl">
        <h1 className=" text-black text-2xl text-center font-bold mb-8 mt-5"> Crear Orgnizacion </h1>
        <form className=" p-5 border-1 shadow ">
          <div className="mb-5 mt-5">
           
            <Input id="nombre" key="outside" type="text" label="Nombre" required value={ organization['usuario']['nombre']} />
           
          </div>
          <div className="mb-5">
         
            <Input id="correo" key="outside" type="gmail" label="Gmail" required value={ organization['usuario']['correo']} />
          </div>
          <div className="mb-5">
            <Input
              id="contrasena"
              key="outside"
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
              label="Contraseña"
              required 
              value={ organization['usuario']['contrasena']}
            />
          </div>
          <div className="mb-5">
            <Input id="celular" key="outside" label="Celular" required value={ organization['usuario']['celular']}/>
          </div>
          <div className="mb-5">
            <label>Ubicación:</label>
            <div style={mapContainerStyle}>
              <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={{
                    lat: parseFloat(organization['latitud']) || center.lat,
                    lng:parseFloat(organization['longitud'])|| center.lng,
                  }}
                  zoom={10}
                  onClick={handleMapClick}
                  
                >
                 {parseFloat(organization['latitud']) !== null && parseFloat(organization['longitud']) !== null && (
                  <Marker position={{ lat: parseFloat(organization['latitud']), lng: parseFloat(organization['longitud']) }} />
                )}
                 
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
          <div className="mb-5">
            <Checkbox id="crearProductos" defaultChecked color="success"   onChange={handleCrearProductosChange} >
              Crear Productos
            </Checkbox>

          </div>
          <div className="mb-5">
            <Input id="nit" key="outside" label="Nit" required  value={ organization['nit']}/>
          </div>
          <Button type="submit" color="primary">
            Enviar
          </Button>
        </form>
      </div>
    </div>
  );
}
