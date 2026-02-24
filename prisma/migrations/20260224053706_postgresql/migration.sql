-- CreateTable
CREATE TABLE "Order" (
    "ticket" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eta" INTEGER,
    "agentName" TEXT,
    "hasChecklist" BOOLEAN DEFAULT false,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("ticket")
);

-- CreateTable
CREATE TABLE "OrderNote" (
    "id" SERIAL NOT NULL,
    "orderTicket" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderNote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderNote" ADD CONSTRAINT "OrderNote_orderTicket_fkey" FOREIGN KEY ("orderTicket") REFERENCES "Order"("ticket") ON DELETE RESTRICT ON UPDATE CASCADE;
