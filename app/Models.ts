interface Produccion {
    Insumo_idInsumo: number;
    Produccion_id: number;
    cantidad: number;
}

interface Producto {
    idProductos: number;
    nombre: string;
    precio: string;
    descripcion: string;
    idCategoria: number;
    cantidad: number;
    idProductor: number;
    estado: number;
    fechaRegistro: string;
    fechaActualizacion: string;
    fechaVencimiento: string | null;
    mainIndex: number;
}

interface Productor {
    idProductor: number;
    puesto: string;
    latitud: number;
    longitud: number;
    idOrganizacion: number;
    estado: number;
    fechaRegistro: string;
    fechaActualizacion: string;
}

export interface InsumosProduccion {
    id: number;
    idProductos: number;
    idProductor: number;
    estado: number;
    canrtidad: number;
    fechaRegistro: string;
    fechaActualizacion: string;
    insumoproduccion: Produccion[];
    productos: Producto;
    productor: Productor;
}