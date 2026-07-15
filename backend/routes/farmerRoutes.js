import express from "express";
import { getFarmerEarnings } from "../controllers/farmerController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

import { updateProductStock } from "../controllers/productController.js";
import {
  getFarmerAnalytics,
  getRecentOrders,
  updateOrderStatus,
  getLowStockProducts,
} from "../controllers/farmerController.js";
const router = express.Router();

router.get("/analytics", protect, authorize("farmer"), getFarmerAnalytics);
router.get("/recent-orders", protect, authorize("farmer"), getRecentOrders);
router.put(
  "/orders/:id/status",
  protect,
  authorize("farmer"),
  updateOrderStatus,
);
router.patch(
  "/products/:id/stock",
  protect,
  authorize("farmer"),
  updateProductStock
);

router.get("/earnings", protect, authorize("farmer"), getFarmerEarnings);
router.get("/analytics", protect, authorize("farmer"), getFarmerAnalytics);
router.get("/low-stock", protect, authorize("farmer"), getLowStockProducts);

export default router;
