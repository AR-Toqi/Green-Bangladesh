import cron from "node-cron";
import { prisma } from "../lib/prisma";
import { sendEmail } from "./email";
import { envConfig } from "../../config";

/**
 * Utility to calculate zone for a district
 * (Mirroring logic from districts.service.ts)
 */
const getDistrictZone = (treesPerKm2: number) => {
  let score = (treesPerKm2 / 5000) * 100;
  score = Math.min(100, Math.max(0, score));
  
  if (score <= 25) return "RED";
  if (score <= 50) return "ORANGE";
  return "GREEN";
};

/**
 * Task: Send warning emails to users in RED zones
 * Runs on the 1st of every month at 00:00
 */
const sendMonthlyRedZoneAlerts = async () => {
  console.log("[CRON] Starting monthly Red Zone alerts...");
  
  try {
    // 1. Fetch all districts
    const districts = await prisma.district.findMany();
    
    // 2. Identify Red Zone districts
    const redZoneDistricts = districts.filter(d => 
      getDistrictZone(d.treesPerKm2) === "RED"
    );
    
    if (redZoneDistricts.length === 0) {
      console.log("[CRON] No Red Zone districts found this month. Skipping alerts.");
      return;
    }

    console.log(`[CRON] Found ${redZoneDistricts.length} Red Zone districts. Preparing emails...`);

    // 3. For each red zone district, find users and send emails
    for (const district of redZoneDistricts) {
      const users = await prisma.user.findMany({
        where: {
          districtId: district.id,
          isDeleted: false,
          status: "ACTIVE"
        }
      });

      console.log(`[CRON] Sending ${users.length} alerts for district: ${district.name}`);

      for (const user of users) {
        try {
          await sendEmail({
            to: user.email,
            subject: `⚠️ Environmental Warning for ${district.name}`,
            templateName: "danger-zone",
            templateData: {
              name: user.name,
              districtName: district.name,
              frontendUrl: envConfig.FRONTEND_URL
            }
          });
        } catch (emailError) {
          console.error(`[CRON] Failed to send email to ${user.email}:`, emailError);
        }
      }
    }
    
    console.log("[CRON] Monthly Red Zone alerts completed successfully.");
  } catch (error) {
    console.error("[CRON] Fatal error in monthly alerts task:", error);
  }
};

/**
 * Initialize all cron jobs
 */
export const initCronJobs = () => {
  // Cron schedule: 0 0 1 * * (Minute Hour Day Month DayOfWeek)
  // Runs at 00:00 on day-of-month 1
  cron.schedule("0 0 1 * *", () => {
    sendMonthlyRedZoneAlerts();
  });

  console.log("[CRON] Scheduled tasks initialized.");
};
