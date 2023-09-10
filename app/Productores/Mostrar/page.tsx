"use client";
import React, { Component } from "react";
import {
  Table,
  TableHeader,
  Button,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Link,
  Chip,
  Tooltip,
  ChipProps,
  getKeyValue,
} from "@nextui-org/react";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { EyeIcon } from "./EyeIcon";
import { columns, users } from "./data";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

type User = (typeof users)[0];
export class page extends Component {
  render() {
    return (
      <div className="text-black bg-blanco p-4">
        <h1 className="text-center text-2xl mb-4">Lista de Productores</h1>
        <Button
          href="/Organizacion/Crear"
          className=" bg-blue-400 hover:bg-blue-700 text-white py-2 px-4 mb-5"
          radius="full"
        >
          Crear
        </Button>
        <Table
          aria-label="Example table with client side pagination"
          bottomContent={<div className="flex w-full justify-center"></div>}
          classNames={{
            wrapper: "min-h-[222px]",
          }}
          color="warning"
        >
          <TableHeader>
            <TableColumn key="idOrganizacion collapse">Id</TableColumn>
            <TableColumn key="nombre">Nombre</TableColumn>
            <TableColumn key="correo">Correo</TableColumn>
            <TableColumn key="celular">Celular</TableColumn>

            <TableColumn key="crearProductos">Cargo</TableColumn>

            <TableColumn key="ver">Acciones</TableColumn>
           
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="flex gap-4" >1</div>
              </TableCell>
              <TableCell>Juan</TableCell>
              <TableCell>juan@gmail.com</TableCell>
              <TableCell>77513140</TableCell>

              <TableCell>Productor</TableCell>

              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Ver Detalles">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <EyeIcon />
                    </span>
                  </Tooltip>
                  <Tooltip color="warning" content="Editar">
                    <span className="text-warning cursor-pointer active:opacity-50">
                      <EditIcon />
                    </span>
                  </Tooltip>

                  <Tooltip color="danger" content="Eliminar">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <DeleteIcon />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
             
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="flex gap-4" >1</div>
              </TableCell>
              <TableCell>Juan</TableCell>
              <TableCell>juan@gmail.com</TableCell>
              <TableCell>77513140</TableCell>

              <TableCell>Productor</TableCell>

              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Ver Detalles">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <EyeIcon />
                    </span>
                  </Tooltip>
                  <Tooltip color="warning" content="Editar">
                    <span className="text-warning cursor-pointer active:opacity-50">
                      <EditIcon />
                    </span>
                  </Tooltip>

                  <Tooltip color="danger" content="Eliminar">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <DeleteIcon />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
             
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="flex gap-4" >1</div>
              </TableCell>
              <TableCell>Juan</TableCell>
              <TableCell>juan@gmail.com</TableCell>
              <TableCell>77513140</TableCell>

              <TableCell>Productor</TableCell>

              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Ver Detalles">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <EyeIcon />
                    </span>
                  </Tooltip>
                  <Tooltip color="warning" content="Editar">
                    <span className="text-warning cursor-pointer active:opacity-50">
                      <EditIcon />
                    </span>
                  </Tooltip>

                  <Tooltip color="danger" content="Eliminar">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <DeleteIcon />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
             
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="flex gap-4" >1</div>
              </TableCell>
              <TableCell>Juan</TableCell>
              <TableCell>juan@gmail.com</TableCell>
              <TableCell>77513140</TableCell>

              <TableCell>Productor</TableCell>

              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Ver Detalles">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <EyeIcon />
                    </span>
                  </Tooltip>
                  <Tooltip color="warning" content="Editar">
                    <span className="text-warning cursor-pointer active:opacity-50">
                      <EditIcon />
                    </span>
                  </Tooltip>

                  <Tooltip color="danger" content="Eliminar">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <DeleteIcon />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
             
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default page;
