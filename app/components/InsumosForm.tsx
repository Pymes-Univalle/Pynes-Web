import React from "react";
import {Input, Button, Card, CardHeader, CardBody} from "@nextui-org/react";

export default function InsumosForm() {
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
                <form className="py-4 mt-4 border-t flex flex-col gag-5">
                    <div>
                        <Input
                            key="outside"
                            type="text"
                            label="Nombre"
                            labelPlacement="outside"
                            className="mt-10"
                        />
                        <Input
                            key="outside"
                            type="number"
                            label="Precio"
                            labelPlacement="outside"
                            className="mt-10"
                        />
                        <Button color="primary" type="submit" className="mt-8">
                            Submit
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    </>
}