import express from "express";

import {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/product/:productId", getProductReviews);

// Customer
router.post("/", protect, authorize("customer"), createReview);
router.put("/:id", protect, authorize("customer"), updateReview);

// Customer/Admin
router.delete(
  "/:id",
  protect,
  authorize("customer", "admin"),
  deleteReview
);

export default router;