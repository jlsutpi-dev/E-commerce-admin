/*
  Warnings:

  - You are about to drop the column `soreId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `storeId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_soreId_fkey";

-- DropIndex
DROP INDEX "Order_soreId_idx";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "soreId",
ADD COLUMN     "storeId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Order_storeId_idx" ON "Order"("storeId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
