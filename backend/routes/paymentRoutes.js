import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  createPaymentOrder,
} from "../controllers/paymentController.js";

const router =
  express.Router();

router.post(
  "/create-order",
  protect,
  createPaymentOrder
);

export default router;