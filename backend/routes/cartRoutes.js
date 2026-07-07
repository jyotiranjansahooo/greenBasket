import express from "express";

import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(authorize("customer"));

router
  .route("/")
  .get(getCart)
  .post(addToCart)
  .delete(clearCart);

router
  .route("/:productId")
  .put(updateCartItem)
  .delete(removeFromCart);

export default router;