import express from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { DonationRoutes } from "../modules/donation/donation.route";
import { SaleRoutes } from "../modules/sale/sale.route";
import { ReportRoutes } from "../modules/report/report.route";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/sales",
    route: SaleRoutes,
  },
  {
    path: "/donations",
    route: DonationRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/reports",
    route: ReportRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
