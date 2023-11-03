import prisma from "@/lib/prisma";
import { data } from "autoprefixer";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const ruta = await prisma.ruta.findMany();
    return NextResponse.json({ data: ruta }, { status: 200 });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}