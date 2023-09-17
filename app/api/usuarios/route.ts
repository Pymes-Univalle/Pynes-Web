import { NextResponse } from "next/server";
import prisma from '../../libs/prisma';

export async function GET() {

    try {
        const usuarios = await prisma.usuario.findMany();
        return NextResponse.json(usuarios);

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            );
        }
    }    
}

export async function POST(request: Request) {

    try {
        const {nombre, apellido, correo, contrasena, celular, fechaActualizacion} = await request.json();
    
        const nuevoUsuario = await prisma.usuario.create({ 
            data: { 
                nombre:nombre,
                apellido:apellido,
                correo:correo, 
                contrasena:contrasena,
                celular:celular,
                fechaActualizacion:fechaActualizacion
            }
        });

        return NextResponse.json(nuevoUsuario);

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            );
        }
    }

}