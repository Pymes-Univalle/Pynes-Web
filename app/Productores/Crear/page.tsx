"use client";
import React, { useState } from "react";
import {
  Input,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  Link,
  ModalFooter,
} from "@nextui-org/react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import GOOGLE_MAPS_API_KEY from "@/googleMapsConfig";
import { randomBytes } from "crypto";
import emailjs from "@emailjs/browser";
import CryptoJS from "crypto-js";

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
  const [modal, setModal] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [markers, setMarkers] = React.useState<google.maps.LatLngLiteral[]>([]);
  const [fieldValidations, setFieldValidations] = useState({
    nombres: true,
    apellidos: true,
    correo: true,
    celular: true,
    puesto: true,
  });
  const [mapValidation, setMapValidation] = useState(false); 
  const [mapError, setMapError] = useState(false); 


  var pass: string;

  const generarContraseña = (longitud: number = 6) =>
    Array.from(
      randomBytes(longitud),
      (byte) =>
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[
          byte % 62
        ]
    ).join("");

  pass = generarContraseña();
  const contrasena = CryptoJS.MD5(pass).toString(CryptoJS.enc.Hex);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newMarker = event.latLng.toJSON();
      setMarkers([newMarker]);
      setMapValidation(true)
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;

    const nombre =
      (formElements.namedItem("nombres") as HTMLInputElement)?.value || "";
    const apellido =
      (formElements.namedItem("apellidos") as HTMLInputElement)?.value || "";
    const correo =
      (formElements.namedItem("correo") as HTMLInputElement)?.value || "";
    const celular =
      (formElements.namedItem("celular") as HTMLInputElement)?.value || "";
    const puesto =
      (formElements.namedItem("puesto") as HTMLInputElement)?.value || "";
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

    const newValidations = {
      nombres: nombre.trim() !== "",
      apellidos: apellido.trim() !== "",
      correo: correo.trim() !== "",
      celular: celular.trim() !== "",
      puesto: puesto.trim() !== "",
    };

    setFieldValidations(newValidations);

    if (Object.values(newValidations).every((valid) => valid) && mapValidation) {
      const axios = require("axios");
      var templateParams = {
        from_name: "Totem",
        nombre: user.nombre,
        contrasena: pass,
        email: user.correo,
      };

      try {
        emailjs
          .send(
            "service_7xh4aqx",
            "template_soj79xk",
            templateParams,
            "BQzfsMnH6-p-UBfyg"
          )
          .then(
            (result) => {
              console.log(result.text);
            },
            (error) => {
              console.log(error.text);
            }
          );

        const resp = await axios.post("/api/productor/", {
          nombre: user.nombre,
          apellido: user.apellido,
          correo: user.correo,
          contrasena: user.contrasena,
          celular: user.celular,
          latitud: productor.latitud.toString(),
          longitud: productor.longitud.toString(),
          puesto: productor.puesto,
          idOrganizacion: productor.idOrganizacion,
        });

        if (resp.status === 200) {
          setModal(true);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    } else if (!mapValidation){
      setMapError(true);
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
              validationState={fieldValidations.nombres ? "valid" : "invalid"}
              errorMessage={
                !fieldValidations.nombres ? "Campo requerido" : undefined
              }
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
              validationState={fieldValidations.apellidos ? "valid" : "invalid"}
              errorMessage={
                !fieldValidations.apellidos ? "Campo requerido" : undefined
              }
            />
          </div>
          <div className="mt-10">
            <Input
              id="correo"
              name="correo"
              key="outside"
              type="email"
              label="Correo Electrónico"
              labelPlacement="outside"
              required
              validationState={fieldValidations.correo ? "valid" : "invalid"}
              errorMessage={
                !fieldValidations.correo ? "Campo requerido" : undefined
              }
            />
          </div>

          <div className="mt-10">
            <Input
              id="celular"
              type="number"
              name="celular"
              key="outside"
              labelPlacement="outside"
              label="Celular"
              required
              validationState={fieldValidations.celular ? "valid" : "invalid"}
              errorMessage={
                !fieldValidations.celular ? "Campo requerido" : undefined
              }
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
              validationState={fieldValidations.puesto ? "valid" : "invalid"}
              errorMessage={
                !fieldValidations.puesto ? "Campo requerido" : undefined
              }
            />
          </div>
          <div className="mt-10 mb-10">
            <label>Ubicación:</label>
            <div>
              <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} >
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
              {mapError && (
                 <p className="text-red-500">Debe seleccionar una ubicación en el mapa.</p>
              )}
            </div>
          </div>

          <Button type="submit" radius="full" className="bg-amarillo">
            Registrar
          </Button>
          <Modal isOpen={modal} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 self-center mt-10">
                    Productor registrado correctamente
                  </ModalHeader>

                  <ModalFooter>
                    <Button
                      color="success"
                      as={Link}
                      href="/Productores/Mostrar"
                    >
                      Aceptar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </form>
      </div>
    </div>
  );
}
