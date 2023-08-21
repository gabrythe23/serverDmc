/*
  Warnings:

  - You are about to drop the `TourPassengerInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TourPassengerInfo" DROP CONSTRAINT "TourPassengerInfo_tourDateId_fkey";

-- DropForeignKey
ALTER TABLE "TourPassengerInfo" DROP CONSTRAINT "TourPassengerInfo_tourId_fkey";

-- DropTable
DROP TABLE "TourPassengerInfo";

-- CreateTable
CREATE TABLE "TourTraveller" (
    "id" TEXT NOT NULL,
    "main" BOOLEAN NOT NULL DEFAULT false,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "type" "PassengerType" NOT NULL DEFAULT 'EVERYONE',
    "tourId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TourTraveller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TourTravellerInfoDate" (
    "tourDateId" TEXT NOT NULL,
    "tourTravellerId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currency" "Currency" NOT NULL DEFAULT 'EUR',
    "max" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TourTravellerInfoDate_pkey" PRIMARY KEY ("tourDateId","tourTravellerId")
);

-- AddForeignKey
ALTER TABLE "TourTraveller" ADD CONSTRAINT "TourTraveller_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TourTravellerInfoDate" ADD CONSTRAINT "TourTravellerInfoDate_tourDateId_fkey" FOREIGN KEY ("tourDateId") REFERENCES "TourDate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TourTravellerInfoDate" ADD CONSTRAINT "TourTravellerInfoDate_tourTravellerId_fkey" FOREIGN KEY ("tourTravellerId") REFERENCES "TourTraveller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
