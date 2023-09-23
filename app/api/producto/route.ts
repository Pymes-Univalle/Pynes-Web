import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
       
        
        return NextResponse.json({  }, { status: 200 });
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          return NextResponse.json({ message: error.message }, { status: 500 });
        }
      }
}