"use client";
import React, { Component } from "react";
import { Input, Button } from "@nextui-org/react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import GOOGLE_MAPS_API_KEY from "@/googleMapsConfig";
import { randomBytes } from 'crypto';

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
  apellido: string;
  correo: string;
  contrasena: string;
  celular: string;
  estado: number;
  fechaRegistro: Date;
}

interface Productor {
  latitud: number;
  longitud: number;
  puesto: string;
  idOrganizacion: number;
}
export default function Crear() {
  const [markers, setMarkers] = React.useState<google.maps.LatLngLiteral[]>([]);

  var contrasena: string ;

  const generarContraseña = (longitud: number = 6) =>
  Array.from(randomBytes(longitud), (byte) => 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[byte % 62]).join('');

  contrasena = generarContraseña();

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newMarker = event.latLng.toJSON();
      setMarkers([newMarker]);
    }
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
   
    
    const nombre = (formElements.namedItem("nombres") as HTMLInputElement)?.value || "";
    const apellido = (formElements.namedItem("apellidos") as HTMLInputElement)?.value || "";
    const correo = (formElements.namedItem("correo") as HTMLInputElement)?.value || "";
 
    const celular = (formElements.namedItem("celular") as HTMLInputElement)?.value || "";
    const puesto = (formElements.namedItem("puesto") as HTMLInputElement)?.value || "";
    const idOrganizacion = 1;

    
    
    const user: User = {
      nombre,
      apellido,
      correo,
      contrasena: contrasena,
      celular,
      estado: 1,
      fechaRegistro: new Date(),
    };

    const productor: Productor = {
      latitud: markers[0]?.lat || 0,
      longitud: markers[0]?.lng || 0,
      puesto,
      idOrganizacion,
    };

    console.log({user: user} )
    console.log({productor: productor} )

    const axios = require('axios');
    
  
    try {
      if (
        user.nombre.trim() === '' ||
        user.apellido.trim() === '' ||
        user.correo.trim() === '' ||
        user.celular.trim() === '' ||
        productor.puesto.trim() === ''
      ) {
        alert('Todos los campos son obligatorios');
        return; // Evita enviar el formulario si hay campos vacíos
      }
      else{
        const resp = await axios.post('/api/productor/', {
          nombre: user.nombre,
          apellido: user.apellido,
          correo: user.correo,
          contrasena: user.contrasena,
          celular: user.celular,
          latitud:  productor.latitud.toString(),
          longitud: productor.longitud.toString(),
          puesto: productor.puesto,
          idOrganizacion: productor.idOrganizacion,
  
        });
    
        if (resp && resp.data) {
          // try {
          //   const response = await axios.post('/api/sendEmail/', {
          //     gmail: user.correo,
          //     contrasena: contrasena
          //   });
        
          //   if (response.status === 200) {
          //     console.log('Correo electrónico enviado con éxito');
          //   } else {
          //     console.error('Error al enviar el correo electrónico');
          //   }
          // } catch (error) {
          //   console.error('Error al enviar el correo electrónico:', error);
          // }
  
        }
      
      }
      
    }catch(error: any){
      console.log(error.message);
    }  
  };

  return (
    <div className="bg-black min-h-screen text-blanco ">
      <div className="mx-auto max-w-5xl">
        <h1 className=" text-white text-2xl text-center font-bold mb-8 mt-5">
          Registrar Productor
        </h1>
        <form
          className=" p-5 border-1 shadow"
          method="Post"
          onSubmit={handleSubmit}
        >
          <div className="mt-10">
            <Input
              id="nombres"
              name="nombres"
              key="outside"
              type="text"
              label="Nombres"
              labelPlacement="outside"
              required
            />
          </div>
          <div className="mt-10">
            <Input
              id="apellidos"
              name="apellidos"
              key="outside"
              type="text"
              label="Apellidos"
              labelPlacement="outside"
              required
            />
          </div>
          <div className="mt-10">
            <Input
              id="correo"
              name="correo"
              key="outside"
              type="gmail"
              label="Correo Electrónico"
              labelPlacement="outside"
              required
            />
          </div>

          <div className="mt-10">
            <Input
              id="celular"
              name="celular"
              key="outside"
              labelPlacement="outside"
              label="Celular"
              required
            />
          </div>
          <div className="mt-10">
            <Input
              id="puesto"
              name="puesto"
              key="outside"
              type="text"
              label="Puesto"
              labelPlacement="outside"
              required
            />
          </div>
          <div className="mt-10 mb-10">
            <label>Ubicación:</label>
            <div style={mapContainerStyle}>
              <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={10}
                  onClick={handleMapClick}
                >
                  {markers.map((marker, index) => (
                    <Marker key={index} position={marker} />
                  ))}
                </GoogleMap>
              </LoadScript>
            </div>
          </div>

          <Button type="submit" radius="full" className="bg-amarillo">
            Registrar
          </Button>
        </form>
      </div>
    </div>
  );
}
