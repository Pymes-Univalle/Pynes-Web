"use client";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios"; // Importa Axios
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Image,
  Tooltip,
  Link,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
} from "@nextui-org/react";
import EditIcon from "@/EditIcon";
import DeleteIcon from "@/DeleteIcon";
import EyeIcon from "@/EyeIcon";
import { useRouter } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: " Organizaciones",
  description: "Generated by create next app",
};

export default function Mostrar() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const rowsPerPage = 3;
  const [organizacion, setOrganizations] = useState([]); // Estado para almacenar las organizaciones
  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    // Realizar la solicitud GET al servidor para obtener las organizaciones usando Axios
    axios
      .get("/api/organizacion")
      .then((response) => {
        if (response.data && response.data.data) {
          setOrganizations(response.data.data);
        }
      })
      .catch((error) =>
        console.error("Error al obtener las organizaciones:", error)
      );
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
      <h1 className="text-center text-2xl mb-4">Lista de Organizaciones</h1>
      <Link
        href="/Organizacion/Crear"
        className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Crear Organizacion
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
          <TableColumn key="apellido">Apellido</TableColumn>
          <TableColumn key="correo">Correo</TableColumn>
          <TableColumn key="celular">Celular</TableColumn>
          <TableColumn key="latitud">Latitud</TableColumn>
          <TableColumn key="longitud">Longitud</TableColumn>
          <TableColumn key="crearProductos">CrearProductos</TableColumn>
          <TableColumn key="nit">Nit</TableColumn>
          <TableColumn key="ver">Ver</TableColumn>
          <TableColumn key="editar">Editar</TableColumn>
          <TableColumn key="eliminar">Eliminar</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item["id"]}>
              <TableCell>
                <div className="flex gap-4">{item["id"]}</div>
              </TableCell>
              <TableCell>{item["nombre"]}</TableCell>
              <TableCell>{item["apellido"]}</TableCell>
              <TableCell>{item["correo"]}</TableCell>
           
              <TableCell>{item["celular"]}</TableCell>
              <TableCell>{item["organizacion"]["latitud"]}</TableCell>
              <TableCell>{item["organizacion"]["longitud"]}</TableCell>
              <TableCell>{item["organizacion"]["crearProductos"]}</TableCell>
              <TableCell>{item["organizacion"]["nit"]}</TableCell>
              <TableCell>
                <Button
                  className="flex items-center text-black hover:text-gray-800"
                  color="primary"
                  onClick={() => clic(item["id"])}
                >
                  <EyeIcon className="w-6 h-6 text-black" />
                  Ver
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  className="flex items-center text-black hover:text-gray-800"
                  color="success"
                  onClick={() => clicEdit(item["id"])}
                >
                  <EditIcon className="w-6 h-6 text-black" />
                  Editar
                </Button>
              </TableCell>
              <TableCell>
                <Popover placement="bottom" showArrow offset={10}>
                <PopoverTrigger>
                  <div>
                    <Button color="danger">Eliminar
                    </Button>
                    
                  </div>
                </PopoverTrigger>
                  <PopoverContent className="w-[240px]">
                    {(titleProps) => (
                      <div className="px-1 py-2 w-full">
                        <p
                          className="text-small font-bold text-foreground"
                          {...titleProps}
                        >
                          Dimensions
                        </p>
                        <div className="mt-2 flex flex-col gap-2 w-full">
                          <Button>Confirmar</Button>
                          {/* Otros elementos van aquí */}
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
  );
}
