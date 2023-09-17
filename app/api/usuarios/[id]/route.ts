import { NextResponse } from "next/server";
// import { prisma } from '../../../libs/prisma';
import { Prisma } from "@prisma/client";

import prisma from "@/app/libs/prisma";

interface Params { 
    params: { id: string } 
}

export async function GET(request: Request, {params}: Params) {
    try {
        //console.log(params.id);
        const usuario = await prisma.usuario.findFirst({     
            where: { 
                id: Number(params.id) 
            } 
        });

        if (!usuario) {
            return NextResponse.json(
                { message: "Usuario no encontrado" }, 
                { status: 404 }
            );
        }

        return NextResponse.json(usuario);

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            );
        }
    }
}

export async function DELETE(request: Request, {params}: Params) {

    try {
        const usuarioEliminado = await prisma.usuario.delete({
            where: {
                id: Number(params.id),
            } 
        });
    
        if (!usuarioEliminado) return NextResponse.json(
            { message: "Usuario no encontrado" }, { status: 404 }
        );
    
        return NextResponse.json(usuarioEliminado);

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {

            if (error.code === 'P2025') {
                return NextResponse.json(
                    { message: "Usuario no encontrado" }, 
                    { status: 404 }
                );
            }

            console.log(error.code, error.message);
            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            );
        }
    }
}

export async function PUT(request: Request, {params}: Params) {

    try {
        const {nombre, apellido, correo, contrasena, celular, estado, fechaRegistro, fechaActualizacion} = await request.json();

        const usuarioActualizado = await prisma.usuario.update({
            where: { id: Number(params.id) },
            data: {
                nombre,
                apellido,
                correo, 
                celular,
                contrasena,
                fechaActualizacion
            }
        });

        return NextResponse.json(usuarioActualizado);

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {

            if (error.code === 'P2025') {
                return NextResponse.json(
                    { message: "Usuario no encontrado" }, 
                    { status: 404 }
                );
            }

            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            );
        }
    }
}