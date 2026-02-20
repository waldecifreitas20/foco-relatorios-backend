/*
  Warnings:

  - You are about to drop the `MobilityService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SpecialBudget` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `hour` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `protocol` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `providerProtocol` on the `Order` table. All the data in the column will be lost.
  - Added the required column `provider` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticket` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MobilityService";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SpecialBudget";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "OrderNote" (
    "orderTicket" TEXT NOT NULL PRIMARY KEY,
    "note" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "OrderNote_orderTicket_fkey" FOREIGN KEY ("orderTicket") REFERENCES "Order" ("ticket") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "ticket" TEXT NOT NULL PRIMARY KEY,
    "plate" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eta" INTEGER,
    "agentName" TEXT,
    "hasChecklist" BOOLEAN DEFAULT false
);
INSERT INTO "new_Order" ("client", "plate", "service", "status") SELECT "client", "plate", "service", "status" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
