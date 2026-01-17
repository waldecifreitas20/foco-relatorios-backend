-- CreateTable
CREATE TABLE "Order" (
    "protocol" TEXT NOT NULL PRIMARY KEY,
    "plate" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "hour" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "service" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SpecialBudget" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "wheelDolliesQtd" INTEGER NOT NULL,
    "additionalWheels" INTEGER NOT NULL,
    "daysParked" INTEGER NOT NULL,
    "isUprighted" BOOLEAN NOT NULL,
    "isGroundWithdraw" BOOLEAN NOT NULL,
    "isOffRoad" BOOLEAN NOT NULL,
    "origin" TEXT NOT NULL,
    "destiny" TEXT NOT NULL,
    "workerBase" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "orderProtocol" TEXT NOT NULL,
    CONSTRAINT "SpecialBudget_orderProtocol_fkey" FOREIGN KEY ("orderProtocol") REFERENCES "Order" ("protocol") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MobilityService" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "destiny" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "type" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "totalDistance" INTEGER NOT NULL,
    "passengersQtd" INTEGER NOT NULL,
    "vehicleModel" TEXT NOT NULL,
    "orderProtocol" TEXT NOT NULL,
    CONSTRAINT "MobilityService_orderProtocol_fkey" FOREIGN KEY ("orderProtocol") REFERENCES "Order" ("protocol") ON DELETE RESTRICT ON UPDATE CASCADE
);
