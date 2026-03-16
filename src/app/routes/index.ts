import { Router } from "express";
import { authRoute } from "../modules/auth/auth.route";
import { DistrictRoutes } from "../modules/districts/districts.route";
import { PlantationRoutes } from "../modules/plantations/plantations.route";
import { LeaderboardRoutes } from "../modules/leaderboard/leaderboard.route";
import { AdminRoutes } from "../modules/admin/admin.route";

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/districts',
        route: DistrictRoutes,
    },
    {
        path: '/plantations',
        route: PlantationRoutes,
    },
    {
        path: '/leaderboard',
        route: LeaderboardRoutes,
    },
    {
        path: '/admin',
        route: AdminRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const indexRoute = router;