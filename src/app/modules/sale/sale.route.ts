import express from "express";
import { SaleController } from "./sale.controller";

const router = express.Router();

router.get("/", SaleController.getSales);
router.post("/create", SaleController.addSale);
router.get("/:id", SaleController.getSingleSale);
router.patch("/:id", SaleController.updateSale);
router.delete("/:id", SaleController.deleteSale);

export const SaleRoutes = router;
