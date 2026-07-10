import express from "express";
import {
  getAllFarmers,
  verifyFarmer,
  getPlatformAnalytics,
  getAllOrders,
  getAllProducts,
  toggleFeaturedProduct,
} from "../controllers/adminController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all farmers
router.get(
  "/farmers",
  protect,
  authorize("admin"),
  getAllFarmers
);

// Verify a farmer
router.put(
  "/farmers/:id/verify",
  protect,
  authorize("admin"),
  verifyFarmer
);

router.get(
  "/analytics",
  protect,
  authorize("admin"),
  getPlatformAnalytics
);
router.get(
  "/orders",
  protect,
  authorize("admin"),
  getAllOrders
);
router.get(
  "/products",
  protect,
  authorize("admin"),
  getAllProducts
);

router.put(
  "/products/:id/featured",
  protect,
  authorize("admin"),
  toggleFeaturedProduct
);

export default router;