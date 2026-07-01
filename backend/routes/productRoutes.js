import express from "express";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Farmer Routes
router.post("/", protect, authorize("farmer"), createProduct);
router.put("/:id", protect, authorize("farmer", "admin"), updateProduct);
router.delete("/:id", protect, authorize("farmer", "admin"), deleteProduct);

export default router;