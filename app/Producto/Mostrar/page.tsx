'use client'
import DeleteIcon from '@/DeleteIcon';
import EditIcon from '@/EditIcon';
import EyeIcon from '@/EyeIcon';
import { Button, Link, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'

export default function Mostrar() {

    const router = useRouter();
    const [page, setPage] = useState(1);
    const rowsPerPage = 3;
    const [productosD , setProductor] = useState([]);

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
                                onClick={() => ClickDetalles(item['idProductos']) }
                            >
                            <EditIcon className='w-6 h-6 text-black' />
                            Editar
                            </Button>
                            
                        </TableCell>

                        
                        <TableCell>
                            <Button 
                                className='flex items-center text-black hover:text-gray-800'
                                color='danger'
                                onClick={() => ClickDetalles(item['idProductos']) }
                            >
                            <DeleteIcon className='w-6 h-6 text-black' />
                            Eliminar
                            </Button>
                            
                        </TableCell>

                     
                 

                    </TableRow>
                )}

            </TableBody>
        </Table>
        </div>
        

    </>
    )
}
