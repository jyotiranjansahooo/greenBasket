import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getProfile,
  updateProfile,
  googleLogin,
} from "../controllers/authController.js";
import profileUpload from "../middleware/profileUpload.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleLogin);
router.post("/logout", logoutUser);

router.get("/me", protect, getCurrentUser);
router.get("/profile", protect, getProfile);
router.put(
  "/profile",
  protect,
  profileUpload.single("profileImage"),
  updateProfile,
);

export default router;
