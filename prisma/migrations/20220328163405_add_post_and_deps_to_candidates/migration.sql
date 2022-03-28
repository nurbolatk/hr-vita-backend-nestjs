/*
  Warnings:

  - Added the required column `departmentId` to the `candidates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `positionId` to the `candidates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "candidates" ADD COLUMN     "departmentId" INTEGER NOT NULL,
ADD COLUMN     "positionId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "positions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
