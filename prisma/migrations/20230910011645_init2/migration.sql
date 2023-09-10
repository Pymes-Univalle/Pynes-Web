/*
  Warnings:

  - You are about to alter the column `fechaActualizacion` on the `productor` table. The data in that column could be lost. The data in that column will be cast from `VarChar(45)` to `DateTime(0)`.

*/
-- AlterTable
ALTER TABLE `productor` MODIFY `fechaActualizacion` DATETIME(0) NULL;
