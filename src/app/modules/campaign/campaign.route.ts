import express from "express";
import { CampaignController } from "./campaign.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();
router.get("/", CampaignController.getAllCampaign);
router.post(
  "/",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  CampaignController.createCampaign
);
router.get("/:id", CampaignController.getSingleCampaign);
router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  CampaignController.updateCampaign
);
router.delete("/:id", CampaignController.deleteCampaign);

export const CampaignRoutes = router;
