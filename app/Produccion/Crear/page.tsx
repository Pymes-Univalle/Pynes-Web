'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Select, SelectItem, Input } from "@nextui-org/react";

export default function ProductionForm() {
  const [insumos, setInsumos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productores, setProductores] = useState([]);
  const [selectedItems, setSelectedItems] = useState([
    { insumo: "", cantidad: "" },
  ]);
  const [selectedProducto, setSelectedProducto] = useState("");
  const [selectedProductor, setSelectedProductor] = useState("");
  const [cantidadProduccion, setCantidadProduccion] = useState(0);

  useEffect(() => {
    // Obtener la lista de insumos, productos y productores desde tu API
    axios
      .get("/api/insumosSam")
      .then((response) => setInsumos(response.data.data));

    axios
      .get("/api/producto")
      .then((response) => setProductos(response.data.data));

    axios
      .get("/api/productor")
      .then((response) => {
        setProductores(response.data.data);
      })
      .catch((error) => {
        console.log("Error al cargar productores desde la API", error);
      });
  }, []);

  const handleAddItem = () => {
    setSelectedItems([...selectedItems, { insumo: "", cantidad: "" }]);
  };

  async function handleSave(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    // Crear la lista de insumos con sus cantidades
    const insumosProduccion = selectedItems.map((item) => ({
      Insumo_idInsumo: parseInt(item.insumo),
      cantidad: parseInt(item.cantidad),
    }));

    // Datos para crear una producción
    const productionData = {
      idProductos: parseInt(selectedProducto),
      idProductor: parseInt(selectedProductor),
      canrtidad: cantidadProduccion,
      insumoproduccion: { create: insumosProduccion }, // Relacionar insumosProduccion
    };

    console.log("Datos de Producción:", productionData);

    // Envía los datos al servidor para crear la producción
    axios
      .post("/api/insumosProduccion", productionData)
      .then((response) => {
        console.log("Producción registrada con éxito." );
      })
      .catch((error) => {
        console.error("Error al registrar la producción:", error);
      });
  }

  return (
    <>
      <div className="bg-blanco min-h-screen text-black ">
        <div className="mx-auto max-w-5xl">
          <h1 className=" text-black text-2xl text-center font-bold mb-8 mt-5">
            {" "}
            Crear Producción{" "}
          </h1>
          <form
            className="p-5 border-1 shadow"
            method="Post"
            onSubmit={handleSave}
          >
            <div className="mb-5 mt-5">
              {selectedItems.map((selectedItem, index) => (
                <div key={index}>
                  <Select
                    id={`insumos-${index}`}
                    label="Insumos"
                    placeholder="Selecciona un Insumo"
                    value={selectedItem.insumo}
                    onChange={(event) => {
                      const value = event.target.value;
                      const updatedItems = [...selectedItems];
                      updatedItems[index] = {
                        ...selectedItem,
                        insumo: value,
                      };
                      setSelectedItems(updatedItems);
                    }}
                  >
                    {insumos.map((insumo) => (
                      <SelectItem
                        className="text-black"
                        key={insumo["idInsumo"]}
                        value={insumo["idInsumo"]}
                      >
                        {insumo["nombre"]}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    label="Cantidad"
                    placeholder="Ingrese la cantidad"
                    value={selectedItem.cantidad}
                    onChange={(event) => {
                      const value = event.target.value;
                      const updatedItems = [...selectedItems];
                      updatedItems[index] = {
                        ...selectedItem,
                        cantidad: value,
                      };
                      setSelectedItems(updatedItems);
                    }}
                  />
                </div>
              ))}
              <button type="button" onClick={handleAddItem}>
                Agregar Insumo
              </button>
            </div>
            <Input
              label="Cantidad de Producción"
              placeholder="Ingrese la cantidad de producción"
              value={cantidadProduccion.toString()}
              onChange={(event) => setCantidadProduccion( parseInt(event.target.value))}
            />
            <div>
              <Select
                id="productos"
                label="Productos"
                placeholder="Selecciona un Producto"
                value={selectedProducto}
                onChange={(event) => setSelectedProducto(event.target.value)}
              >
                {productos.map((producto) => (
                  <SelectItem
                    className="text-black"
                    key={producto["idProductos"]}
                    value={producto["idProductos"]}
                  >
                    {producto["nombre"]}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div>
              <Select
                id="productor"
                label="Productor"
                placeholder="Selecciona un Productor"
                value={selectedProductor}
                onChange={(event) => setSelectedProductor(event.target.value)}
              >
                {productores.map((productor) => (
                  <SelectItem
                    className="text-black"
                    key={productor["idProductor"]}
                    value={productor["idProductor"]}
                  >
                    {productor["puesto"]}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <Button type="submit">Enviar</Button>
          </form>
        </div>
      </div>
    </>
  );
}
