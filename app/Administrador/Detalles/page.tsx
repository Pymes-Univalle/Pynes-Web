'use client'
import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { useSearchParams } from "next/navigation";

function page() {
  
  const valor = useSearchParams();
  const id = valor.get('id');
  const [administrador, setAdministrador] = useState(null);

  useEffect(() => {
    // Realiza una solicitud a tu función GET aquí
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/administrador/${id}`); // Usa axios.get en lugar de fetch
        if (response.status === 200) {
          const data = response.data;
          setAdministrador(data.administrador);
        } else {
          console.error("Error al obtener al Administrador");
        }
      } catch (error) {
        console.error("Error al obtener al Administrador:", error);
      }
    };

    fetchData();
  }, []);

  if (!administrador) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="bg-blanco min-h-screen text-black ">
    <div className="mx-auto max-w-5xl">
      <h1 className="text-black text-2xl text-center font-bold mb-8 mt-5"> Visualizar Administrador </h1>
      <div className=" p-5 border-1 shadow ">
          <div className="mb-5 mt-5">
          <strong>Nombre:</strong> {administrador['nombre']}
        </div>
        <div className="mb-5">
          <strong>Apellido:</strong> {administrador['apellido']}
        </div>
        <div className="mb-5">
          <strong>Gmail:</strong> {administrador['correo']}
        </div>
        <div className="mb-5">
          <strong>Celular:</strong> {administrador['celular']}
        </div>       
      </div>
    </div>
  </div>
  )
}

export default page