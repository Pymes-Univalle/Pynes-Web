
/*
import React from "react";
import { Input } from "@nextui-org/react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

export default function App() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
    <Input
      label="Contraseña"
      type={isVisible ? "text" : "password"}
      endContent={
        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <FaEye className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
    /> 
    <Card className="container">
    <CardHeader className="flex gap-3">
      <Image
        alt="nextui logo"
        height={40}
        radius="sm"
        src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
        width={40}
      />
      <div className="flex flex-col">
        <p className="text-md">NextUI</p>
        <p className="text-small text-default-500">nextui.org</p>
      </div>
    </CardHeader>
    <Divider/>
    <CardBody>
      <p>Make beautiful websites regardless of your design experience.</p>
    </CardBody>
    <Divider/>
    <CardFooter>
      <Link
        isExternal
        showAnchorIcon
        href="https://github.com/nextui-org/nextui"
      >
        Visit source code on GitHub.
      </Link>
    </CardFooter>
  </Card>
    </>
    

    
  );
}
*/
/*
import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue} from "@nextui-org/react";
import { users } from "@/prueba";

export default function App() {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

  return (
    <>
    <div className="text-black" >
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
        <TableColumn key="name">NAME</TableColumn>
        <TableColumn key="role">ROLE</TableColumn>
        <TableColumn key="status">STATUS</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.name}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}
            </TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
    </div>
    </>
    
  );
}*/
/*
import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Image, Tooltip , Link, Button } from "@nextui-org/react";
import { organizations } from "@/prueba";
import EditIcon from "@/EditIcon";
import DeleteIcon from "@/DeleteIcon";
import EyeIcon from "@/EyeIcon";

export default function App() {
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
                <Link href={`/editar/${item.id}`} >
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
*/

"use client"

import { usuario } from '@prisma/client';
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '@nextui-org/react';

export default function Home() {

  const [user, setUser] = useState<usuario>({
    id: 0,
    nombre: '',
    correo: '',
    contrasena: '',
    celular: '',
    estado: 1,
    fechaRegistro: new Date(),
    fechaActualizacion: new Date()

  });

  console.log(user.nombre);



  const addUser = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const resp = await axios.post('/api/organizacion/', {
        nombre: user.nombre,
        correo: user.correo,
        contrasena: user.contrasena,
        celular: user.celular
      });
      console.log('Respuesta del servidor:', resp);
      // Resto del código si es necesario
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }

 
  };

  // Update specific input field
  const HandleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUser(prevState => ({ ...prevState, [e.target.name]: e.target.value }))

  return (
<>
  <h1>Users</h1>
  <form className='text-black bg-blanco'>
    <Input onChange={HandleChange} value={user.nombre} type="text" name="nombre" placeholder="nombre" />
    <br />
    <Input onChange={HandleChange} value={user.correo} type="email" name="correo" placeholder="correo" />
    <br />
    <Input onChange={HandleChange} value={user.contrasena} type="password" name="contrasena" placeholder="contrasena" />
    <br />
    <Input onChange={HandleChange} value={user.celular}  name="celular" placeholder="celular" />
    <br />
    <div style={{ marginTop: "5px" }}>
      <button onClick={addUser}>Add User</button>
      
    </div>
  </form>
</>


  
  );
}