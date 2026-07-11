import express from "express";

import {
  getWishlist,
  toggleWishlist,
} from "../controllers/wishlistController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  authorize("customer"),
  getWishlist
);

router.put(
  "/toggle",
  protect,
  authorize("customer"),
  toggleWishlist
);

export default router;