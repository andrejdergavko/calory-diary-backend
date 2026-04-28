/*
  Rename the stored quantity columns to weight so existing values remain intact.
*/
-- AlterTable
ALTER TABLE "FoodEntry" 
RENAME COLUMN "quantity" TO "weight";
