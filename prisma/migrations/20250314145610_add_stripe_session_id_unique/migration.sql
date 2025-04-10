/*
  Warnings:

  - A unique constraint covering the columns `[stripeSessionId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Made the column `stripeSessionId` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "stripeSessionId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_stripeSessionId_key" ON "Order"("stripeSessionId");
