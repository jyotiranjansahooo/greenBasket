import express from "express";
import {
  getAllFarmers,
  verifyFarmer,
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

export default router;