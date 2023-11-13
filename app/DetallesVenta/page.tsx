'use client'
import { Button, Input } from '@nextui-org/react'
import axios from 'axios';
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';



export default function page() {
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`/api/detalles/`);
            if (response.status === 200) {
              const data = await response.data;
              const ventaData = await data.venta;
    
             
    
              console.log(ventaData)
            } else {
              console.error("Error al obtener la Categoria");
            }
          } catch (error) {
            console.error("Error al obtener la Categoria:", error);
          }
        };
            fetchData();
        }, []);

  return (
    <>
    <h1>Detalles Ventas </h1>
    
    </>
  )
}
