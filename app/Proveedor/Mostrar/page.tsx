
'use client'
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios"; // Importa Axios
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Image, Tooltip, Link, Button } from "@nextui-org/react";
import EditIcon from "@/EditIcon";
import DeleteIcon from "@/DeleteIcon";
import EyeIcon from "@/EyeIcon";
import { useRouter } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: ' Organizaciones',
  description: 'Generated by create next app',
}

export default function Mostrar() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const rowsPerPage = 3;
  const [organizacion, setOrganizations] = useState([]); // Estado para almacenar las organizaciones

  useEffect(() => {
    // Realizar la solicitud GET al servidor para obtener las organizaciones usando Axios
    axios.get("/api/organizacion")
      .then((response) => {
        if (response.data && response.data.data) {
          setOrganizations(response.data.data);
        }
      })
      .catch((error) => console.error("Error al obtener las organizaciones:", error));
  }, []);

  const pages = Math.ceil(organizacion.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return organizacion.slice(start, end);
  }, [page, organizacion]);

  const clic = (id: any) => {
    router.push(`/Organizacion/Detalles?id=${id}`);
  };
  const clicEdit = (id: any) => {
    router.push(`/Organizacion/Editar?id=${id}`);
  };
  return (
    <div className="text-black bg-blanco p-4">
      <h1 className="text-center text-2xl mb-4">Lista de Proveedores</h1>
      <Link href="/Proveedor/Crear" className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Crear Proveedor
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
          <TableColumn key="idOrganizacion">Id</TableColumn>
          <TableColumn key="nombre">Nombre</TableColumn>
          <TableColumn key="celular">Celular</TableColumn>
        
          <TableColumn key="ver">Ver</TableColumn>
          <TableColumn key="editar">Editar</TableColumn>
          <TableColumn key="eliminar">Eliminar</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item['idOrganizacion']}>
              <TableCell>
                <div className="flex gap-4">
                {item['idOrganizacion']}
                </div>
              </TableCell>
              <TableCell>{item['usuario']['nombre']}</TableCell> 
              <TableCell>{item['usuario']['correo']}</TableCell> 
              
              <TableCell>
                <Button
                  className="flex items-center text-black hover:text-gray-800"
                  color="primary"
                  onClick={() => clic(item['idOrganizacion'])}
                >
                  <EyeIcon className="w-6 h-6 text-black" />
                  Ver
                </Button>
              </TableCell>
              <TableCell>
              <Button
                  className="flex items-center text-black hover:text-gray-800"
                  color="success"
                  onClick={() => clicEdit(item['idOrganizacion'])}
                >
                  <EyeIcon className="w-6 h-6 text-black" />
                  Editar
                </Button>
              </TableCell>
              <TableCell>
                <Link href={`/editar/${item['id']}`}>
                  <Button className="flex items-center text-black hover:text-gray-800" color="danger">
                    <DeleteIcon className="w-6 h-6 text-black" />
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
