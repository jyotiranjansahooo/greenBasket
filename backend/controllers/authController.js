import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user.js";


// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      role,
      address,
      farmLocation,
      cropTypes,
      farmingMethod,
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

if (
  role === "farmer" &&
  (!farmLocation || !cropTypes || !farmingMethod)
) {
  return res.status(400).json({
    success: false,
    message: "Farmer profile information is required",
  });
}



    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      address,
      farmLocation,
      cropTypes,
      farmingMethod,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  res.status(200).json({
    message: "Login API coming next...",
  });
};

// @desc    Get logged in user
// @route   GET /api/auth/me
// @access  Private
export const getCurrentUser = async (req, res) => {
  res.status(200).json({
    message: "Current User API coming next...",
  });
};