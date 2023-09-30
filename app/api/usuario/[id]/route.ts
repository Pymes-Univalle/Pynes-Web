import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
    try {
      const usuario = await prisma.usuario.findFirst({
        where: {
          id: Number(params.id),
        }
      });
  
      return NextResponse.json({
        usuario,
      });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
    }
  }

export async function PUT(request: Request, { params }: Params) {
  try {
    const {
      nombre,
      correo,
      contrasena,
      celular,
      fechaActualizacion,
      latitud,
      longitud,
      puesto,
      idOrganizacion,
    } = await request.json();

    const [updateUsuario, updateProductor] = await prisma.$transaction([
      prisma.usuario.update({
        where: {
          id: Number(params.id),
        },
        data: {
          nombre: nombre,
          correo: correo,
          contrasena: contrasena,
          celular: celular,
          fechaActualizacion: new Date(new Date().toISOString()),
        },
      }),
      prisma.productor.update({
        where: {
          idProductor: Number(params.id),
        },
        data: {
          idProductor: Number(params.id),
          puesto: puesto,
          latitud: latitud.toString(), // Convertir latitud a cadena
          longitud: longitud.toString(), // Convertir longitud a cadena
          idOrganizacion: idOrganizacion,
          fechaActualizacion: new Date(new Date().toISOString()),
        },
      }),
    ]);

    return NextResponse.json({
      updateUsuario,
      updateProductor,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}


// Actualizar contraseña
export async function DELETE(request: Request, { params }: Params) {
  try {
    const { contrasena } = await request.json();

    const [updateUsuario] = await prisma.$transaction([
      prisma.usuario.update({
        where: {
          id: Number(params.id),
        },
        data: {
          contrasena: contrasena,
          fechaActualizacion: new Date(new Date().toISOString()),
        },
      }),
    
    ]);

    return NextResponse.json({
      updateUsuario,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
