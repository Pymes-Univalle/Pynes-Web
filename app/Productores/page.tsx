"use client";
import React, { Component } from "react";
import { Input, Button } from "@nextui-org/react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export class page extends Component {
  render() {
    return (
      <div className="bg-blanco min-h-screen text-black ">
        <div className="mx-auto max-w-5xl">
          <h1 className=" text-black text-2xl text-center font-bold mb-8 mt-5">
            Registrar Productor
          </h1>
          <form className=" p-5 border-1 shadow ">
            <div className="mt-10">
              <Input
                id="nombre"
                key="outside"
                type="text"
                label="Nombre Completo"
                labelPlacement="outside"
                required
              />
            </div>
            <div className="mt-10">
              <Input
                id="correo"
                key="outside"
                type="gmail"
                label="Correo Electrónico"
                labelPlacement="outside"
                required
              />
            </div>

            <div className="mt-10">
              <Input id="celular" key="outside" labelPlacement="outside" label="Celular" required />
            </div>
            <div className="mt-10">
              <Input
                id="cargo"
                key="outside"
                type="text"
                label="Cargo"
                labelPlacement="outside"
                required
              />
            </div>
            <div className="mt-10">
              <label>Ubicación:</label>
              <div>
                <LoadScript googleMapsApiKey={""}>
                  <GoogleMap zoom={10}></GoogleMap>
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
}

export default page;
