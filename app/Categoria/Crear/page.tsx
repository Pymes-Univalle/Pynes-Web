'use client'
import { Button, Input } from '@nextui-org/react'
import axios from 'axios';
import React from 'react'

interface Provedores {
  nombre: string;
  
}

export default function page() {
 
  


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const formElements = event.currentTarget.elements;

    const nombre = (formElements.namedItem("nombre") as HTMLInputElement)?.value || "";

    const categoria: Provedores = {
      nombre
    }

    try {
      const resp = await axios.post('/api/categoria/', {
        nombre: categoria.nombre       
      });
  
      if (resp && resp.data) {
        window.location.href = '/categoria/mostrar';
       
      }
    
    }catch(error){
      console.log('Error al inserte un proveedor');
    }  
  }

  return (
    <>
     <div className="bg-blanco min-h-screen text-black ">
      <div className="mx-auto max-w-5xl">
        <h1 className=" text-black text-2xl text-center font-bold mb-8 mt-5"> Crear Categorias </h1>
        <form className=" p-5 border-1 shadow " method="Post"  onSubmit={handleSubmit}>
          <div className="mb-5 mt-5">
           
            <Input id="nombre" key="outside" type="text" label="Nombre" required 
               />
            
          </div> 
          <Button type="submit" color="primary">
            Enviar
          </Button>
        </form>
      </div>
    </div>
    
    </>
  )
}
