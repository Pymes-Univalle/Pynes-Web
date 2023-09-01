'use client'

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Image, Tooltip , Link, Button } from "@nextui-org/react";
import { organizations } from "@/prueba";
import EditIcon from "@/EditIcon";
import DeleteIcon from "@/DeleteIcon";
import EyeIcon from "@/EyeIcon";
import { useRouter } from 'next/router';



export default function Mostrar() {
  
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(organizations.length / rowsPerPage);

  const items = React.useMemo(() => {
   
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return organizations.slice(start, end);
  }, [page, organizations]);



  return (
    <div className="text-black bg-blanco p-4">
      <h1 className="text-center text-2xl mb-4">Lista de Organizaciones</h1>
      <Link href="/Organizacion/Crear" className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Ir a Otra Página
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
          <TableColumn key="name">Nombre</TableColumn>
          <TableColumn key="email">Correo</TableColumn>
          <TableColumn key="phone">Celular</TableColumn>
          <TableColumn key="latitude">Latitud</TableColumn>
          <TableColumn key="longitude">Longitud</TableColumn>
          <TableColumn key="createProducts">Estado</TableColumn>
          <TableColumn key="nit">Nit</TableColumn>
          <TableColumn key="ver">Ver</TableColumn>
          <TableColumn key="editar">Editar</TableColumn>
          <TableColumn key="eliminar">Eliminar</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
              <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.latitude}</TableCell>
              <TableCell>{item.longitude}</TableCell>
              <TableCell>{item.createProducts}</TableCell>
              <TableCell>{item.nit}</TableCell>

              <TableCell>
                <Link href={`/Organizacion/Detalles/${item.id}`} >
                  
                  <Button className="flex items-center text-black hover:text-gray-800 " color="primary">
                    <EyeIcon className="w-6 h-6  text-black" />
                    Ver
                  </Button>
                </Link>
              </TableCell>

              <TableCell>
                <Link href={`/editar/${item.id}`} >
                  <Button className="flex items-center text-black hover:text-gray-800 "   color="success">
                    <EditIcon className="w-6 h-6  text-black" />
                    Editar
                  </Button>
                </Link>
              </TableCell>

              <TableCell>
                <Link href={`/editar/${item.id}`} >
                  <Button className="flex items-center text-black hover:text-gray-800 "  color="danger">
                    <DeleteIcon className="w-6 h-6  text-black" />
                    Eliminar
                  </Button>
                </Link>
              </TableCell>

              

            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
