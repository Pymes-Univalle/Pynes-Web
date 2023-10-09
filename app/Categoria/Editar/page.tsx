'use client'
import { Button, CircularProgress, Input, Progress } from '@nextui-org/react'
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Categoria {
    nombre: string;    
}

export default function Editar() {

    const axios = require('axios');
    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategoria] = useState(null);
    const valor = useSearchParams();
    const id = valor.get('id');

    const [nombre, setNombre] = useState<string>("");

    //#region Validacion Nombre
    const handleNombreChange = (value: any) => {
        setNombre(value);
    };
    
    const validateNombre = (value: any) => {
        if (typeof value === "string") {
          return value.match(/^[A-Za-z\s]{3,}$/i);
        }
        return false;
    };

    const validationNombre = React.useMemo(() => {
        if (nombre === " ") return undefined;

        return validateNombre(nombre) ? "valid" : "invalid";
    }, [nombre]);
    //#endregion

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/categoria/${id}`);
                if (response.status === 200) {
                    const data = await response.data;
                    const categoriaData = await data.categoria;
    
                    setCategoria(categoriaData);
    
                    setNombre(categoriaData['nombre'] || "");
    
                    console.log(categoriaData)
                } else {            
                    console.error('Error al obtener la categoria:', response.data);
                }
    
            } catch (error) {
                console.error('Error en la solicitud para Editar:', error);
            }
        };
        fetchData();
    }, []);

    if (!category) {
        return <Progress
        size="sm"
        isIndeterminate
        aria-label="Loading..."
        className="max-w-md"
        />
    }
 
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
      event.preventDefault();

      setIsLoading(true);

      const formElements = event.currentTarget.elements;
  
      const id = (formElements.namedItem("idCategoria") as HTMLInputElement)?.value || "";
      const nombre = (formElements.namedItem("nombre") as HTMLInputElement)?.value || "";
  
      const categoria: Categoria = {
        nombre
      };

      //console.log({category: categoria} )

      if (validationNombre == "invalid") {
        (formElements.namedItem("nombre") as HTMLInputElement).focus();
        return;
      }

      if (validationNombre == "valid") {
        try {
            const resp = await axios.put(`/api/categoria/${id}`, {
              nombre: categoria.nombre
            });

            console.log(nombre, id);
        
            if (resp.status === 200) {

                setIsLoading(false);

                window.location.href = '/Categoria/Mostrar';
            } else {
                console.error('Error al editar la categoria:', resp.data);
            }
          
          }catch(error){
            console.log('Error al editar una categoria', error);
          } 
      }
       
    }
  
    return (
       <div className="bg-blanco min-h-screen text-black ">
        <div className="mx-auto max-w-5xl">
          <h1 className=" text-black text-2xl text-center font-bold mb-8 mt-5"> Editar Categorias </h1>
          <form className=" p-5 border-1 shadow " method="Post"  onSubmit={handleSubmit}>

            <div className="mb-5 mt-5">
               
               <Input id="idCategoria" key="outside" type="text" label="ID"  value={category['idCategoria']} />
              
            </div>

            <div className="mb-5 mt-5">
             
              <Input id="nombre" key="outside" type="text" label="Nombre" required value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                color={validationNombre === "invalid" ? "danger" : "success"}
                errorMessage={validationNombre === "invalid" && "El campo nombre es obligatorio y solo letras"  }
                validationState={validationNombre}
                onValueChange={handleNombreChange}
                 />
              
            </div> 
            <Button type="submit" color="primary">
                {isLoading ? (
                    <CircularProgress aria-label="Loading..." />
                ): (
                    "Enviar"
                )}
            </Button>
          </form>
        </div>
      </div>
    )
}