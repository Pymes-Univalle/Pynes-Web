"use client";
import { Button, Input, Select, SelectItem, Textarea, Image, Checkbox, CircularProgress, Progress } from "@nextui-org/react";
import React, { use, useEffect, useState } from "react";
import axios from 'axios';
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/router';

export default function Editar() {

  //const router = useRouter();
  //const { id } = router.query; // Obtener el ID del producto de la URL

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState(null);
  const [rutaData, setRutaData] = useState([]);
  const [atributoData, setAtributoData] = useState([]);
  const valor = useSearchParams();
  const id = valor.get('id');


  //Validaciones 
  
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState("");

  const [idCategoria, setIdCategoria] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");


  //Esto seria para el que hizo productor
  const [id_productor, setIdProductor] = useState("");
  const [productores, setProductores] = useState([]);

  const [tieneFechaVencimiento, setTieneFechaVencimiento] = useState(false);
  const [fechaVencimiento, setFechaVencimiento] = useState("");

  const [atributos, setAtributos] = useState<
    { nombre: string; valor: string }[]
  >([{ nombre: "", valor: "" }]);
  const [imagePreviews, setImagePreviews] = useState<
    { src: string; alt: string; file: File }[]
  >([]);

  useEffect(() => {
    // Realiza la solicitud a la API para cargar datos de categorías y productores
    axios.get("/api/categoria")
    .then((response) => {
      // response.data debe contener la lista de categorías desde tu API
      setCategories(response.data.data);

      // const categoriaProducto = response.data.data.find(({categoria} : any) => categoria.idCategoria === idCategoria);
      
      // if(categoriaProducto){
      //   setIdCategoria(categoriaProducto.idCategoria);
      // }
    })
    .catch((error) => {
      console.error("Error al cargar categorías desde la API:", error);
    });

    axios.get("/api/productor")
    .then((response) => {
      setProductores(response.data.data);

      // const productorProducto = response.data.data.find(({productor} : any) => productor.idProductor === id_productor);

      // if (productorProducto) {
      //   setIdProductor(productorProducto.idProductor);
      // }

    })
    .catch((error) => {
      console.log("Error al cargar productores desde la API", error);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/producto/${id}`);

        if (response.status === 200) {
          const data = response.data;
          const productoData = await data.productos;

          setProducts(productoData);
          setRutaData(productoData.ruta);
          setAtributoData(productoData.atributo);

          setNombreV(productoData.nombre);
          setPrecioV(productoData.precio.toString());
          setDescripcion(productoData.descripcion);
          setCantidad(productoData.cantidad.toString());
          //setIdCategoria(productoData.idCategoria);
          //setCategoriaActual(productoData.idCategoria);
          // Obtén el ID de la categoría actual del producto
          const idCategoriaActual = productoData.idCategoria;
          // Encuentra la categoría correspondiente en la lista de categorías
          const categoriaSeleccionada = categories.find(
            (category) => category["idCategoria"] === idCategoriaActual
          );
          // Verifica si se encontró la categoría y configura el estado 'categoriaActual'
          if (categoriaSeleccionada) {
            setCategoriaSeleccionada(categoriaSeleccionada["idCategoria"]);
          } else {
            console.error("No se encontró la categoría del producto.");
          }
          // Dentro del useEffect
          setCategoriaSeleccionada(productoData.idCategoria);


          setIdProductor(productoData.idProductor);
          setAtributos(productoData.atributos || []);
          setTieneFechaVencimiento(!!productoData.fechaVencimiento);
          setFechaVencimiento(productoData.fechaVencimiento || "");

          //#region Cargar las imágenes del producto
          // const imagenesProducto = productoData.ruta.map((ruta: any, index : any) => ({
          //   src: ruta.ruta,
          //   alt: `Imagen ${index + 1}`,
          //   file: null,
          // }));

          //setImagePreviews(imagenesProducto);
          //#endregion

          //#region Cargar los atributos del producto
          // const atributosProducto = productoData.atributos.map((atributo: any) => ({
          //   nombre: atributo.nombre,
          //   valor: atributo.valor,
          // }));

          // setAtributos(atributosProducto);
          //#endregion

          console.log(productoData);
        } else {
          console.error("Error al obtener el producto:", response.data);
        }

      } catch (error) {
        console.error("Error en la solicitud para obtener el producto:", error);
      }
    };
    fetchData();
  }, [id, categories]);

  const [nombre, setNombreV] = React.useState("");
  const [precio, setPrecioV] = React.useState("");

  const handleNameChange = (value:any) => {
    setNombreV(value);
  }
  const handlePriceChange = (value:any) =>{
    setPrecioV(value);
  }

  const validateNombre = (value: any) => {
    if(typeof value == "string"){
      return value.match(/^[A-Za-z\s]{3,}$/i);
    }
    return false;
  }
  const validatePrecio = (value: any) =>{
    if(typeof value == "string"){
       return value.match(/^\d{2,}$/);
    }
    return false;
  }

  const validationNombre = React.useMemo(() => {
    if(nombre == " ") return undefined;

    return validateNombre(nombre) ? "valid" : "invalid";
  }, [nombre])

  const validationPrecio = React.useMemo(() => {
    if(precio == " ") return undefined;
    return validatePrecio(precio) ? "valid" : "invalid";
  } , [precio])

  //Fin de Validacion

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

  async function submit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    setIsLoading(true);

    const formElements = event.currentTarget.elements;
    const id = (formElements.namedItem("idProducto") as HTMLInputElement)?.value || "";
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

    let fecha;
    let fechaMysql: any;

    if(fechaVencimiento){
      fecha = new Date(fechaVencimiento);
      fechaMysql = fecha.toISOString().slice(0, 19).replace("T", " ");
    }
    
    console.log("CLick en el submit");
    console.log("Imágenes a enviar:", imagePreviews);
    console.log("Atributos:", atributos);
    console.log("Id Categoria", idCategoria);
    console.log("Id Productor", id_productor);
    console.log("Fecha Vencimiento", fechaMysql);
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
    formData.append("idProductor", id_productor);

    formData.append("atributos", JSON.stringify(atributosArray));
    if(tieneFechaVencimiento){
      formData.append("fechaVencimineto" , fechaMysql);
    }

    // Adjuntar cada imagen al FormData con un nombre de campo distinto
    imagePreviews.forEach((preview, index) => {
      formData.append(`imagen_${index}`, preview.file);
    });
    
    try {
      // Realizar la solicitud a tu API utilizando axios
      const response = await axios.put(`/api/producto/${id}`, formData, {
        headers: {'Content-Type': 'multipart/form-data',},
      });

      console.log(nombre, id);

      if (response.status === 200) {

        setIsLoading(false);

        console.log("Datos y imágenes enviados correctamente a la API");
       
        window.location.href = '/Producto/Mostrar';
      
      } else {
        console.error("Error al enviar los datos y las imágenes a la API");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud a la API:", error);
    }

  }

  useEffect(() => {
    // Este efecto se ejecutará cuando 'tieneFechaVencimiento' cambie
    if (!tieneFechaVencimiento) {
      setFechaVencimiento(""); // Limpia la fecha de vencimiento cuando se desmarca el checkbox
    }
  }, [tieneFechaVencimiento]);

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

  if (!products) {
    return <Progress
      size="sm"
      isIndeterminate
      aria-label="Loading..."
      className="max-w-md"
    />
  }

  return (
    <>
      <div className="bg-blanco min-h-screen text-black ">
        <div className="mx-auto max-w-5xl">
          <h1 className=" text-black text-2xl text-center font-bold mb-8 mt-5">
            {" "}
            Editar Producto{" "}
          </h1>
          <form
            id="miFormulario"
            method="post"
            className="p-5 border-1 shadow"
            onSubmit={submit}
          >
            <div className="mb-5 mt-5">
              <Input
                id="nombre"
                key="outside"
                type="text"
                label="Nombre"
                required
                value={products["nombre"]}
                color={validationNombre === "invalid" ? "danger" : "success"}
                errorMessage={validationNombre === "invalid" && "El campo nombre es obligatorio y solo letras"  }
                validationState={validationNombre}
                onValueChange={handleNameChange}
              />
            </div>
            <div className="mb-5">
              <Input id="precio"
               key="outside" 
               label="Precio" 
               required
               value={products["precio"]}
               color={validationPrecio === "invalid" ? "danger" : "success"}
               errorMessage={validationPrecio === "invalid" && "El campo precio es obligatorio"  }
               validationState={validationPrecio}
               onValueChange={handlePriceChange} />
            </div>
            <div className="mb-5">
              <Textarea
                id="descripcion"
                key="outside"
                label="Descripcion"
                required
                value={products["descripcion"]}
              />
            </div>
            <div>
              <Select
                label="Categoría"
                placeholder="Selecciona una categoría"
                //value={products["idCategoria"]["nombre"]}
                //value={idCategoria}
                // onChange={(selectedValue: any) =>
                //   handleCategoryChange(selectedValue)
                // }
                // onChange={(selectedValue: any) =>
                //   setCategoriaActual(selectedValue)
                // }
                value={1}
                
                //value={1}
                onChange={(selectedValue: any) => setCategoriaSeleccionada(selectedValue)}
                className="mb-5 max-w-xs"
              >
                {categories.map((category) => (
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
              <Input id="cantidad" key="outside" label="Cantidad" required value={products["cantidad"]}/>
            </div>

            <div>
              <Select
                label="Productor"
                placeholder="Selecciona un Productor"
                value={id_productor}
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
            <label>
              <Checkbox
                type="checkbox"
                checked={tieneFechaVencimiento}
                onChange={(e) => setTieneFechaVencimiento(e.target.checked)}
              />{" "}
              Tiene Fecha de Vencimiento
            </label>
          </div>
          {tieneFechaVencimiento && (
              <div>
                <Input
                  type="text"
                  label="Fecha de Vencimiento - Nombre"
                  value="Fecha de Vencimiento"
                  disabled
                />
                <Input
                  type="date"
                  label="Fecha de Vencimiento - Valor"
                  placeholder="Ingrese la fecha de vencimiento"
                  value={fechaVencimiento}
                  onChange={(e) => setFechaVencimiento(e.target.value)}
                />
              </div>
            )}
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
            <Button type="submit" color="primary">
                {isLoading ? (
                    <CircularProgress aria-label="Loading..." />
                ): (
                    "Enviar"
                )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}