import express from "express";

import { protect, authorize } from "../middleware/authMiddleware.js";

import {
  getFarmerAnalytics,
  getRecentOrders,
  updateOrderStatus,
} from "../controllers/farmerController.js";
const router = express.Router();

router.get(
  "/analytics",
  protect,
  authorize("farmer"),
  getFarmerAnalytics
);
router.get(
  "/recent-orders",
  protect,
  authorize("farmer"),
  getRecentOrders
);
router.put(
  "/orders/:id/status",
  protect,
  authorize("farmer"),
  updateOrderStatus
);

export default router;