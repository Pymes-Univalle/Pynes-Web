'use client'
import DeleteIcon from '@/DeleteIcon';
import EditIcon from '@/EditIcon';
import EyeIcon from '@/EyeIcon';
import { Button, Link, Pagination, Popover, PopoverContent, PopoverTrigger, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'

interface Producto {
    estado:number;
    fechaActualizacion: Date;
}

export default function Mostrar() {

    const router = useRouter();
    const [page, setPage] = useState(1);
    const rowsPerPage = 3;
    const [productosD , setProductor] = useState([]);

    const producto: Producto = {
        estado: 0,
        fechaActualizacion: new Date(new Date().toISOString()),
    };

    const Reload = () => {
        axios.get("/api/producto")
        .then((res) =>{
            if(res.data && res.data.data){
                setProductor(res.data.data);
            }

            
        })
        .catch((error) => {
            console.log("Error eal obtener los datos de la Api" + error);
        })    
    }

    useEffect(() => {
        axios.get("/api/producto")
        .then((res) =>{
            if(res.data && res.data.data){
                setProductor(res.data.data);
            }

            
        })
        .catch((error) => {
            console.log("Error eal obtener los datos de la Api" + error);
        })
    }, []);

    const pages = Math.ceil(productosD.length / rowsPerPage);
    const items = useMemo(() =>{
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return productosD.slice(start,end);
    }, [page, productosD]);

    const ClickDetalles = (id: any) => {
        router.push(`/Producto/Detalles?id=${id}`);
    };

    const ClickEditar = (id: any) => {
        router.push(`/Producto/Editar?id=${id}`);
    };

    const handleDeleteConfirm = async (id: any) => {
        try {
            await axios.delete(`/api/producto/${id}`, {
                data: {

                    estado: producto.estado,
                }
            });

            // if (response.status === 200) {
            //     window.location.reload();
            // } else {
            //     console.log("Error al actualizar el producto");
            // }
           Reload();

        } catch (error) {
            console.log("Error en la solicitud PUT(Delete)" + error);
        }
    };

    return (
    <>
        <div className="text-black bg-blanco p-4">
            <h1 className="text-center text-2x1 mb-4" > Lista de Productos</h1>
            <Link href="/Producto/Crear" className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Crear Productos
        </Link>
        <Table
          aria-label="Example table with client side pagination"
          bottomContent = {
            <div className='flex w-full justify-center'>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color='secondary'
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}

                />
            </div>
          }
          classNames={{
            wrapper: "min-h-[222px]"
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
                    <TableRow key={item['idProductos']}>
                        <TableCell>
                            <div className="flex gap-4">
                                {item['idProductos']}
                            </div>
                        </TableCell>
                        <TableCell>{item['nombre']}</TableCell>
                        <TableCell>{item['precio']}</TableCell>
                        <TableCell>{item['cantidad']}</TableCell>
                        <TableCell>{item['categoria']['nombre']}</TableCell>

                        <TableCell>
                            <Button 
                                className='flex items-center text-black hover:text-gray-800'
                                color='primary'
                                onClick={() => ClickDetalles(item['idProductos']) }
                            >
                            <EyeIcon className='w-6 h-6 text-black' />
                            Ver
                            </Button>
                            
                        </TableCell>

                        
                        <TableCell>
                            <Button 
                                className='flex items-center text-black hover:text-gray-800'
                                color='success'
                                onClick={() => ClickEditar(item['idProductos']) }
                            >
                            <EditIcon className='w-6 h-6 text-black' />
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
        </div>
        

    </>
    )
}