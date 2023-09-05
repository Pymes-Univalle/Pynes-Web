'use client'
import React from "react";
import { Input, Checkbox, Button } from "@nextui-org/react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import GOOGLE_MAPS_API_KEY from "@/googleMapsConfig";
import { FaEye, FaEyeSlash } from 'react-icons/fa';



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
  fechaActualizacion: Date;
}

interface Organization {
  latitud: number;
  longitud: number;
  nit: string;
  crearProductos: number;
}

export default function Crear() {

  const [crearProductos, setCrearProductos] = React.useState(false);



  const handleCrearProductosChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCrearProductos(event.target.checked);
  };
  //Icono del Password
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [markers, setMarkers] = React.useState<google.maps.LatLngLiteral[]>([]);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
        const newMarker = event.latLng.toJSON();
        setMarkers([newMarker]);
        //console.log(`Latitud: ${newMarker.lat}, Longitud: ${newMarker.lng}`);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
   var crear = 0;
    
    const nombre = (formElements.namedItem("nombre") as HTMLInputElement)?.value || "";
    const apellido = (formElements.namedItem("apellido") as HTMLInputElement)?.value || "";
    const correo = (formElements.namedItem("correo") as HTMLInputElement)?.value || "";
    const contrasena = (formElements.namedItem("contrasena") as HTMLInputElement)?.value || "";
    const celular = (formElements.namedItem("celular") as HTMLInputElement)?.value || "";
    const nit = (formElements.namedItem("nit") as HTMLInputElement)?.value || "";
    const fechaActualizacion = new Date()
    
   
    
    if(crearProductos == true){
      crear = 1;
    }else{
      crear = 0;
    }

    
    const mysqlFormattedDate = fechaActualizacion.toISOString().slice(0, 19).replace('T', ' ');
    
    const user: User = {
      nombre,
      apellido,
      correo,
      contrasena,
      celular,
      estado: 1,
      fechaActualizacion: new Date(),
    };

    const organization: Organization = {
      latitud: markers[0]?.lat || 0,
      longitud: markers[0]?.lng || 0,
      nit,
      crearProductos: crear,
    };

    console.log({user: user} )
    console.log({organization: organization} )

    const axios = require('axios');
  
    try {
      const resp = await axios.post('/api/organizacion/', {
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
        contrasena: user.contrasena,
        celular: user.celular,
        fechaActualizacion: fechaActualizacion,
        latitud:  organization.latitud.toString(),
        longitud: organization.longitud.toString(),
        crearProductos: organization.crearProductos,
        nit: organization.nit,

      });
  
      if (resp && resp.data) {
        console.log('AddUser->resp.data: ', resp.data);
       
      }
    
    }catch(error){

    }  
  };
  
  return (
    <div className="bg-blanco min-h-screen text-black ">
      <div className="mx-auto max-w-5xl">
        <h1 className=" text-black text-2xl text-center font-bold mb-8 mt-5"> Crear Orgnizacion </h1>
        <form className=" p-5 border-1 shadow " method="Post" onSubmit={handleSubmit}>
          <div className="mb-5 mt-5">
           
            <Input id="nombre" key="outside" type="text" label="Nombre" required  />
            
          </div>
          <div className="mb-5">
            <Input id="apellido" key="outside" type="text" label="Apellido" required />
          </div>
          <div className="mb-5">
         
            <Input id="correo" key="outside" type="gmail" label="Gmail" required />
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
            />
          </div>
          <div className="mb-5">
            <Input id="celular" key="outside" label="Celular" required />
          </div>
          <div className="mb-5">
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
          <div className="mb-5">
            <Checkbox id="crearProductos" defaultChecked color="success"  onChange={handleCrearProductosChange} >
              Crear Productos
            </Checkbox>

          </div>
          <div className="mb-5">
            <Input id="nit" key="outside" label="Nit" required />
          </div>
          <Button type="submit" color="primary">
            Enviar
          </Button>
        </form>
      </div>
    </div>
  );
}
