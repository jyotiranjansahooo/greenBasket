import express from "express";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getFarmerProducts,
} from "../controllers/productController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getProducts);


// Farmer Routes
router.get(
  "/farmer",
  protect,
  authorize("farmer"),
  getFarmerProducts
);

router.post(
  "/",
  protect,
  authorize("farmer"),
  upload.array("images", 5),
  createProduct
);

router.get("/:id", getProductById);

router.put(
  "/:id",
  protect,
  authorize("farmer", "admin"),
  upload.array("images", 5), // optional but recommended if updating images
  updateProduct
);
router.delete(
  "/:id",
  protect,
  authorize("farmer", "admin"),
  deleteProduct
);

export default router;