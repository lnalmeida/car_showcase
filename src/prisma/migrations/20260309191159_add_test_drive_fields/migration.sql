-- AlterTable
ALTER TABLE "visit_bookings" ADD COLUMN     "clientEmail" TEXT,
ADD COLUMN     "clientName" TEXT,
ADD COLUMN     "clientPhone" TEXT,
ADD COLUMN     "isTestDrive" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "userId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "sales" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "sellerId" TEXT,
    "buyerName" TEXT NOT NULL,
    "buyerPhone" TEXT,
    "buyerEmail" TEXT,
    "buyerDocument" TEXT,
    "saleDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveryDate" TIMESTAMP(3),
    "saleValue" DECIMAL(10,2) NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "bank" TEXT,
    "installments" INTEGER,
    "downPayment" DECIMAL(10,2),
    "tradeInVehicle" TEXT,
    "tradeInValue" DECIMAL(10,2),
    "observations" TEXT,
    "warrantyType" TEXT NOT NULL,
    "warrantyExpirationDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sales_vehicleId_key" ON "sales"("vehicleId");

-- CreateIndex
CREATE INDEX "sales_sellerId_idx" ON "sales"("sellerId");

-- CreateIndex
CREATE INDEX "sales_saleDate_idx" ON "sales"("saleDate");

-- CreateIndex
CREATE INDEX "visit_bookings_isTestDrive_idx" ON "visit_bookings"("isTestDrive");

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
