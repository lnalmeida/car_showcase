-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "CatTransmissionType" AS ENUM ('manual', 'automatic', 'semiAutomatic', 'cvt', 'automatized', 'dct');

-- CreateEnum
CREATE TYPE "CarFuelType" AS ENUM ('gasoline', 'alchool', 'flex', 'diesel', 'electric', 'hibrid');

-- CreateEnum
CREATE TYPE "CarStatus" AS ENUM ('available', 'sold', 'reserved');

-- CreateEnum
CREATE TYPE "VehicleCategory" AS ENUM ('car', 'motorcycle');

-- CreateEnum
CREATE TYPE "CarType" AS ENUM ('hatch', 'sedan', 'suv', 'crossover', 'pickup', 'wagon', 'convertible', 'coupe', 'minivan', 'van', 'utility');

-- CreateEnum
CREATE TYPE "MotorcycleType" AS ENUM ('street', 'sport', 'touring', 'scooter', 'trail', 'custom', 'offroad', 'naked');

-- CreateEnum
CREATE TYPE "CarBrand" AS ENUM ('AUDI', 'BMW', 'BYD', 'CAOA_CHERY', 'CHEVROLET', 'CHRYSLER', 'CITROEN', 'FIAT', 'FORD', 'GREAT_WALL', 'HONDA', 'HYUNDAI', 'JAC', 'JAGUAR', 'JEEP', 'KIA', 'LAND_ROVER', 'LEXUS', 'MERCEDES_BENZ', 'MINI', 'MITSUBISHI', 'NISSAN', 'PEUGEOT', 'PORSCHE', 'RAM', 'RENAULT', 'SUBARU', 'SUZUKI', 'TOYOTA', 'VOLKSWAGEN', 'VOLVO');

-- CreateEnum
CREATE TYPE "MotorcycleBrand" AS ENUM ('APRILIA', 'BENELLI', 'BMW', 'BROS', 'CABALLERO', 'CALOI', 'CAN_AM', 'CF_MOTO', 'DAFRA', 'DUCATI', 'GAS_GAS', 'HARLEY_DAVIDSON', 'HONDA', 'HUSQVARNA', 'INDIAN', 'KAWASAKI', 'KTM', 'KYMCO', 'MOTO_GUZZI', 'PIAGGIO', 'ROYAL_ENFIELD', 'SHINERAY', 'SUZUKI', 'TRIUMPH', 'VESPA', 'YAMAHA', 'ZERO');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW');

-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateTable
CREATE TABLE "dealership_info" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'JF Veículos',
    "address" TEXT NOT NULL DEFAULT 'Av. Leonel de Moura Brizola, nº 1990, Pilar, Duque de Caxias, RJ',
    "phone" TEXT DEFAULT '+55 21 98217-4174',
    "email" TEXT DEFAULT 'contato@jfveiculospillar.com.br',
    "website" TEXT DEFAULT 'https://jfveiculospillar.com.br',
    "socialMedia" TEXT DEFAULT 'https://www.instagram.com/jfveiculospillar/',
    "logoUrl" TEXT DEFAULT 'https://jfveiculospillar.com.br/logo.png',
    "description" TEXT DEFAULT 'A JF Veículos é uma concessionária localizada em Pilar, Duque de Caxias, RJ, especializada na venda de carros e motos novos e seminovos. Oferecemos uma ampla gama de veículos de qualidade, com opções para todos os gostos e orçamentos. Nossa equipe está pronta para ajudar você a encontrar o veículo ideal.',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "workingHourId" TEXT NOT NULL,

    CONSTRAINT "dealership_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "imageUrl" TEXT,
    "phone" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_saved_vehicles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "savedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_saved_vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL,
    "category" "VehicleCategory" NOT NULL DEFAULT 'car',
    "carType" "CarType",
    "motorcycleType" "MotorcycleType",
    "carBrand" "CarBrand",
    "motorcycleBrand" "MotorcycleBrand",
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "color" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "seats" INTEGER,
    "doors" INTEGER,
    "engineSize" DOUBLE PRECISION NOT NULL,
    "mileage" INTEGER NOT NULL,
    "fuelType" "CarFuelType" NOT NULL DEFAULT 'gasoline',
    "transmission" "CatTransmissionType" NOT NULL DEFAULT 'manual',
    "description" TEXT,
    "images" TEXT[],
    "optinals" TEXT[],
    "carStatus" "CarStatus" NOT NULL DEFAULT 'available',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visit_bookings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dealershipInfoId" TEXT NOT NULL,
    "visitDate" DATE NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vehicleId" TEXT,

    CONSTRAINT "visit_bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "working_hours" (
    "id" TEXT NOT NULL,
    "dealershipInfoId" TEXT NOT NULL,
    "dayOfWeek" "DayOfWeek" NOT NULL,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "openTime" TEXT NOT NULL,
    "closeTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "working_hours_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_clerkUserId_key" ON "users"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_clerkUserId_idx" ON "users"("clerkUserId");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_name_idx" ON "users"("name");

-- CreateIndex
CREATE INDEX "users_phone_idx" ON "users"("phone");

