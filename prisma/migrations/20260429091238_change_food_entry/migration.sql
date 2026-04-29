/*
  Warnings:

  - You are about to drop the column `calories` on the `FoodEntry` table. All the data in the column will be lost.
  - You are about to drop the column `carbs` on the `FoodEntry` table. All the data in the column will be lost.
  - You are about to drop the column `fat` on the `FoodEntry` table. All the data in the column will be lost.
  - You are about to drop the column `protein` on the `FoodEntry` table. All the data in the column will be lost.
  - Added the required column `carbsPer100g` to the `FoodEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fatPer100g` to the `FoodEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proteinPer100g` to the `FoodEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FoodEntry" DROP COLUMN "calories",
DROP COLUMN "carbs",
DROP COLUMN "fat",
DROP COLUMN "protein",
ADD COLUMN     "carbsPer100g" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fatPer100g" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "proteinPer100g" DOUBLE PRECISION NOT NULL;
