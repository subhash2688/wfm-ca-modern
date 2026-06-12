-- CreateEnum
CREATE TYPE "VolunteerLeadStatus" AS ENUM ('pending', 'training_invited', 'training_scheduled', 'training_complete', 'activated', 'rejected');

-- CreateEnum
CREATE TYPE "VolunteerLeadType" AS ENUM ('individual', 'regular', 'group');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "RallyActivityAction" ADD VALUE 'activate';
ALTER TYPE "RallyActivityAction" ADD VALUE 'lead_create';

-- CreateTable
CREATE TABLE "volunteer_leads" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "campusName" TEXT NOT NULL,
    "volunteerType" "VolunteerLeadType" NOT NULL DEFAULT 'individual',
    "availability" JSONB NOT NULL DEFAULT '{}',
    "groupName" TEXT,
    "groupSize" INTEGER,
    "status" "VolunteerLeadStatus" NOT NULL DEFAULT 'pending',
    "trainingWaived" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "activatedAt" TIMESTAMP(3),
    "activatedBy" INTEGER,
    "volunteerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "volunteer_leads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "volunteer_leads_phone_key" ON "volunteer_leads"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "volunteer_leads_volunteerId_key" ON "volunteer_leads"("volunteerId");

-- CreateIndex
CREATE INDEX "volunteer_leads_status_idx" ON "volunteer_leads"("status");

-- CreateIndex
CREATE INDEX "volunteer_leads_createdAt_idx" ON "volunteer_leads"("createdAt");

-- AddForeignKey
ALTER TABLE "volunteer_leads" ADD CONSTRAINT "volunteer_leads_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "rally_volunteers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
