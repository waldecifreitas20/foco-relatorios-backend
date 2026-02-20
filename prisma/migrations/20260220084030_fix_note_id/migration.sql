/*
  Warnings:

  - The primary key for the `OrderNote` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `OrderNote` table without a default value. This is not possible if the table is not empty.

*/
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
    "updatedAt" DATETIME NOT NULL,
    "eta" INTEGER,
    "agentName" TEXT,
    "hasChecklist" BOOLEAN DEFAULT false
);
INSERT INTO "new_Order" ("agentName", "client", "createdAt", "eta", "hasChecklist", "plate", "provider", "service", "status", "ticket", "updatedAt") SELECT "agentName", "client", "createdAt", "eta", "hasChecklist", "plate", "provider", "service", "status", "ticket", "updatedAt" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE TABLE "new_OrderNote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderTicket" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "OrderNote_orderTicket_fkey" FOREIGN KEY ("orderTicket") REFERENCES "Order" ("ticket") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderNote" ("createdAt", "note", "orderTicket", "updatedAt") SELECT "createdAt", "note", "orderTicket", "updatedAt" FROM "OrderNote";
DROP TABLE "OrderNote";
ALTER TABLE "new_OrderNote" RENAME TO "OrderNote";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
