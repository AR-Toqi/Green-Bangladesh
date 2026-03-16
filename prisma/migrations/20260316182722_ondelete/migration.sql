-- DropForeignKey
ALTER TABLE "district" DROP CONSTRAINT "district_divisionId_fkey";

-- DropForeignKey
ALTER TABLE "plantation_report" DROP CONSTRAINT "plantation_report_districtId_fkey";

-- DropForeignKey
ALTER TABLE "plantation_report" DROP CONSTRAINT "plantation_report_userId_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "isDeleted" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "district" ADD CONSTRAINT "district_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "division"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plantation_report" ADD CONSTRAINT "plantation_report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plantation_report" ADD CONSTRAINT "plantation_report_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "district"("id") ON DELETE CASCADE ON UPDATE CASCADE;
