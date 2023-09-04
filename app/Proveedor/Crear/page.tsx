'use client'
import { Input } from '@nextui-org/react'
import React from 'react'

export default function page() {


  return (
    <>
    <div className="bg-blanco min-h-screen text-black ">
      <div className="mx-auto max-w-5xl">
        <h1 className=" text-black text-2xl text-center font-bold mb-8 mt-5"> Crear Proveedor </h1>
        <form className=" p-5 border-1 shadow " method="Post" >
          <div className="mb-5 mt-5">
           
            <Input id="nombre" key="outside" type="text" label="Nombre" required  />
            
          </div>
          
          
          <div className="mb-5">
            <Input id="celular" key="outside" label="Celular" required />
          </div>
          
        </form>
      </div>
    </div>
    </>
  )
}
