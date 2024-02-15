import express from "express";
import { DonationController } from "./donation.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();
router.get("/", DonationController.getAllDonation);
router.post(
  "/",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  DonationController.createDonation
);
router.get("/:id", DonationController.getSingleDonation);
router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  DonationController.updateDonation
);
router.delete("/:id", DonationController.deleteDonation);

export const DonationRoutes = router;
