import React from "react";
import { useState } from "react";
import {Input, Button, Card, CardHeader, CardBody} from "@nextui-org/react";

function AdminGlobalForm() {
    //Api
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [correo, setCorreo] = useState("")
    const [contrasena, setContrasena] = useState("")
    const [celular, setCelular] = useState("")

    //Validaciones
    const [value, setValue] = React.useState("");

    const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const validationState = React.useMemo(() => {
        if (value === "") return undefined;
        return validateEmail(value) ? "valid" : "invalid";
    }, [value]);

    return <>
        <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h1 className="text-3xl font-bold">Admin Global Form</h1>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <form className="py-4 mt-4 border-t flex flex-col gag-5"
                    onSubmit={async (e) =>  {
                        e.preventDefault();
                        //console.log(nombre, ' ', apellido, ' ', correo, ' ', contraseña, ' ', celular, ' ', estado)
                    
                        const res = await fetch('/api/usuarios', {
                            method: 'POST',
                            body: JSON.stringify({
                                nombre,
                                apellido,
                                correo,
                                contrasena,
                                celular
                            }),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        const data = await res.json()
                        console.log(data)
                    }}
                    >
                    <div>
                        <Input
                            key="outside-nombres"
                            type="text"
                            label="Nombres"
                            labelPlacement="outside"
                            className="mt-10"
                            onChange={(e) => setNombre(e.target.value)}
                        />
                        <Input
                            key="outside-apellidos"
                            type="text"
                            label="Apellidos"
                            labelPlacement="outside"
                            className="mt-10"
                            onChange={(e) => setApellido(e.target.value)}
                        />
                        <Input
                            isRequired
                            key="outside-email"
                            type="email"
                            label="Correo Electronico"
                            labelPlacement="outside"
                            //className="mt-10"
                            className={`mt-10 ${
                                validationState === "invalid" ? "label-danger" : "label-success"
                              }`}
                            //color={validationState === "invalid" ? "danger" : "success"}
                            errorMessage={validationState === "invalid" && "Please enter a valid email"}
                            validationState={validationState}
                            onValueChange={setValue}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                        <Input
                            isRequired
                            key="outside-contrasena"
                            type="password"
                            label="Contraseña"
                            labelPlacement="outside"
                            className="mt-10"
                            onChange={(e) => setContrasena(e.target.value)}
                        />
                        <Input

                            key="outside-celular"
                            type="text"
                            label="Celular"
                            labelPlacement="outside"
                            className="mt-10"
                            onChange={(e) => setCelular(e.target.value)}
                        />
                        {/* <Input
                            key="outside"
                            type="number"
                            label="Estado"
                            labelPlacement="outside"
                            className="mt-10"
                            onChange={(e) => setEstado(parseInt(e.target.value))}
                        /> */}
                        <Button color="primary" type="submit" className="mt-8">
                            Submit
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    </>
}

export default AdminGlobalForm;