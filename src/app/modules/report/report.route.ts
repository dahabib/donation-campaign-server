import express from "express";
import { ReportController } from "./report.controller";

const router = express.Router();

router.get("/", ReportController.getAllSales);
router.get("/single-date", ReportController.getSaleOfSelectedDate);
router.get("/multiple-date", ReportController.getSaleOfDateRange);

export const ReportRoutes = router;
