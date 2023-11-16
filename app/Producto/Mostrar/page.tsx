"use client";
import DeleteIcon from "@/DeleteIcon";
import EditIcon from "@/EditIcon";
import EyeIcon from "@/EyeIcon";
import {
  Button, Link, Pagination, Popover, PopoverContent, PopoverTrigger,
  Table, TableBody, TableCell, TableColumn, TableHeader, TableRow,
  Card, CardBody, CardFooter, Image, Input
} from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

export default function Mostrar() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const rowsPerPage = 3;
  const [productos, setProductos] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const Reload = () => {
    axios.get("/api/producto")
    .then((res) =>{
        if(res.data && res.data.data){
          setProductos(res.data.data);
        }
    })
    .catch((error) => {
        console.log("Error al obtener los datos de la Api" + error);
    })
  }

  useEffect(() => {
    Reload();
  }, []);

  const pages = Math.ceil(productos.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return productos.slice(start, end);
  }, [page, productos]);

  const filteredProductos = useMemo(() => {
    return productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [productos, searchTerm]);

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

        <Input
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="gap-3 grid grid-cols-2 sm:grid-cols-4 mt-3">
          {filteredProductos.map((item) => (
            <Card
              shadow="sm"
              key={item.idProductos}
            >
              <CardBody className="overflow-visible p-0">
                {item.ruta.map((rutaItem : any, index : number) => (
                  <div key={index}>
                    {item.mainIndex === index && (  // Compara mainIndex con la posición del array
                      <Image
                        shadow="sm"
                        radius="lg"
                        width="100%"
                        alt={`Image ${item.mainIndex}`}
                        className="w-full object-cover h-[160px]"
                        src={rutaItem.ruta}
                      />
                    )}
                  </div>
                ))}
              </CardBody>
              <CardFooter className="text-small justify-between items-center">
                {/* <b>{item.nombre}</b> */}
                {/* <p className="text-default-500">{item.precio}</p> */}
                <Button className="text-tiny" color="primary" radius="full" size="sm"
                  onClick={() => ClickDetalles(item["idProductos"])}>
                  <EyeIcon className="w-6 h-6 text-white" />
                    Ver
                </Button>
                <Button className="text-tiny" color="success" radius="full" size="sm"
                  onClick={() => ClickEditar(item["idProductos"])}>
                  <EditIcon className="w-6 h-6 text-white" />
                    Editar
                </Button>

                <Popover showArrow
                  backdrop="opaque"
                  placement="right"
                  classNames={{
                      base: "py-3 px-4 border border-default-200 bg-gradient-to-br from-white to-default-300 dark:from-default-100 dark:to-default-50",
                      arrow: "bg-default-200",
                  }}>
                  <PopoverTrigger>
                    <Button className="text-tiny" color="danger" radius="full" size="sm">
                      <DeleteIcon className="w-6 h-6 text-white" />
                        Eliminar
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    {(titleProps) => (
                      <div className="px-1 py-2 w-full">
                        <p
                        className="text-small font-bold text-foreground"
                        {...titleProps}
                        >
                        ¿Estás seguro de querer eliminar a {item["nombre"]}?
                        </p>
                        <div className="mt-2 flex flex-col gap-2 w-full">
                        <Button color="success" onClick={() => handleDeleteConfirm(item["idProductos"])}>
                            Confirmar
                        </Button>
                        </div>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>        
              </CardFooter>
            </Card>
          ))}
        </div>

      </div>
    </>
  );
}