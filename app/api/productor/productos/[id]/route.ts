////
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const productos = await prisma.productos.findMany({
        where: {
          idProductor: {
            in: (await prisma.productor.findMany({
                  where: {
                      idOrganizacion: Number(params.id),
                  },
                  select: {
                      idProductor: true,
                  },
              })).map((productor) => productor.idProductor),
          },
        },
        include: {
          ruta: {
            select: {
              ruta: true,
            },
          },
        },
      });

    return NextResponse.json({
      productos,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}