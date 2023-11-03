"use client";
import DeleteIcon from "@/DeleteIcon";
import EditIcon from "@/EditIcon";
import EyeIcon from "@/EyeIcon";
import {
  Button, Link, Pagination, Popover, PopoverContent, PopoverTrigger,
  Table, TableBody, TableCell, TableColumn, TableHeader, TableRow,
  Card, CardBody, CardFooter, Image
} from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

// interface Producto {
//   estado:number;
//   fechaActualizacion: Date;
// }

interface Producto {
  idProductos: number;
  nombre: string;
  precio: number;
  cantidad: number;
  categoria: { nombre: string };
  ruta: { ruta: string; mainIndex: number };
  // estado:number;
  // fechaActualizacion: Date;
}

export default function Mostrar() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const rowsPerPage = 3;
  //const [productosD, setProductos] = useState<any[]>([]);
  const [productos, setProductos] = useState<any[]>([]);
  const [rutaData, setRutaData] = useState<any[]>([]);
  const [imagen, setImagen] = useState("");

  // const producto: Producto = {
  //   estado: 0,
  //   fechaActualizacion: new Date(new Date().toISOString()),
  // };

  const Reload = () => {
    axios.get("/api/producto")
    .then((res) =>{
        if(res.data && res.data.data){
          setProductos(res.data.data);
          setRutaData(res.data.productos.ruta);
        }
    })
    .catch((error) => {
        console.log("Error eal obtener los datos de la Api" + error);
    })
  }

  useEffect(() => {
    Reload();
    console.log(rutaData[1]);
  }, []);

  const pages = Math.ceil(productos.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return productos.slice(start, end);
  }, [page, productos]);

  const ClickDetalles = (id: any) => {
    router.push(`/Producto/Detalles?id=${id}`);
  };

  const ClickEditar = (id: any) => {
    router.push(`/Producto/Editar?id=${id}`);
  };
  const CrearProducto = () => {
    router.push("/Producto/Crear");
  };
  
  const handleDeleteConfirm = async (id: number) => {
    try {
        await axios.delete(`/api/producto/${id}`, {
            data: {
              //estado: producto.estado,
              estado: 0,
            },
        });

       Reload();

    } catch (error) {
        console.log("Error en la solicitud PUT(Delete)" + error);
    }
  };

  return (
    <>
      <div className="text-black bg-blanco p-4">
        <h1 className="text-center text-2x1 mb-4"> Lista de Productos</h1>
        <Link
          onClick={CrearProducto}
          className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Productos
        </Link>

        <div className="gap-3 grid grid-cols-2 sm:grid-cols-4 mt-3">
          {productos.map((item) => (
            <Card
              shadow="sm"
              key={item.idProductos}
              isPressable
              onPress={() => console.log("item pressed")}
            >
              <CardBody className="overflow-visible p-0">
                {item.ruta.map((rutaItem : any, index : number) => (
                  <div key={index}>
                    {rutaItem.mainIndex === index && (  // Compara mainIndex con la posición del array
                      <Image
                        shadow="sm"
                        radius="lg"
                        width="100%"
                        alt={`Image ${rutaItem.mainIndex}`}
                        className="w-full object-cover h-[140px]"
                        src={rutaItem.ruta}
                      />
                    )}
                  </div>
                ))}
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{item.nombre}</b>
                <p className="text-default-500">{item.precio}</p>
                <p className="text-default-500">Images:</p>
              </CardFooter>
            </Card>
          ))}
        </div>

      </div>
    </>
  );
}