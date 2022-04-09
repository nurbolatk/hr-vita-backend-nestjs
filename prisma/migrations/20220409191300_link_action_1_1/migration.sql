/*
  Warnings:

  - A unique constraint covering the columns `[notificationId]` on the table `link-actions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "link-actions_notificationId_key" ON "link-actions"("notificationId");
