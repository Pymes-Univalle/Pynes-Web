/*
  Warnings:

  - You are about to alter the column `latitud` on the `productor` table. The data in that column could be lost. The data in that column will be cast from `Float` to `VarChar(300)`.
  - You are about to alter the column `longitud` on the `productor` table. The data in that column could be lost. The data in that column will be cast from `Float` to `VarChar(300)`.

*/
-- AlterTable
ALTER TABLE `productor` MODIFY `latitud` VARCHAR(300) NOT NULL,
    MODIFY `longitud` VARCHAR(300) NOT NULL;
