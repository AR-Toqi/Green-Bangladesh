import { Router } from "express";
import { authRoute } from "../modules/auth/auth.routes";
import { DistrictRoutes } from "../modules/districts/districts.routes";
import { PlantationRoutes } from "../modules/plantations/plantations.routes";
import { LeaderboardRoutes } from "../modules/leaderboard/leaderboard.routes";
import { AdminRoutes } from "../modules/admin/admin.routes";

import { UserRoutes } from "../modules/user/user.routes";

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/users',
        route: UserRoutes,
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