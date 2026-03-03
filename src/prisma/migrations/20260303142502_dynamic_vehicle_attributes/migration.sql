/*
  Data Preserving Migration: Moves old string values into dynamic relation tables
*/

-- 1. ADD NEW COLUMNS (Without dropping old ones yet)
ALTER TABLE "vehicles" ADD COLUMN "brandId" TEXT, ADD COLUMN "categoryId" TEXT, ADD COLUMN "typeId" TEXT;

-- 2. CREATE NEW TABLES
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "brands" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "vehicle_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "vehicle_types_pkey" PRIMARY KEY ("id")
);

-- 3. CREATE CONSTRAINTS FOR NEW TABLES
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");
CREATE INDEX "brands_categoryId_idx" ON "brands"("categoryId");
CREATE UNIQUE INDEX "brands_name_categoryId_key" ON "brands"("name", "categoryId");
CREATE INDEX "vehicle_types_categoryId_idx" ON "vehicle_types"("categoryId");
CREATE UNIQUE INDEX "vehicle_types_name_categoryId_key" ON "vehicle_types"("name", "categoryId");

ALTER TABLE "brands" ADD CONSTRAINT "brands_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "vehicle_types" ADD CONSTRAINT "vehicle_types_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- 4. MIGRATE CATEGORIES
INSERT INTO "categories" ("id", "name", "createdAt", "updatedAt")
SELECT md5("category"), "category", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM "vehicles"
WHERE "category" IS NOT NULL
GROUP BY "category";

-- 5. MIGRATE BRANDS
INSERT INTO "brands" ("id", "name", "categoryId", "createdAt", "updatedAt")
SELECT md5("vehicleBrand" || "category"), "vehicleBrand", md5("category"), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM "vehicles"
WHERE "vehicleBrand" IS NOT NULL AND "category" IS NOT NULL
GROUP BY "vehicleBrand", "category";

-- 6. MIGRATE VEHICLE TYPES
INSERT INTO "vehicle_types" ("id", "name", "categoryId", "createdAt", "updatedAt")
SELECT md5("vehicleType" || "category"), "vehicleType", md5("category"), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM "vehicles"
WHERE "vehicleType" IS NOT NULL AND "category" IS NOT NULL
GROUP BY "vehicleType", "category";

-- 7. UPDATE VEHICLES WITH NEW IDs
UPDATE "vehicles"
SET "categoryId" = md5("category"),
    "brandId" = md5("vehicleBrand" || "category"),
    "typeId" = md5("vehicleType" || "category")
WHERE "category" IS NOT NULL;

-- 8. DROP OLD COLUMNS & OLD INDEXES
DROP INDEX "vehicles_category_idx";
DROP INDEX "vehicles_category_vehicleType_vehicleBrand_idx";
DROP INDEX "vehicles_category_year_price_idx";
DROP INDEX "vehicles_featured_category_idx";
DROP INDEX "vehicles_featured_status_category_idx";
DROP INDEX "vehicles_status_category_idx";
DROP INDEX "vehicles_vehicleBrand_model_idx";

ALTER TABLE "vehicles" DROP COLUMN "category", DROP COLUMN "vehicleBrand", DROP COLUMN "vehicleType";

-- 9. CREATE NEW INDEXES ON VEHICLES
CREATE INDEX "vehicles_categoryId_idx" ON "vehicles"("categoryId");
CREATE INDEX "vehicles_categoryId_typeId_brandId_idx" ON "vehicles"("categoryId", "typeId", "brandId");
CREATE INDEX "vehicles_status_categoryId_idx" ON "vehicles"("status", "categoryId");
CREATE INDEX "vehicles_featured_categoryId_idx" ON "vehicles"("featured", "categoryId");
CREATE INDEX "vehicles_brandId_model_idx" ON "vehicles"("brandId", "model");
CREATE INDEX "vehicles_categoryId_year_price_idx" ON "vehicles"("categoryId", "year", "price");
CREATE INDEX "vehicles_featured_status_categoryId_idx" ON "vehicles"("featured", "status", "categoryId");

-- 10. ADD FOREIGN KEYS ON VEHICLES
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "vehicle_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;
