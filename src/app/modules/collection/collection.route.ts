import express from "express";
import { CollectionController } from "./collection.controller";

const router = express.Router();

router.get("/", CollectionController.getAllCollection);
router.post("/create", CollectionController.createCollection);
router.get("/:id", CollectionController.getSingleCollection);
router.patch("/:id", CollectionController.updateCollection);
router.delete("/:id", CollectionController.deleteCollection);

export const CollectionRoutes = router;
