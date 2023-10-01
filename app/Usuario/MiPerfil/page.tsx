"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Link } from "@nextui-org/react";

function page() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [celular, setCelular] = useState("");
  const [correo, setCorreo] = useState("");
  const [fieldValidations, setFieldValidations] = useState({
    nombre: true,
    apellido: true,
    celular: true,
    correo: true,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/usuario/11`);
        if (response.status === 200) {
          const usuario = await response.data;

          setNombre(usuario.usuario.nombre);
          setApellido(usuario.usuario.apellido);
          setCelular(usuario.usuario.celular);
          setCorreo(usuario.usuario.correo);

          console.log(usuario);
        } else {
          console.error(response.status);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-blanco min-h-screen text-black ">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-black text-2xl text-center font-bold mb-8 mt-5">
          {" "}
          Información del productor{" "}
        </h1>
        <div className=" p-5 border-1 shadow ">
          <div className="mb-5 mt-5">
            <strong className="text-blue-600">Nombre:</strong> {nombre}
          </div>
          {apellido !== null && apellido !== "" && (
            <div className="mb-5">
              <strong className="text-blue-600">Apellidos:</strong> {apellido}
            </div>
          )}
          <div className="mb-5">
            <strong className="text-blue-600">Correo Electrónico:</strong>{" "}
            {correo}
          </div>
          <div className="mb-5">
            <strong className="text-blue-600">Celular:</strong> {celular}
          </div>
        </div>
      </div>
      <Button radius="full" className="mt-5 bg-amarillo"
       as={Link}
       href="/Usuario/UpdateData">
        Actualizar Datos
      </Button>
    </div>
  );
}

export default page;
