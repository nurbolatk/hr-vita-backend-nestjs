/*
  Warnings:

  - You are about to drop the column `datetime` on the `interviews` table. All the data in the column will be lost.
  - Added the required column `date` to the `interviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end` to the `interviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `interviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `interviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "interviews" DROP COLUMN "datetime",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "end" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "start" TIMESTAMP(3) NOT NULL;
