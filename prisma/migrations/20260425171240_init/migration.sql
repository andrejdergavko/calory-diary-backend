/*
  Warnings:

  - You are about to drop the column `dailyCalorieTarget` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "dailyCalorieTarget";

-- CreateTable
CREATE TABLE "MacroTarget" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "calories" INTEGER,
    "protein" INTEGER,
    "fat" INTEGER,
    "carbs" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MacroTarget_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MacroTarget_userId_key" ON "MacroTarget"("userId");

-- AddForeignKey
ALTER TABLE "MacroTarget" ADD CONSTRAINT "MacroTarget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
