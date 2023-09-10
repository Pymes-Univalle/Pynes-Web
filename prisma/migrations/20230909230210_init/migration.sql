-- CreateTable
CREATE TABLE `almaceninsumos` (
    `Insumos_id` INTEGER NOT NULL,
    `Proveedores_id` INTEGER NOT NULL,
    `cantidad` VARCHAR(45) NOT NULL,
    `estado` TINYINT NOT NULL DEFAULT 1,
    `fechaRegistro` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fechaActualizacion` DATETIME(0) NOT NULL,

    INDEX `fk_Insumos_has_Proveedores_Insumos1_idx`(`Insumos_id`),
    INDEX `fk_Insumos_has_Proveedores_Proveedores1_idx`(`Proveedores_id`),
    PRIMARY KEY (`Insumos_id`, `Proveedores_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `atributo` (
    `idAtributo` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,
    `valor` VARCHAR(45) NOT NULL,
    `idProducto` INTEGER NOT NULL,

    INDEX `id_idx`(`idProducto`),
    PRIMARY KEY (`idAtributo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoria` (
    `idCategoria` INTEGER NOT NULL,
    `nombre` VARCHAR(60) NOT NULL,

    PRIMARY KEY (`idCategoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cliente` (
    `idCliente` INTEGER NOT NULL,
    `direccion` VARCHAR(60) NOT NULL,
    `estado` TINYINT NOT NULL DEFAULT 1,
    `fechaRegistro` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fechaActualizacion` DATETIME(0) NOT NULL,

    INDEX `fk_Cliente_usuario1_idx`(`idCliente`),
    PRIMARY KEY (`idCliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detalleventas` (
    `id` INTEGER NOT NULL,
    `idVenta` INTEGER NOT NULL,
    `idProducto` INTEGER NOT NULL,
    `cantidad` TINYINT NOT NULL,
    `nit` VARCHAR(45) NOT NULL,
    `precioUnitario` DECIMAL(18, 2) NOT NULL,
    `inporte` DECIMAL(18, 2) NOT NULL,
    `estado` TINYINT NOT NULL DEFAULT 1,
    `fechaRegistro` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fechaActualizacion` DATETIME(0) NOT NULL,

    INDEX `id_idx`(`idVenta`),
    INDEX `id_idx1`(`idProducto`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `insumo` (
    `idInsumo` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,
    `precio` DECIMAL(18, 2) NOT NULL,
    `cantidad` INTEGER NOT NULL,

    PRIMARY KEY (`idInsumo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `organizacion` (
    `idOrganizacion` INTEGER NOT NULL,
    `latitud` VARCHAR(60) NOT NULL,
    `longitud` VARCHAR(60) NOT NULL,
    `crearProductos` TINYINT NULL,
    `nit` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`idOrganizacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produccion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idProductos` INTEGER NOT NULL,
    `idInsumo` INTEGER NOT NULL,
    `idProductor` INTEGER NOT NULL,
    `estado` TINYINT NOT NULL DEFAULT 1,
    `canrtidad` INTEGER NOT NULL,
    `fechaRegistro` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fechaActualizacion` DATETIME(0) NOT NULL,

    INDEX `fk_id_insumo_idx`(`idInsumo`),
    INDEX `fk_id_productor_idx`(`idProductor`),
    INDEX `fk_id_productos_idx`(`idProductos`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productor` (
    `idProductor` INTEGER NOT NULL,
    `puesto` VARCHAR(45) NOT NULL,
    `latitud` FLOAT NOT NULL,
    `longitud` FLOAT NOT NULL,
    `idOrganizacion` INTEGER NOT NULL,
    `estado` TINYINT NOT NULL DEFAULT 1,
    `fechaRegistro` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fechaActualizacion` VARCHAR(45) NOT NULL,

    INDEX `id_idx`(`idOrganizacion`),
    PRIMARY KEY (`idProductor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productos` (
    `idProductos` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,
    `precio` DECIMAL(18, 2) NOT NULL,
    `descripcion` VARCHAR(100) NULL,
    `idCategoria` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `idProductor` INTEGER NOT NULL,

    INDEX `id_idx`(`idCategoria`),
    INDEX `id_idx1`(`idProductor`),
    PRIMARY KEY (`idProductos`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proveedores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,
    `celular` VARCHAR(45) NOT NULL,
    `estado` TINYINT NOT NULL DEFAULT 1,
    `fechaRegistro` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fechaActualizacion` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ruta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ruta` VARCHAR(45) NOT NULL,
    `idProducto` INTEGER NOT NULL,
    `estado` TINYINT NOT NULL,
    `fechaRegistro` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fechaActualizacion` DATETIME(0) NOT NULL,

    INDEX `id_idx`(`idProducto`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,
    `apellido` VARCHAR(45) NOT NULL,
    `correo` VARCHAR(45) NOT NULL,
    `contrasena` VARCHAR(45) NOT NULL,
    `celular` VARCHAR(45) NOT NULL,
    `estado` TINYINT NOT NULL DEFAULT 1,
    `fechaRegistro` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fechaActualizacion` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `venta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idCliente` INTEGER NOT NULL,
    `total` DECIMAL(18, 2) NOT NULL,
    `estado` TINYINT NOT NULL DEFAULT 1,
    `fechaRegistro` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `id_idx`(`idCliente`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `almaceninsumos` ADD CONSTRAINT `fk_Insumos_has_Proveedores_Insumos1` FOREIGN KEY (`Insumos_id`) REFERENCES `insumo`(`idInsumo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `almaceninsumos` ADD CONSTRAINT `fk_Insumos_has_Proveedores_Proveedores1` FOREIGN KEY (`Proveedores_id`) REFERENCES `proveedores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `atributo` ADD CONSTRAINT `fk_id_productos5` FOREIGN KEY (`idProducto`) REFERENCES `productos`(`idProductos`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cliente` ADD CONSTRAINT `fk_Cliente_usuario1` FOREIGN KEY (`idCliente`) REFERENCES `usuario`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `detalleventas` ADD CONSTRAINT `fk_id_producto` FOREIGN KEY (`idProducto`) REFERENCES `productos`(`idProductos`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `detalleventas` ADD CONSTRAINT `fk_id_venta` FOREIGN KEY (`idVenta`) REFERENCES `venta`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `organizacion` ADD CONSTRAINT `fk_Organizacion_usuario1` FOREIGN KEY (`idOrganizacion`) REFERENCES `usuario`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `produccion` ADD CONSTRAINT `fk_id_insumo` FOREIGN KEY (`idInsumo`) REFERENCES `insumo`(`idInsumo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `produccion` ADD CONSTRAINT `fk_id_productor2` FOREIGN KEY (`idProductor`) REFERENCES `productor`(`idProductor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `produccion` ADD CONSTRAINT `fk_id_productos2` FOREIGN KEY (`idProductos`) REFERENCES `productos`(`idProductos`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `productor` ADD CONSTRAINT `fk_Productores_usuario1` FOREIGN KEY (`idProductor`) REFERENCES `usuario`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `productor` ADD CONSTRAINT `fk_id_organizacion` FOREIGN KEY (`idOrganizacion`) REFERENCES `organizacion`(`idOrganizacion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `productos` ADD CONSTRAINT `fk_id_categoria` FOREIGN KEY (`idCategoria`) REFERENCES `categoria`(`idCategoria`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `productos` ADD CONSTRAINT `fk_id_productor` FOREIGN KEY (`idProductor`) REFERENCES `productor`(`idProductor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ruta` ADD CONSTRAINT `fk_id_productos` FOREIGN KEY (`idProducto`) REFERENCES `productos`(`idProductos`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `venta` ADD CONSTRAINT `fk_id_cliente` FOREIGN KEY (`idCliente`) REFERENCES `cliente`(`idCliente`) ON DELETE NO ACTION ON UPDATE NO ACTION;
