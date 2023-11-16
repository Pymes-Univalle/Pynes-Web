'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input } from "@nextui-org/react";

export default function Page() {
  const [ventaData, setVentaData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/detalles/`);
        if (response.status === 200) {
          const data = await response.data;
          const ventaDatos = await data.venta;
          setVentaData(ventaDatos);
          console.log("Datos de la venta (dentro de useEffect):", ventaDatos);
        } else {
          console.error("Error al obtener la Categoria");
        }
      } catch (error) {
        console.error("Error al obtener la Categoria:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedMonth === '') {
      setFilteredData(ventaData);
    } else {
      setFilteredData(ventaData.filter(venta => {
        const ventaDate = new Date(venta['fechaRegistro']);
        const selectedDate = new Date(selectedMonth);
        return ventaDate.getFullYear() === selectedDate.getFullYear() && ventaDate.getMonth() === selectedDate.getMonth();
      }));
    }
  }, [ventaData, selectedMonth]);

  return (
    <>
      <h1>Detalles Ventas</h1>
      <Input
        type="month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      />
      <Table>
        <TableHeader>
          <TableColumn key="nombreProducto">Nombre del Producto</TableColumn>
          <TableColumn key="precio">Precio</TableColumn>
          <TableColumn key="cantidad">Cantidad</TableColumn>
          <TableColumn key="importe">Importe</TableColumn>
          <TableColumn key="fechaVenta">Fecha de Venta</TableColumn>
          <TableColumn key="nombreUsuario">Nombre del Usuario</TableColumn>
        </TableHeader>
        <TableBody items={filteredData}>
          {(venta) => (
            <TableRow key={venta['id']}>
              <TableCell>{venta['productos']['nombre']}</TableCell>
              <TableCell>{venta['productos']['precio']}</TableCell>
              <TableCell>{venta['cantidad']}</TableCell>
              <TableCell>{venta['inporte']}</TableCell>
              <TableCell>{venta['fechaRegistro']}</TableCell>
              <TableCell>{venta['venta']['cliente']['usuario']['nombre']}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
