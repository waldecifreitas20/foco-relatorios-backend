/*
  Warnings:

  - Added the required column `client` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerProtocol` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "protocol" TEXT NOT NULL PRIMARY KEY,
    "plate" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "providerProtocol" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "hour" TEXT NOT NULL
);
INSERT INTO "new_Order" ("date", "hour", "plate", "protocol", "service", "status") SELECT "date", "hour", "plate", "protocol", "service", "status" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
