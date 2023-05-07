/*
  Warnings:

  - A unique constraint covering the columns `[authorId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Like_authorId_key" ON "Like"("authorId");
