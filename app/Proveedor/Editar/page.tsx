'use client'
import React, { useEffect, useState } from "react";
import { Input, Checkbox, Button, Progress } from "@nextui-org/react";

import { useSearchParams } from "next/navigation";






interface Proveedor {
  nombre: string;
  celular: string;
  estado: number;
  fechaActualizacion: Date;
}



export default function Editar() {



  const axios = require('axios');

  const [proveedor, setProveedor] = useState(null);
  const valor = useSearchParams();
  const id = valor.get('id');

  const [nombre, setNombre] = useState<string>("");
 
  const [celular, setCelular] = useState<string>("");




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/proveedor/${id}`);
        if (response.status === 200) {
          const data = await response.data;
          const proveedorData = await data.proveedor;
          setProveedor(proveedorData);
          
        
         
          setNombre(proveedorData['nombre'] || "");
        
          setCelular(proveedorData['celular'] || "");
          
         
        } else {
          console.error("Error al obtener la organización");
        }
      } catch (error) {
        console.error("Error al obtener la organización:", error);
      }
    };
        fetchData();
    }, []);

    if (!proveedor) {
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
   
    const id = (formElements.namedItem("id") as HTMLInputElement)?.value || "";
   
    const nombre = (formElements.namedItem("nombre") as HTMLInputElement)?.value || "";
   
    const celular = (formElements.namedItem("celular") as HTMLInputElement)?.value || "";
 
   
   

    const proveedor: Proveedor = {
      
      nombre,   
      celular,
      estado: 1,
      fechaActualizacion: new Date(new Date().toISOString()), 
    };

 


    try {
      const response = await axios.put(`/api/proveedor/${id}`, {
        nombre: proveedor.nombre,
        celular: proveedor.celular,
        estado: proveedor.estado,
        fechaActualizacion: proveedor.fechaActualizacion,


      });
  
      if (response.status === 200) {
        // Maneja la respuesta exitosa aquí, por ejemplo, muestra un mensaje de éxito o redirige a otra página
        console.log('Actualización exitosa:', response.data);
        window.location.href = '/Proveedor/Mostrar';
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
           
           <Input id="id" key="outside" type="text" label="ID"  value={proveedor['id']}  />
          
         </div>

          <div className="mb-5 mt-5">
           
            <Input id="nombre" key="outside" type="text" label="Nombre" required value={nombre}  onChange={(event) => setNombre(event.target.value)} />
           
          </div>

          <div className="mb-5">
            <Input id="celular" key="outside" label="Celular" required value={celular} onChange={(event) => setCelular(event.target.value)}/>
          </div>
         
        
          <Button type="submit" color="primary">
            Enviar
          </Button>
        </form>
      </div>
    </div>
  );
}
