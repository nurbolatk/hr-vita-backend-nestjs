-- DropForeignKey
ALTER TABLE "approvals" DROP CONSTRAINT "approvals_masterId_fkey";

-- AlterTable
ALTER TABLE "approvals" ALTER COLUMN "masterId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "approvals" ADD CONSTRAINT "approvals_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