-- CreateIndex
CREATE INDEX "user_saved_vehicles_userId_idx" ON "user_saved_vehicles"("userId");

-- CreateIndex
CREATE INDEX "user_saved_vehicles_vehicleId_idx" ON "user_saved_vehicles"("vehicleId");

-- CreateIndex
CREATE UNIQUE INDEX "user_saved_vehicles_userId_vehicleId_key" ON "user_saved_vehicles"("userId", "vehicleId");

-- CreateIndex
CREATE INDEX "vehicles_carStatus_idx" ON "vehicles"("carStatus");

-- CreateIndex
CREATE INDEX "vehicles_category_idx" ON "vehicles"("category");

-- CreateIndex
CREATE INDEX "vehicles_featured_idx" ON "vehicles"("featured");

-- CreateIndex
CREATE INDEX "vehicles_price_idx" ON "vehicles"("price");

-- CreateIndex
CREATE INDEX "vehicles_category_carType_carBrand_idx" ON "vehicles"("category", "carType", "carBrand");

-- CreateIndex
CREATE INDEX "vehicles_category_motorcycleType_motorcycleBrand_idx" ON "vehicles"("category", "motorcycleType", "motorcycleBrand");

-- CreateIndex
CREATE INDEX "vehicles_carStatus_category_idx" ON "vehicles"("carStatus", "category");

-- CreateIndex
CREATE INDEX "vehicles_featured_category_idx" ON "vehicles"("featured", "category");

-- CreateIndex
CREATE INDEX "vehicles_carBrand_model_idx" ON "vehicles"("carBrand", "model");

-- CreateIndex
CREATE INDEX "vehicles_motorcycleBrand_model_idx" ON "vehicles"("motorcycleBrand", "model");

-- CreateIndex
CREATE INDEX "vehicles_model_idx" ON "vehicles"("model");

-- CreateIndex
CREATE INDEX "vehicles_year_idx" ON "vehicles"("year");

-- CreateIndex
CREATE INDEX "vehicles_fuelType_idx" ON "vehicles"("fuelType");

-- CreateIndex
CREATE INDEX "vehicles_transmission_idx" ON "vehicles"("transmission");

-- CreateIndex
CREATE INDEX "vehicles_engineSize_idx" ON "vehicles"("engineSize");

-- CreateIndex
CREATE INDEX "vehicles_mileage_idx" ON "vehicles"("mileage");

-- CreateIndex
CREATE INDEX "vehicles_color_idx" ON "vehicles"("color");

-- CreateIndex
CREATE INDEX "vehicles_createdAt_idx" ON "vehicles"("createdAt");

-- CreateIndex
CREATE INDEX "vehicles_carStatus_price_idx" ON "vehicles"("carStatus", "price");

-- CreateIndex
CREATE INDEX "vehicles_category_year_price_idx" ON "vehicles"("category", "year", "price");

-- CreateIndex
CREATE INDEX "vehicles_featured_carStatus_category_idx" ON "vehicles"("featured", "carStatus", "category");

-- CreateIndex
CREATE INDEX "visit_bookings_userId_idx" ON "visit_bookings"("userId");

-- CreateIndex
CREATE INDEX "visit_bookings_dealershipInfoId_idx" ON "visit_bookings"("dealershipInfoId");

-- CreateIndex
CREATE INDEX "visit_bookings_visitDate_idx" ON "visit_bookings"("visitDate");

-- CreateIndex
CREATE INDEX "visit_bookings_status_idx" ON "visit_bookings"("status");

-- CreateIndex
CREATE INDEX "working_hours_dealershipInfoId_idx" ON "working_hours"("dealershipInfoId");

-- CreateIndex
CREATE INDEX "working_hours_dayOfWeek_idx" ON "working_hours"("dayOfWeek");

-- CreateIndex
CREATE INDEX "working_hours_isOpen_idx" ON "working_hours"("isOpen");

-- CreateIndex
CREATE UNIQUE INDEX "working_hours_dealershipInfoId_dayOfWeek_key" ON "working_hours"("dealershipInfoId", "dayOfWeek");

-- AddForeignKey
ALTER TABLE "user_saved_vehicles" ADD CONSTRAINT "user_saved_vehicles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_saved_vehicles" ADD CONSTRAINT "user_saved_vehicles_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visit_bookings" ADD CONSTRAINT "visit_bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visit_bookings" ADD CONSTRAINT "visit_bookings_dealershipInfoId_fkey" FOREIGN KEY ("dealershipInfoId") REFERENCES "dealership_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visit_bookings" ADD CONSTRAINT "visit_bookings_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "working_hours" ADD CONSTRAINT "working_hours_dealershipInfoId_fkey" FOREIGN KEY ("dealershipInfoId") REFERENCES "dealership_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddCheckConstraint - Garante que os campos carType e motorcycleType sejam preenchidos corretamente baseado na categoria do veículo.
ALTER TABLE "vehicles" ADD CONSTRAINT "check_vehicle_type" CHECK (
  (category = 'car' AND "carType" IS NOT NULL AND "motorcycleType" IS NULL) OR
  (category = 'motorcycle' AND "motorcycleType" IS NOT NULL AND "carType" IS NULL)
);
