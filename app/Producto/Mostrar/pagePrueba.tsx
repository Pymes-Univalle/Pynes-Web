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
    // axios.get("/api/ruta")
    // .then((res) =>{
    //     if(res.data && res.data.data){
    //       setRutaData(res.data.data);
    //     }
    // })
    .catch((error) => {
        console.log("Error eal obtener los datos de la Api" + error);
    })
  }

  useEffect(() => {
    //fetchData();
    Reload();
    console.log()

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

  console.log(productos);
  //console.log(rutaData);

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
        <Table
          aria-label="Example table with client side pagination"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          classNames={{
            wrapper: "min-h-[222px]",
          }}
        >
          <TableHeader>
            <TableColumn key="id">Id</TableColumn>
            <TableColumn key="nombre">Nombre</TableColumn>
            <TableColumn key="precio">Precio</TableColumn>
            <TableColumn key="cantidad">Cantidad</TableColumn>
            <TableColumn key="categoria">Categoria</TableColumn>

            <TableColumn key="ver">Ver</TableColumn>
            <TableColumn key="editar">Editar</TableColumn>
            <TableColumn key="eliminar">Eliminar</TableColumn>
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item["idProductos"]}>
                <TableCell>
                  <div className="flex gap-4">{item["idProductos"]}</div>
                </TableCell>
                <TableCell>{item["nombre"]}</TableCell>
                <TableCell>{item["precio"]}</TableCell>
                <TableCell>{item["cantidad"]}</TableCell>
                <TableCell>{item["categoria"]["nombre"]}</TableCell>

                <TableCell>
                  <Button
                    className="flex items-center text-black hover:text-gray-800"
                    color="primary"
                    onClick={() => ClickDetalles(item["idProductos"])}
                  >
                    <EyeIcon className="w-6 h-6 text-black" />
                    Ver
                  </Button>
                </TableCell>

                <TableCell>
                  <Button
                    className="flex items-center text-black hover:text-gray-800"
                    color="success"
                    onClick={() => ClickEditar(item["idProductos"])}
                  >
                    <EditIcon className="w-6 h-6 text-black" />
                    Editar
                  </Button>
                </TableCell>

                <TableCell>
                  <Popover

                    showArrow
                    backdrop="opaque"
                    placement="right"
                    classNames={{
                        base: "py-3 px-4 border border-default-200 bg-gradient-to-br from-white to-default-300 dark:from-default-100 dark:to-default-50",
                        arrow: "bg-default-200",
                    }}
                    >
                    <PopoverTrigger>
                        <Button color="danger">
                        Eliminar
                        <DeleteIcon />
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
                            <Button color="success" onClick={ ()=> handleDeleteConfirm(item["idProductos"])    }>
                                Confirmar
                            </Button>
                            <Button >Cancelar</Button>
                            </div>
                        </div>
                        )}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* <div className="gap-3 grid grid-cols-2 sm:grid-cols-4 mt-3">
          {productos.map((item) => (
            <Card shadow="sm" key={item["idProductos"]} isPressable onPress={() => console.log("item pressed")}>
              <CardBody className="overflow-visible p-0">
              {item.ruta.map((rutaItem : any) => (
                  <div key={rutaItem.mainIndex}>
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt={`Image ${rutaItem.mainIndex}`}
                      className="w-full object-cover h-[140px]"
                      src={rutaItem.ruta}
                    />
                  </div>
              ))}
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{item.nombre}</b>
                <p className="text-default-500">{item.precio}</p>
                <p className="text-default-500">Images:</p>
                {item.ruta.map((rutaItem : any) => (
                  <p className="text-default-500" key={rutaItem.mainIndex}>
                    {`Image ${rutaItem.mainIndex}`}
                  </p>
                ))}
                <p className="text-default-500">Rutas:</p>
                {item.ruta.map((rutaItem : any) => (
                  <p className="text-default-500" key={rutaItem.mainIndex}>
                    {`Ruta ${rutaItem.ruta}`}
                  </p>
                ))}
              </CardFooter>
            </Card>
          ))}
        </div> */}
        <div className="gap-3 grid grid-cols-2 sm:grid-cols-4 mt-3">
          {items.map((item) => (
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
                {item.ruta.map((rutaItem : any, index : number) => (
                  <p className="text-default-500" key={index}>
                    {`Image ${rutaItem.mainIndex}`}
                  </p>
                ))}
                <p className="text-default-500">Rutas:</p>
                {item.ruta.map((rutaItem : any, index : number) => (
                  <p className="text-default-500" key={index}>
                    {`Ruta ${rutaItem.ruta}`}
                  </p>
                ))}
              </CardFooter>
            </Card>
          ))}
        </div>

      </div>
    </>
  );
}