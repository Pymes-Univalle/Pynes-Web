"use client";
import React, { useState } from "react";
import {
  Input,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  Link,
  ModalFooter,
} from "@nextui-org/react";

import CryptoJS from "crypto-js";

export default function UpdatePassword() {
  const [modal, setModal] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [contrasenaActual, setContrasenaActual] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [fieldValidations, setFieldValidations] = useState({
    contrasenaActual: true,
    contrasena: true,
    confirmarContrasena: true,
  });
  const [passwordsMatchError, setPasswordsMatchError] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newValidations = {
      contrasenaActual: contrasenaActual.trim() !== "",
      contrasena: contrasena.trim() !== "",
      confirmarContrasena: confirmarContrasena.trim() !== "",
    };

    setFieldValidations(newValidations);

    if (Object.values(newValidations).every((valid) => valid)) {
      if (contrasena !== confirmarContrasena) {
        setPasswordsMatchError("Las contraseñas no coinciden.");
      } else {
        const axios = require("axios");

        try {
          const response = await axios.get(`/api/usuario/11`);
          if (response.status === 200) {
            var usario = response.data;
            console.log(usario);
          }
          if (
            usario.usuario.contrasena ==
            CryptoJS.MD5(contrasenaActual).toString(CryptoJS.enc.Hex)
          ) {
            const resp = await axios.delete("/api/usuario/11", {
              data: {
                contrasena: CryptoJS.MD5(contrasena).toString(CryptoJS.enc.Hex),
              },
            });
            if (resp.status === 200) {
              //console.log(CryptoJS.MD5(contrasena).toString(CryptoJS.enc.Hex));
              setModal(true);
            }
          } else {
            setCurrentPasswordError("La contraseña actual no es correcta.");
          }
        } catch (error: any) {
          console.log(error.message);
        }
      }
    }
  };

  return (
    <div className="bg-black min-h-screen text-blanco ">
      <div className="mx-auto max-w-5xl">
        <h1 className=" text-white text-2xl text-center font-bold mb-8 mt-5">
          Cambiar Contraseña
        </h1>
        <form
          className=" p-5 border-1 shadow"
          method="Post"
          onSubmit={handleSubmit}
        >
          <div className="mt-10">
            <Input
              id="contrasenaActual"
              name="contrasenaActual"
              key="outside"
              type="text"
              label="Contraseña actual"
              labelPlacement="outside"
              required
              onValueChange={setContrasenaActual}
              validationState={
                fieldValidations.contrasenaActual ? "valid" : "invalid"
              }
              errorMessage={
                !fieldValidations.contrasenaActual
                  ? "Campo requerido"
                  : undefined
              }
            />
            <span className="text-red-900">{currentPasswordError}</span>
          </div>
          <div className="mt-10">
            <Input
              id="contrasena"
              name="contrasena"
              key="outside"
              type="text"
              label="Nueva contraseña"
              minLength={6}
              labelPlacement="outside"
              required
              onValueChange={setContrasena}
              validationState={
                fieldValidations.contrasena ? "valid" : "invalid"
              }
              errorMessage={
                !fieldValidations.contrasena ? "Campo requerido" : undefined
              }
            />
          </div>
          <div className="mt-12 mb-10">
            <Input
              id="confirmarContrasena"
              name="confirmarContrasena"
              key="outside"
              type="text"
              label="Confirmar nueva contraseña"
              minLength={6}
              labelPlacement="outside"
              required
              onValueChange={setConfirmarContrasena}
              validationState={
                fieldValidations.confirmarContrasena ? "valid" : "invalid"
              }
              errorMessage={
                !fieldValidations.confirmarContrasena
                  ? "Campo requerido"
                  : undefined
              }
            />
            <span className="text-red-900">{passwordsMatchError}</span>
          </div>

          <Button type="submit" radius="full" className="bg-amarillo">
            Cambiar Contraseña
          </Button>
          <Modal isOpen={modal} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 self-center mt-10">
                    Contraseña Actualizada Correctamente
                  </ModalHeader>

                  <ModalFooter>
                    <Button
                      color="success"
                      as={Link}
                      href="/Productores/Mostrar"
                    >
                      Aceptar
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </form>
      </div>
    </div>
  );
}
