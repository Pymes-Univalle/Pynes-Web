"use client";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
  Image,
} from "@nextui-org/react";
import React, { use, useEffect, useState } from "react";

import axios from "axios";

export default function Page() {
  const [idCategoria, setIdCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);
  //Esto seria para el que hizo productor
  const [idProductor, setIdProductor] = useState("");
  const [productores, setProductor] = useState([]);

  const [atributos, setAtributos] = useState<
    { nombre: string; valor: string }[]
  >([{ nombre: "", valor: "" }]);
  const [imagePreviews, setImagePreviews] = useState<
    { src: string; alt: string; file: File }[]
  >([]);

  useEffect(() => {
    // Realiza la solicitud a la API utilizando Axios
    axios
      .get("/api/categoria")
      .then((response) => {
        // response.data debe contener la lista de categorías desde tu API
        setCategorias(response.data.data);
      })
      .catch((error) => {
        console.error("Error al cargar categorías desde la API:", error);
      });

    axios
      .get("/api/productor")
      .then((response) => {
        setProductor(response.data.data);
      })
      .catch((error) => {
        console.log("Error al cargar productores desde la API", error);
      });
  }, []);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setIdCategoria(selectedValue);
  };

  const handleProductorChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = event.target.value;
    setIdProductor(selectedValue);
  };

  async function sumbit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    const nombre =
      (formElements.namedItem("nombre") as HTMLInputElement)?.value || "";
    const precio =
      (formElements.namedItem("precio") as HTMLInputElement)?.value || "";
    const descripcion =
      (formElements.namedItem("descripcion") as HTMLInputElement)?.value || "";
    const cantidad =
      (formElements.namedItem("cantidad") as HTMLInputElement)?.value || "";
    const atributosArray = atributos.map((atributo) => ({
      nombre: atributo.nombre,
      valor: atributo.valor,
    }));

    console.log("CLick en el submit");
    console.log("Imágenes a enviar:", imagePreviews);
    console.log("Atributos:", atributos);
    console.log("Id Categoria", idCategoria);
    console.log("Id Productor", idProductor);
    console.log(
      "Nombre: ",
      nombre,
      " Precio: ",
      precio,
      " descripcion: ",
      descripcion,
      " cantidad: ",
      cantidad
     
    );

    // Crear un objeto FormData
    const formData = new FormData();

    // Adjuntar los datos del producto al FormData
    formData.append("nombre", nombre);
    formData.append("precio", precio);
    formData.append("descripcion", descripcion);
    formData.append("cantidad", cantidad);
    formData.append("idCategoria", idCategoria);

    //Aca adjuntamos el dato del idProductor
    formData.append("idProductor", idProductor);

    formData.append("atributos", JSON.stringify(atributosArray));

    // Adjuntar cada imagen al FormData con un nombre de campo distinto
    imagePreviews.forEach((preview, index) => {
      formData.append(`imagen_${index}`, preview.file);
    });
    
    try {
      // Realizar la solicitud a tu API utilizando axios
      const response = await axios.post("/api/producto/", formData);

      if (response.status === 200) {
        console.log("Datos y imágenes enviados correctamente a la API");
        const productId = response.data.message; // Aquí accedemos al campo del ID
        console.log("El ID es:", productId);
      
      } else {
        console.error("Error al enviar los datos y las imágenes a la API");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud a la API:", error);
    }

  }

  function removeImagePreview(index: number): void {
    const updatedImagePreviews = [...imagePreviews];
    updatedImagePreviews.splice(index, 1);
    setImagePreviews(updatedImagePreviews);
  }

  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    const files = event.target.files;

    if (files) {
      const newImagePreviews = await Promise.all(
        Array.from(files).map(async (file) => ({
          src: URL.createObjectURL(file),
          alt: file.name,
          file,
        }))
      );
      setImagePreviews([...imagePreviews, ...newImagePreviews]);
    }
  }

  function handleAtributoChange(
    index: number,
    field: "nombre" | "valor",
    value: string
  ): void {
    const updatedAtributos = [...atributos];
    updatedAtributos[index][field] = value;
    setAtributos(updatedAtributos);
  }

  function addAtributo(): void {
    setAtributos([...atributos, { nombre: "", valor: "" }]);
  }

  function removeAtributo(index: number): void {
    const updatedAtributos = [...atributos];
    updatedAtributos.splice(index, 1);
    setAtributos(updatedAtributos);
  }

  return (
    <>
      <div className="bg-blanco min-h-screen text-black ">
        <div className="mx-auto max-w-5xl">
          <h1 className=" text-black text-2xl text-center font-bold mb-8 mt-5">
            {" "}
            Crear Producto{" "}
          </h1>
          <form
            id="miFormulario"
            method="post"
            className="p-5 border-1 shadow"
            onSubmit={sumbit}
          >
            <div className="mb-5 mt-5">
              <Input
                id="nombre"
                key="outside"
                type="text"
                label="Nombre"
                required
              />
            </div>
            <div className="mb-5">
              <Input id="precio" key="outside" label="Precio" required />
            </div>
            <div className="mb-5">
              <Textarea
                id="descripcion"
                key="outside"
                label="Descripcion"
                required
              />
            </div>
            <div>
              <Select
                label="Categoría"
                placeholder="Selecciona una categoría"
                value={idCategoria}
                onChange={(selectedValue: any) =>
                  handleCategoryChange(selectedValue)
                }
                className="mb-5 max-w-xs"
              >
                {categorias.map((category) => (
                  <SelectItem
                    className="text-black"
                    key={category["idCategoria"]}
                    value={category["idCategoria"]}
                  >
                    {category["nombre"]}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className="mb-5">
              <Input id="cantidad" key="outside" label="Cantidad" required />
            </div>

            <div>
              <Select
                label="Productor"
                placeholder="Selecciona un Productor"
                value={idProductor}
                onChange={(selectedValue: any) =>
                  handleProductorChange(selectedValue)
                }
                className="mb-5 max-w-xs"
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

            {/*<div className="mb-5">
              <Input type="file" onChange={handleFile}  />
                </div>*/}

            <div className="mb-5">
              <Input type="file" onChange={handleFileChange} multiple />
            </div>

            <div className="mb-5">
              <h2>Imágenes seleccionadas:</h2>
              <div className="flex flex-wrap">
                {imagePreviews.length > 0 && (
                  <div className="mb-5">
                    <h2>Imágenes seleccionadas:</h2>
                    <div className="flex flex-wrap">
                      {imagePreviews.map((image, index) => (
                        <div key={index} className="flex-shrink-0 mr-2">
                          <Image
                            src={image.src}
                            alt={`Previsualización ${index + 1}`}
                            width={200}
                            height={200}
                          />
                          <button
                            type="button"
                            onClick={() => removeImagePreview(index)}
                          >
                            Eliminar
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-5">
              <h2>Atributos:</h2>

              {atributos.map((atributo, index) => (
                <div key={index} className="mb-2">
                  <Input
                    type="text"
                    label={`Atributo ${index + 1} - Nombre`}
                    value={atributo.nombre}
                    onChange={(e) =>
                      handleAtributoChange(index, "nombre", e.target.value)
                    }
                  />
                  <Input
                    type="text"
                    label={`Atributo ${index + 1} - Valor`}
                    value={atributo.valor}
                    onChange={(e) =>
                      handleAtributoChange(index, "valor", e.target.value)
                    }
                  />
                  <button type="button" onClick={() => removeAtributo(index)}>
                    Eliminar Atributo
                  </button>
                </div>
              ))}
              <button type="button" onClick={addAtributo}>
                Agregar Atributo
              </button>
            </div>
            <Button type="submit">Enviar</Button>
          </form>
        </div>
      </div>
    </>
  );
}
