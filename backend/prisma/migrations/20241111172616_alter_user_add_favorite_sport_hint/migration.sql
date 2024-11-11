/*
  Warnings:

  - You are about to alter the column `first_name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `last_name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `full_name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(400)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "favorite_sport" VARCHAR(200),
ADD COLUMN     "hint" VARCHAR(400),
ALTER COLUMN "first_name" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "last_name" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "full_name" SET DATA TYPE VARCHAR(400),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(500),
ALTER COLUMN "role" SET DEFAULT 'USER';
