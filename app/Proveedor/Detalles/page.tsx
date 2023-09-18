'use client'
import React, { useEffect, useState } from "react";



import axios from "axios"; 
import { useSearchParams } from "next/navigation";



function page() {
  
  const valor = useSearchParams();
  const id = valor.get('idProveedor');
  const [proveedor, setProveedor] = useState(null);



  useEffect(() => {
    // Realiza una solicitud a tu función GET aquí
    const fetchData = async () => {
      try {
      
        const response = await axios.get(`/api/proveedor/${id}`); // Usa axios.get en lugar de fetch
        if (response.status === 200) {
          
          const data = response.data;
         
          setProveedor(data.proveedor);
        } else {
          console.error("Error al obtener el proveedor");
        }
      } catch (error) {
        console.error("Error al obtener el proveedor:", error);
      }
    };

    fetchData();
  }, []);

  
  if (!proveedor) {
    return <div>Cargando...</div>;
  }



  return (
    <div className="bg-blanco w-full h-full text-black ">
    <div className="mx-auto max-w-5xl">
      <h1 className="text-black text-2xl text-center font-bold mb-8 mt-5"> Visualizar Proveedores </h1>
      <div className=" p-5 border-1 shadow ">
          <div className="mb-5 mt-5">
          <strong>Nombre:</strong> {proveedor['nombre']}
        </div>
      
        <div className="mb-5">
          <strong>Gmail:</strong> {proveedor['celular']}
        </div>

       
       
      </div>
    </div>
  </div>
  )
}

export default page