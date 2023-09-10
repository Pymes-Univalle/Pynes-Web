-- AlterTable
ALTER TABLE `almaceninsumos` MODIFY `fechaActualizacion` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `cliente` MODIFY `fechaActualizacion` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `detalleventas` MODIFY `fechaActualizacion` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `produccion` MODIFY `fechaActualizacion` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `proveedores` MODIFY `fechaActualizacion` DATETIME(0) NULL;

-- AlterTable
ALTER TABLE `ruta` MODIFY `fechaActualizacion` DATETIME(0) NULL;
