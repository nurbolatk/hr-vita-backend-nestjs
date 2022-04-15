/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `candidates` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "candidates" ADD COLUMN     "userId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "candidates_userId_key" ON "candidates"("userId");

-- AddForeignKey
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
