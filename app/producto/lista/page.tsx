'use client'
import React from "react";

import { Card, CardFooter, Image, Button, image } from "@nextui-org/react";

export default function page() {

  const images = [
    "https://www.laurafuentes.soy/wp-content/uploads/2023/01/almuerzos-saludables_wp-featured.jpg",
    "https://www.elmueble.com/medio/2023/03/16/recetas-sanas_f45fa664_230316141534_900x900.jpg",
    "https://www.diariamenteali.com/medias/comida-divertida-para-tus-hijos-1900Wx500H?context=bWFzdGVyfGltYWdlc3wxOTA5NTh8aW1hZ2UvanBlZ3xoNjgvaDE5LzkwNzQyODkwNDk2MzAvY29taWRhLWRpdmVydGlkYS1wYXJhLXR1cy1oaWpvc18xOTAwV3g1MDBIfGM2NjhjZTUxZTUyZjdhYjczNTk0NTRhNmI3NjVjZmRkMTYyMTQ4MThlZGFlZTcyMjQ5ZWRlMTRiYWU4NmQyYTY",
    "https://marketplace.canva.com/EAFAf5N3QTw/1/0/900w/canva-historia-promocion-comida-juvenil-negro-pF6a7TNjyiw.jpg",
    "https://media.traveler.es/photos/640eeb200c46a95f113e4c62/4:3/w_1851,h_1388,c_limit/GettyImages-1320079717.jpg",
    "https://t1.uc.ltmcdn.com/es/posts/0/8/0/como_dejar_de_comer_tanto_43080_600.jpg",
    "https://marketplace.canva.com/EAFfSxDQ5MU/1/0/900w/canva-historia-de-instagram-para-restaurante-de-comida-mexicana-jPOv7tMUoqM.jpg"
  ];

  return (
    <div className="h-full w-screen bg-white flex justify-center">
      <div className="max-w-7xl h-fit w-full bg-white columns-2 sm:columns-4 p-4 pb-0 space-y-4">
          {images.map((imagen, index) => (
            <Card key={index} isFooterBlurred radius="lg" className="border-none">
            <Image
              alt="Woman listing to music"
              className="object-cover h-auto"
              src={imagen}
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] ml-1 z-10">
              <p className="text-tiny text-white/80">Available soon.</p>
              <Button
                className="text-tiny text-white bg-amarillo"
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
              >
                Detalles
              </Button>
            </CardFooter>
          </Card>
          ))}
      </div>
    </div>
  );
}
