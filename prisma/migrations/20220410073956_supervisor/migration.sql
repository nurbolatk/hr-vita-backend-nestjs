-- AlterTable
ALTER TABLE "users" ADD COLUMN     "supervisorId" INTEGER;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
