import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params{
    params: {id:string};
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { nombre } =
    await request.json();

    const updateCategoria = await prisma.categoria.update({
        where: {
            idCategoria: Number(params.id),
        },
        data: {
            nombre: nombre,
        },
    });

    return NextResponse.json({ updateCategoria });

  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}