// Importa tus modelos de Prisma
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params{
    params: {id:string};
}

export async function GET(request:Request, {params}: Params) {
    try {
        
        console.log(params.id)
    
        const productos = await prisma.productos.findFirst({
            where:{
                idProductos: Number(params.id)
                
            },
            include:{
                ruta:true,
                categoria: true,
                atributo: true
              }
        })

        return NextResponse.json({
            productos
        })
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          return NextResponse.json({ message: error.message }, { status: 500 });
        }
      }
}