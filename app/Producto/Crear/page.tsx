'use client'
import { Button, Input, Select, SelectItem, Textarea, Image } from '@nextui-org/react';
import React, { use, useEffect, useState } from 'react';

import axios from 'axios';

import { url } from 'inspector';

export default function Page() {

    const [image, setImage] = useState<File | undefined>(undefined);
   
    
    const [imageUrl , setUrl] = useState<String>('')


    const [idCategoria, setIdCategoria] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [atributos, setAtributos] = useState<{ nombre: string; valor: string; }[]>([{ nombre: '', valor: '' }]);
    const [imagePreviews, setImagePreviews] = useState<{ src: string; alt: string }[]>([]);

    useEffect(() => {
      // Realiza la solicitud a la API utilizando Axios
      axios.get('/api/categoria')
        .then((response) => {
          // response.data debe contener la lista de categorías desde tu API
          setCategorias(response.data.data);
        })
        .catch((error) => {
          console.error('Error al cargar categorías desde la API:', error);
        });
    }, []); // Se ejecuta solo una vez al montar el componente
  
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = event.target.value;
      setIdCategoria(selectedValue);
      console.log(selectedValue);
    };

    

    function handleFile(event: React.ChangeEvent<HTMLInputElement>): void {
        const file = event.target.files?.[0];
        setImage(file);
        console.log(file);

        if(file){
          const url = URL.createObjectURL(file);
          setUrl(url);
          console.log("Esto es la " + url);
        }
    }

    function createImagePreview(file: File): Promise<{ src: string; alt: string }> {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve({
            src: event.target?.result as string,
            alt: file.name,
          });
        };
        reader.readAsDataURL(file);
      });
    }
    

    function sumbit(event: React.MouseEvent<HTMLButtonElement>): void {
      console.log("CLick en el submit")
      console.log("Imágenes a enviar:", imagePreviews);
      console.log("Atributos:", atributos);
      /*
      if(!image){
        console.log("Porfavor seleccione una imagen");
        return;
      }

      const data = new FormData();

      data.append('file', image); // Correctly appends the image file
      data.append('upload_preset', 'test_pymes');
      data.append('cloud_name', 'di9vckxy5');
      data.append('filename','hola');
  

      fetch('https://api.cloudinary.com/v1_1/di9vckxy5/image/upload',{
        method: 'post',
        body: data
      }).then((response) => {
        console.log("Se subio correctamente la imagen " + response)

      }).catch((errors) => {
        console.log(errors)
      })*/

    }

    function removeImagePreview(index: number): void {
      const updatedImagePreviews = [...imagePreviews];
      updatedImagePreviews.splice(index, 1);
      setImagePreviews(updatedImagePreviews);
    }

    async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>): Promise<void> {
      const files = event.target.files;
    
      if (files) {
        const newImagePreviews = await Promise.all(Array.from(files).map(createImagePreview));
        setImagePreviews([...imagePreviews, ...newImagePreviews]);
        
      }
    }
    function handleAtributoChange(index: number, field: 'nombre' | 'valor', value: string): void {
      const updatedAtributos = [...atributos];
      updatedAtributos[index][field] = value;
      setAtributos(updatedAtributos);
    }

    function addAtributo(): void {
      setAtributos([...atributos, { nombre: '', valor: '' }]);
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
          <form className='p-5 border-1 shadow'>
           
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
              <Input 
                id="precio" 
                key="outside" 
                label="Precio" 
                required 
                
                />
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
                onChange={ (selectedValue: any) => handleCategoryChange(selectedValue)  }
                className="mb-5 max-w-xs"
              >
                {categorias.map((category) => (
                  <SelectItem className='text-black' key={category['idCategoria']} value={category['idCategoria']}>
                    {category['nombre']}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className="mb-5">
              <Input 
                id="cantidad" 
                key="outside" 
                label="Cantidad" 
                required 
                
                />
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
                      <button type="button" onClick={() => removeImagePreview(index)}>
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
                    label="Nombre"
                    value={atributo.nombre}
                    onChange={(e) => handleAtributoChange(index, 'nombre', e.target.value)}
                  />
                  <Input
                    type="text"
                    label="Valor"
                    value={atributo.valor}
                    onChange={(e) => handleAtributoChange(index, 'valor', e.target.value)}
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
            <Button onClick={sumbit}>
                Enviar 
            </Button>
          </form>
        
           
      
        </div>
          
      </div>
    
    </>
    );
}