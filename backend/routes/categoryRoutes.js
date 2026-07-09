import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import upload from "../middleware/categoryUpload.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getCategories);
router.get("/:id", getCategoryById);

// Admin Routes
router.post(
  "/",
  protect,
  authorize("admin"),
  upload.single("image"),
  createCategory
);
router.put(
  "/:id",
  protect,
  authorize("admin"),
  upload.single("image"),
  updateCategory
);
router.delete("/:id", protect, authorize("admin"), deleteCategory);

export default router;