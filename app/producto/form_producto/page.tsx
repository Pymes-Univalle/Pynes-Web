"use client";
import React from "react";
import {
  Input,
  Select,
  SelectItem,
  Textarea,
  Checkbox,

  cn,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { Divider } from "@nextui-org/react";

export default function FormProduct() {
  const animals = [
    {
      label: "Cat",
      value: "cat",
      description: "The second most popular pet in the world",
    },
    {
      label: "Dog",
      value: "dog",
      description: "The most popular pet in the world",
    },
    {
      label: "Elephant",
      value: "elephant",
      description: "The largest land animal",
    },
    { label: "Lion", value: "lion", description: "The king of the jungle" },
    { label: "Tiger", value: "tiger", description: "The largest cat species" },
    {
      label: "Giraffe",
      value: "giraffe",
      description: "The tallest land animal",
    },
    {
      label: "Dolphin",
      value: "dolphin",
      description: "A widely distributed and diverse group of aquatic mammals",
    },
    {
      label: "Penguin",
      value: "penguin",
      description: "A group of aquatic flightless birds",
    },
    {
      label: "Zebra",
      value: "zebra",
      description: "A several species of African equids",
    },
    {
      label: "Shark",
      value: "shark",
      description:
        "A group of elasmobranch fish characterized by a cartilaginous skeleton",
    },
    {
      label: "Whale",
      value: "whale",
      description: "Diverse group of fully aquatic placental marine mammals",
    },
    {
      label: "Otter",
      value: "otter",
      description: "A carnivorous mammal in the subfamily Lutrinae",
    },
    {
      label: "Crocodile",
      value: "crocodile",
      description: "A large semiaquatic reptile",
    },
  ];

  const user = {
    name: "Junior Garcia",
    avatar: "https://avatars.githubusercontent.com/u/30373425?v=4",
    username: "jrgarciadev",
    url: "https://twitter.com/jrgarciadev",
    role: "Software Developer",
    status: "Active",
  };

  const [isSelected, setIsSelected] = React.useState(false);
  const [groupSelected, setGroupSelected] = React.useState([]);
  const [rutas, setRutas] = React.useState([]);

  return (
    <div className="h-full w-screen bg-white flex justify-center inset-0">
      <div className="bg-crema w-full collapse sm:visible"></div>
      <div className="bg-gris w-full z-10 p-10 flex flex-col gap-10">
        <h1 className="text-center text-3xl">Formulario de Productos</h1>
        <Divider></Divider>
        <section className="flex flex-row gap-8">
          <Checkbox
            aria-label={user.name}
            classNames={{
              base: cn(
                "inline-flex w-full max-w-md bg-content1",
                "hover:bg-content2 items-center justify-start",
                "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                "data-[selected=true]:border-primary"
              ),
              label: "w-full",
            }}
            isSelected={isSelected}
            onValueChange={setIsSelected}
          >
            <div className="w-full flex justify-between gap-2">
              <div className="w-full flex justify-between gap-2">
                <p>El producto caduca</p>
                <div className="bg-green-600 rounded-full w-6"></div>
              </div>
            </div>
          </Checkbox>
          <Checkbox
            aria-label={user.name}
            classNames={{
              base: cn(
                "inline-flex w-full max-w-md bg-content1",
                "hover:bg-content2 items-center justify-start",
                "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                "data-[selected=true]:border-primary"
              ),
              label: "w-full",
            }}
            isSelected={isSelected}
            onValueChange={setIsSelected}
          >
            <div className="w-full flex justify-between gap-2">
              <p>El producto no caduca</p>
              <div className="bg-red-600 rounded-full w-6"></div>
            </div>
          </Checkbox>
        </section>
        <Input
          key="outside"
          type="name"
          label="Nombre del producto"
          labelPlacement="outside"
        />
        <section className="flex flex-row gap-8">
          <Input
            key="outside"
            type="name"
            label="Precio"
            labelPlacement="outside"
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
          />
          <Select
            labelPlacement="outside"
            label="Categoria"
            className="max-w-xs"
          >
            {animals.map((animal) => (
              <SelectItem key={animal.value} value={animal.value}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>
        </section>
        <section className="flex flex-row gap-8">
          <Textarea
            variant="flat"
            label="Descripcion"
            labelPlacement="outside"
            placeholder="Enter your description"
            className="col-span-12 md:col-span-6 mb-6 md:mb-0"
          />
          <Textarea
            variant="flat"
            label="Detalles"
            labelPlacement="outside"
            placeholder="Enter your description"
            className="col-span-12 md:col-span-6 mb-6 md:mb-0"
          />
        </section>
        <Divider></Divider>
        <section className="grid grid-cols-2 gap-8">
          <Table
            aria-label="Example static collection table"
            className="col-span-1"
          >
            <TableHeader>
              <TableColumn>Ruta</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>Example de ruta</TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>Example de ruta</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="gap-8 flex flex-col">
            <Input
              key="outside"
              type="name"
              label="Tag Name"
              labelPlacement="outside"
            />
            <Button size="md" color="warning" className="w-full">Add Tag</Button>
          </div>
        </section>
      </div>
    </div>
  );
}
