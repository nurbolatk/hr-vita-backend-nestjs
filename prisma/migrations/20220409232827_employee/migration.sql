/*
  Warnings:

  - Added the required column `salary` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `firstName` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('NOT_ACCEPTED', 'WORKING', 'FIRED');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "phone" TEXT,
ADD COLUMN     "salary" INTEGER NOT NULL,
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT E'NOT_ACCEPTED',
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL;
