import prisma from "@/lib/prisma";
import { usuario } from "@prisma/client";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const organizaciones = await prisma.organizacion.findMany({
          include: {
            usuario: true, // Cargar usuarios relacionados
          },
        });
    
        return NextResponse.json({ data: organizaciones }, { status: 200 });
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          return NextResponse.json({ message: error.message }, { status: 500 });
        }
      }
}

export async function POST(request: Request  ){
    try {
        const { nombre, correo, contrasena, celular, fechaActualizacion, latitud, longitud, crearProductos, nit } = await request.json();
      
        const result = await prisma.$transaction(async (transaction) => {
          const usuario = await transaction.usuario.create({
            data: {
              nombre: nombre,
              correo: correo,
              contrasena: contrasena,
              celular: celular,
              fechaActualizacion: fechaActualizacion
            }
          });
      
          const organizacion = await transaction.organizacion.create({
            data: {
              idOrganizacion: usuario.id,
              latitud: latitud.toString(), // Convertir latitud a cadena
              longitud: longitud.toString(), // Convertir longitud a cadena
              crearProductos: crearProductos,
              nit: nit
            }
          });
      
          return { usuario, organizacion };
        });
      
        return NextResponse.json(result);
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          return NextResponse.json({ message: error.message }, { status: 500 });
        }
      }
}
