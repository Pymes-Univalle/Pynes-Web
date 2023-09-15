import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function PUT(request: Request, { params }: Params) {
    try {
      const { contrasena } = await request.json();
  
      const updateUsuario = await prisma.usuario.update({
        where: {
          id: Number(params.id),
        },
        data: {
          contrasena: contrasena,
          fechaActualizacion: new Date(new Date().toISOString()),
        },
      });
  
      return NextResponse.json({
        mensaje: contrasena
      });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
    }
  }