import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

interface Params {
  params: { correo: string };
}

function generateToken(userId: number): string {
  const secret = "pymes123"; // clave secreta
  const expiresIn = "1h"; // Caducidad del token 
  const token = jwt.sign({ userId }, secret, { expiresIn });
  return token;
}

// Función para el inicio de sesión
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    //console.log(body);
   
    const usuario = await prisma.usuario.findFirst({
      where: {
        correo: body.correo,
        contrasena: body.contrasena,
      },
    });
   
    // Verificar si se encontró un usuario
     if (!usuario) {
       throw new Error("Credenciales inválidas");
     }

    // Generar y devolver un token JWT
    const token = generateToken(usuario.id);
    return NextResponse.json({ data: token }, { status: 200 });
   } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
  }
}

export async function GET() {
  try {
    const usuarios = await prisma.usuario.findMany({
      where: {
        estado: 1,
      },

     
    });

    return NextResponse.json({ data: usuarios }, { status: 200 });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}