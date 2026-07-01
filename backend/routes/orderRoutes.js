import express from "express";

import {
  placeOrder,
  getMyOrders,
  getFarmerOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Customer Routes
router.post("/", protect, authorize("customer"), placeOrder);
router.get("/my-orders", protect, authorize("customer"), getMyOrders);

// Farmer Routes
router.get(
  "/farmer-orders",
  protect,
  authorize("farmer"),
  getFarmerOrders
);

// Shared Route (Customer, Farmer, Admin)
router.get(
  "/:id",
  protect,
  authorize("customer", "farmer", "admin"),
  getOrderById
);

// Farmer/Admin Route
router.put(
  "/:id/status",
  protect,
  authorize("farmer", "admin"),
  updateOrderStatus
);

export default router;