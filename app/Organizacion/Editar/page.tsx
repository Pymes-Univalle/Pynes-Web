'use client'
import React, { useEffect, useState } from "react";
import { Input, Checkbox, Button, Progress } from "@nextui-org/react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import GOOGLE_MAPS_API_KEY from "@/googleMapsConfig";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useSearchParams } from "next/navigation";

import { text } from "node:stream/consumers";



const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
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
  const [mapCenter, setMapCenter] = useState(defaultCenter); 
  const axios = require('axios');

  const [organization, setOrganization] = useState(null);
  const valor = useSearchParams();
  const id = valor.get('id');

  const [nombre, setNombre] = useState<string>("");
  const [apellido, setApellido] = useState<string>("");
  const [correo, setCorreo] = useState<string>("");
  const [contrasena, setContrasena] = useState<string>("");
  const [celular, setCelular] = useState<string>("");
  const [nit, setNit] = useState<string>("");



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

        setMapCenter(newMarker);
       
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
          
         
          if (organizacionData['crearProductos'] === 1) {
            setCrearProductos(true);
          }
         
         const organizationCenter = {
          lat: parseFloat(organizacionData['latitud']),
          lng: parseFloat(organizacionData['longitud']),
        };
        setMapCenter(organizationCenter);
          setMarkers([{ lat: parseFloat(organizacionData['latitud']), lng: parseFloat(organizacionData['longitud']) }]);
          setNombre(organizacionData['usuario']['nombre'] || "");
          setApellido(organizacionData['usuario']['apellido'] || "");
          setCorreo(organizacionData['usuario']['correo'] || "");
          setContrasena(organizacionData['usuario']['contrasena'] || "");
          setCelular(organizacionData['usuario']['celular'] || "");
          setNit(organizacionData['nit'] || "");

          console.log(organizacionData)
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
        return  
        <Progress
        size="sm"
        isIndeterminate
        aria-label="Loading..."
        className="max-w-md"
      />
    }
    
   

    

   
  

  
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    var crear = 0;
    const id = (formElements.namedItem("id") as HTMLInputElement)?.value || "";
    const apellido = (formElements.namedItem("apellido") as HTMLInputElement)?.value || "";
    const nombre = (formElements.namedItem("nombre") as HTMLInputElement)?.value || "";
    const correo = (formElements.namedItem("correo") as HTMLInputElement)?.value || "";
    const contrasena = (formElements.namedItem("contrasena") as HTMLInputElement)?.value || "";
    const celular = (formElements.namedItem("celular") as HTMLInputElement)?.value || "";
    const nit = (formElements.namedItem("nit") as HTMLInputElement)?.value || "";
    const fechaActualizacion = new Date();
    if(crearProductos == true){
      crear = 1;
    }else{
      crear = 0;
    }

   

    const user: User = {
      
      nombre,
      apellido,
      correo,
      contrasena,
      celular,
      estado: 1,
      fechaActualizacion: new Date(new Date().toISOString()), 
    };

    const organization: Organization = {
      latitud: markers[0]?.lat || 0,
      longitud: markers[0]?.lng || 0,
      nit,
      crearProductos: crear,
    };

    
    console.log({user: user} )
    console.log({organization: organization} )


    try {
      const response = await axios.put(`/api/organizacion/${id}`, {
        nombre: user.nombre,
        apellido:user.apellido,
        correo: user.correo,
        contrasena: user.contrasena,
        celular: user.celular,
        fechaActualizacion: user.fechaActualizacion,
        latitud:  organization.latitud.toString(),
        longitud: organization.longitud.toString(),
        crearProductos: organization.crearProductos,
        nit: organization.nit,

      });
  
      if (response.status === 200) {
        // Maneja la respuesta exitosa aquí, por ejemplo, muestra un mensaje de éxito o redirige a otra página
        console.log('Actualización exitosa:', response.data);
        window.location.href = '/Organizacion/Mostrar';


      } else {
        // Maneja la respuesta en caso de error aquí
        console.error('Error al actualizar:', response.data);
      }
    } catch (error) {
      // Maneja los errores de red o del servidor aquí
      console.error('Error en la solicitud PUT:', error);
    }
    



  }


  return (
    <div className="bg-blanco min-h-screen text-black ">
      <div className="mx-auto max-w-5xl">
        <h1 className=" text-black text-2xl text-center font-bold mb-8 mt-5"> Crear Orgnizacion </h1>
        <form className=" p-5 border-1 shadow " onSubmit={handleSubmit}>

        <div className="mb-5 mt-5" >
           
           <Input id="id" key="outside" type="text" label="ID"  value={organization['idOrganizacion']}  />
          
         </div>

          <div className="mb-5 mt-5">
           
            <Input id="nombre" key="outside" type="text" label="Nombre" required value={nombre}  onChange={(event) => setNombre(event.target.value)} />
           
          </div>

          <div className="mb-5 mt-5">
           
           <Input id="apellido" key="outside" type="text" label="Apellido" required value={apellido}  onChange={(event) => setApellido(event.target.value)} />
          
         </div>
          <div className="mb-5">
         
            <Input id="correo" key="outside" type="gmail" label="Gmail" required value={correo} onChange={(event) => setCorreo(event.target.value)}/>
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
              value={ contrasena}
              onChange={(event) => setContrasena(event.target.value)}
            />
          </div>
          <div className="mb-5">
            <Input id="celular" key="outside" label="Celular" required value={celular} onChange={(event) => setCelular(event.target.value)}/>
          </div>
          <div className="mb-5">
            <label>Ubicación:</label>
            <div style={mapContainerStyle}>
              <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={mapCenter}
                  zoom={15}
                  onClick={handleMapClick}
                  
                >
                
                {markers.map((marker, index) => (
                    <Marker key={index} position={marker} />
                  ))}
                 
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
          <div className="mb-5">
            <Checkbox id="crearProductos" color="success" defaultSelected={crearProductos}  onChange={handleCrearProductosChange}  >
              Crear Productos
            </Checkbox>

          </div>
          <div className="mb-5">
            <Input id="nit" key="outside" label="Nit" required  value={ nit} onChange={(event) => setNit(event.target.value)}/>
          </div>
          <Button type="submit" color="primary">
            Enviar
          </Button>
        </form>
      </div>
    </div>
  );
}
