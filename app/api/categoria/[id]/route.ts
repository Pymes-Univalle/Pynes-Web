import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params{
    params: {id:string};
}

export async function GET(request: Request, {params}: Params) {

    try {
        console.log(params.id)

        const categoria = await prisma.categoria.findFirst({
            where: {
                idCategoria: Number(params.id)
            },
        })
        
        return NextResponse.json({categoria})

    } catch (error) {
        console.log(error);

        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        }
    }
}

export async function PUT(request: Request, {params}: Params) {
    try {
        const {nombre} = await request.json();

        const updateCategoria = await prisma.categoria.update({
            where: {
                idCategoria: Number(params.id)
            },
            data: {
                idCategoria: Number(params.id),
                nombre: nombre,
            }
        });

        return NextResponse.json({updateCategoria});

    } catch (error) {
        console.log(error);

        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        }
    }
}

export async function DELETE(request: Request, {params}: Params) {
    try {
        const deleteCategoria = await prisma.categoria.delete({
            where: {
                idCategoria: Number(params.id)
            }
        });

        return NextResponse.json({deleteCategoria});

    } catch (error) {
        console.log(error);

        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        }
    }
}