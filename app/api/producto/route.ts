// Importa tus modelos de Prisma
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Extraer los campos del formulario
    const nombre = formData.get('nombre');
    const precio = formData.get('precio');
    const descripcion = formData.get('descripcion');
    const cantidad = formData.get('cantidad');
    const idCategoria = formData.get('idCategoria');

    // Extraer los atributos del cuerpo de la solicitud como un JSON
    const atributosJSON = formData.get('atributos');
    const atributos = atributosJSON ? JSON.parse(atributosJSON as string) : [];

    // Crear el producto en la base de datos
    const nuevoProducto = await prisma.productos.create({
      data: {
        nombre: nombre as string,
        precio: parseFloat(precio as string),
        descripcion: descripcion as string,
        cantidad: parseInt(cantidad as string),
        idCategoria: parseInt(idCategoria as string),
        idProductor: 2,
        fechaActualizacion: new Date(new Date().toISOString()),
      },
    });

    await Promise.all(
      atributos.map(async (atributo: { nombre: string; valor: string }) => {
        await prisma.atributo.create({
          data: {
            nombre: atributo.nombre,
            valor: atributo.valor,
            idProducto: nuevoProducto.idProductos, // Asociar el atributo con el producto recién creado
          },
        });
      })
    );

    // Subir las imágenes a Cloudinary y guardar las rutas en la base de datos
    // ...

    return NextResponse.json({ message: nuevoProducto.idProductos }, { status: 200 });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
