// Importa tus modelos de Prisma
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params{
    params: {id:string};
}

export async function GET(request:Request, {params}: Params) {
  try {
      
    //console.log(params.id)
    const productoId = Number(params.id);
    const productos = await prisma.productos.findFirst({
      where:{
        idProductos: productoId,
          
      },
      include:{
        ruta:true,
        categoria: true,
        atributo: true,
      },
    });

    if (!productos) {
      return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 });
    }

    return NextResponse.json({productos})

  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function PUT(request: Request, {params}: Params) {
  try {
    const formData = await request.formData();
    const productoId = Number(params.id); // Identificador del producto a actualizar

    // Verifica si el producto existe en la base de datos
    const producto = await prisma.productos.findUnique({
      where: { idProductos: productoId },
      include: {
        ruta: true,
        categoria: true,
        atributo: true,
      },
    });

    if (!producto) {
      return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 });
    }

    // Procesa los campos a actualizar, por ejemplo: nombre, precio, descripción, etc.
    const nombre = formData.get('nombre');
    const precio = formData.get('precio');
    const descripcion = formData.get('descripcion');
    const cantidad = formData.get('cantidad');
    const idCategoria = formData.get('idCategoria');
    const idProductor = formData.get('idProductor');
    const fechaVencimientoValue = formData.get('fechaVencimineto');
    let fechaVencimiento: Date | undefined;

    if (fechaVencimientoValue && typeof fechaVencimientoValue === 'string') {
      // Convertir la cadena de fecha a un objeto de fecha
      fechaVencimiento = new Date(fechaVencimientoValue);
    }
      
    const atributosJSON = formData.get('atributos');
    const atributos = atributosJSON ? JSON.parse(atributosJSON as string) : [];

    const productoActualizado = await prisma.productos.update({
      where: { idProductos: productoId },
      data: {
        nombre: nombre as string,
        precio: parseFloat(precio as string),
        descripcion: descripcion as string,
        cantidad: parseInt(cantidad as string),
        idCategoria: parseInt(idCategoria as string),
        idProductor: parseInt(idProductor as string),
        fechaActualizacion: new Date(new Date().toISOString()),
        fechaVencimiento: fechaVencimiento || null
      },
    });

    await Promise.all(
      atributos.map(async (atributo: { nombre: string; valor: string }) => {
        await prisma.atributo.create({
          data: {
            nombre: atributo.nombre,
            valor: atributo.valor,
            idProducto: productoActualizado.idProductos, // Asociar el atributo con el producto recién creado
          },
        });
      })
    );

    const ulrs: string[] = [];

    for (let index = 0; ; index++) {
      const fieldName = `imagen_${index}`;
      const imageData = formData.get(fieldName);

      if (!imageData) {
        // Si no se encuentra más información bajo ese campo, sal del bucle
        break;
      }

      const imageBlob = new Blob([imageData as unknown as Buffer], { type: 'image/jpeg' });

      // Crear un nuevo FormData para la imagen y agregarla a él
      const imageFormData = new FormData();
      imageFormData.append('file', imageBlob, 'image.jpg');
      imageFormData.append('upload_preset', 'test_pymes');
      
    }

    // Actualiza la imagen en Cloudinary (supongamos que tienes la URL de la imagen antigua)
    const newImageData = formData.get('nuevaImagen');
    if (newImageData) {
      // Elimina la imagen antigua de Cloudinary (opcional)
      // await cloudinary.v2.uploader.destroy(producto.imagenPublicId);

      // Sube la nueva imagen a Cloudinary
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/di9vckxy5/image/upload',
        {
          method: 'POST',
          body: newImageData,
        }
      );

      if (response.ok) {
        const responseData = await response.json() as { secure_url: string };
        const newImageUrl = responseData.secure_url;
        ulrs.push(newImageUrl);
        console.log("Imagen subida a Cloudinary:", newImageUrl);

        // Actualiza el producto en la base de datos
        // Actualiza la referencia de la imagen en tu base de datos con la nueva URL
        await prisma.productos.update({
          where: { idProductos: productoId },
          data: {
            nombre: nombre as string,
            precio: precio as string,
            descripcion: descripcion as string,
            fechaActualizacion: new Date(),
            // imagen: newImageUrl,
          },
        });
      }

      return NextResponse.json({ message: 'Producto actualizado con éxito' }, { status: 200 });
    }

    return NextResponse.json({ message: 'Producto actualizado con éxito' }, { status: 200 });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
