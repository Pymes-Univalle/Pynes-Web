import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params{
    params: {id:string};
}

export async function GET(request:Request, {params}: Params) {
  try {
    const productoId = Number(params.id);
    const rutas = await prisma.ruta.findFirst({
      where:{
        idProducto: productoId,
      },
    });

    if (!rutas) {
      return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 });
    }

    return NextResponse.json({rutas})

  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
