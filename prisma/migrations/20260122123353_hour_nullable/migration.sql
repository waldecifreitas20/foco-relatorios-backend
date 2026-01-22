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
    "hour" TEXT
);
INSERT INTO "new_Order" ("client", "date", "hour", "plate", "protocol", "providerProtocol", "service", "status") SELECT "client", "date", "hour", "plate", "protocol", "providerProtocol", "service", "status" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
