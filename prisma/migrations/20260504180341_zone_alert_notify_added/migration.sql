-- AlterTable
ALTER TABLE "user" ADD COLUMN     "districtId" TEXT;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "district"("id") ON DELETE SET NULL ON UPDATE CASCADE;
