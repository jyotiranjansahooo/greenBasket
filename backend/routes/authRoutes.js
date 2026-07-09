import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getProfile,
  updateProfile,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/me", protect, getCurrentUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);


export default router;