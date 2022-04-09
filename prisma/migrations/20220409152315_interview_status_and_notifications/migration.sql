-- CreateEnum
CREATE TYPE "InterviewStatus" AS ENUM ('NOT_STARTED', 'FAILED', 'PASSED');

-- AlterTable
ALTER TABLE "interviews" ADD COLUMN     "status" "InterviewStatus" NOT NULL DEFAULT E'NOT_STARTED';

-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "unread" BOOLEAN NOT NULL DEFAULT true,
    "receiverId" INTEGER NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
