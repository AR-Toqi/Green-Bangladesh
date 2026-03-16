import { Router } from "express";
import { LeaderboardControllers } from "./leaderboard.controller";

const router = Router();

router.get("/", LeaderboardControllers.getLeaderboard);

export const LeaderboardRoutes = router;
