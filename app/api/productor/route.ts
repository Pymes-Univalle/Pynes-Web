// Importa tus modelos de Prisma
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const productor = await prisma.productor.findMany();

        return NextResponse.json({data:productor} ,{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error} ,{status:500});
    }
 

    
}