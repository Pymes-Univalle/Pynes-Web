'use client'
import DeleteIcon from '@/DeleteIcon';
import EditIcon from '@/EditIcon';
import EyeIcon from '@/EyeIcon';
import { Button, Link, Pagination, Popover, PopoverContent, PopoverTrigger, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react'


interface Categoria{
    nombre: String
}

export default function page() {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const rowsPerPage = 3;
    const [Categoria , setCategoria] = useState([]);

    const pages = Math.ceil(Categoria.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return Categoria.slice(start, end);
    }, [page, Categoria]);

    useEffect(() => {
        // Realizar la solicitud GET al servidor para obtener las organizaciones usando Axios
        axios.get("/api/categoria")
          .then((response) => {
            if (response.data && response.data.data) {
                setCategoria(response.data.data);
            }
          })
          .catch((error) => console.error("Error al obtener las organizaciones:", error));
      }, []);



      const clic = (id: any) => {
        router.push(`/Categoria/Detalles?idProveedor=${id}`);
      };
      const clicEdit = (id: any) => {
        router.push(`/Categoria/Editar?id=${id}`);
      };  

      const handleDeleteConfirm = async (id: any) => {
        
      }
    return (
    <>
<div className="text-black bg-blanco p-4">
      <h1 className="text-center text-2xl mb-4">Lista de Categorias</h1>
      <Link href="/Categoria/Crear" className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Crear Categoria
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
          
        
          <TableColumn key="ver">Ver</TableColumn>
          <TableColumn key="editar">Editar</TableColumn>
          <TableColumn key="eliminar">Eliminar</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item['idCategoria']}>
              <TableCell>
                <div className="flex gap-4">
                {item['idCategoria']}
                </div>
              </TableCell>
              <TableCell>{item['nombre']}</TableCell> 
           
              
              <TableCell>
                <Button
                  className="flex items-center text-black hover:text-gray-800"
                  color="primary"
                  onClick={() => clic(item['id'])}
                >
                  <EyeIcon className="w-6 h-6 text-black" />
                  Ver
                </Button>
              </TableCell>
              <TableCell>
              <Button
                  className="flex items-center text-black hover:text-gray-800"
                  color="success"
                  onClick={() => clicEdit(item['id'])}
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
                          <Button color="success" onClick={ ()=> handleDeleteConfirm(item["id"])    }>
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
