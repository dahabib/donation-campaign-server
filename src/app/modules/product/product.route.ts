import express from "express";
import { ProductController } from "./product.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();
router.get("/", ProductController.getAllProduct);
router.post(
  "/",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  ProductController.addProduct
);
router.delete(
  "/deleteMultiple",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  ProductController.deleteMultiple
);
router.get("/:id", ProductController.getProduct);
router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  ProductController.updateProduct
);
router.delete("/:id", ProductController.deleteProduct);

export const ProductRoutes = router;
