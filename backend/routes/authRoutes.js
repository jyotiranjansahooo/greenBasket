import express from "express";

import {
  loginUser,
  logoutUser,
  getCurrentUser,
  getProfile,
  updateProfile,
  googleLogin,
  verifyCode,
  sendVerificationCode,
} from "../controllers/authController.js";

import profileUpload from "../middleware/profileUpload.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/send-verification-code", sendVerificationCode);
router.post("/verify-code", verifyCode);
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
