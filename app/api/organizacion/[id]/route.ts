
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params{
    params: {id:string};
}

export async function GET(request: Request , {params}: Params) {
    try {
        
        console.log(params.id)
    
        const organizacion = await prisma.organizacion.findFirst({
            where:{
                idOrganizacion: Number(params.id)
            },
            include: {
                usuario: true, // Cargar usuarios relacionados
            }
        })

        return NextResponse.json({
            organizacion
        })
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          return NextResponse.json({ message: error.message }, { status: 500 });
        }
      }
}

export async function PUT(request: Request , {params}: Params) {
    try {
        
        console.log(params.id)
    
        const organizacion = await prisma.organizacion.findFirst({
            where:{
                idOrganizacion: Number(params.id)
            },
            include: {
                usuario: true, // Cargar usuarios relacionados
            }
        })

        return NextResponse.json({
            organizacion
        })
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          return NextResponse.json({ message: error.message }, { status: 500 });
        }
      }
}