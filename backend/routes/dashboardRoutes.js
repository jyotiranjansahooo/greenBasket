import express from "express";

import {
  getFarmerDashboard,
  getAdminDashboard,
} from "../controllers/dashboardController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/farmer",
  protect,
  authorize("farmer"),
  getFarmerDashboard
);

router.get(
  "/admin",
  protect,
  authorize("admin"),
  getAdminDashboard
);

export default router;