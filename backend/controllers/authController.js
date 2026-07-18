import bcrypt from "bcrypt";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";
import { OAuth2Client } from "google-auth-library";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const loginAttempts = new Map();
const MAX_ATTEMPTS = 3;
const BLOCK_TIME = 2 * 60 * 1000;

export const sendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    global.verificationStore = global.verificationStore || {};

    global.verificationStore[email] = {
      code: verificationCode,
      expires: Date.now() + 10 * 60 * 1000,
    };

    await sendEmail(
      email,
      "Green Basket Verification Code",
      `
        <h2>Welcome to Green Basket 🌱</h2>

        <p>Your verification code is:</p>

        <h1 style="letter-spacing:5px;color:#16a34a;">
          ${verificationCode}
        </h1>

        <p>This code expires in 10 minutes.</p>
      `,
    );

    res.status(200).json({
      success: true,
      message: "Verification code sent.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    const data = global.verificationStore?.[email];

    if (!data) {
      return res.status(400).json({
        success: false,
        message: "No verification code found.",
      });
    }

    if (Date.now() > data.expires) {
      return res.status(400).json({
        success: false,
        message: "Verification code expired.",
      });
    }

    if (data.code !== code) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code.",
      });
    }

    global.verificationStore[email].verified = true;

    res.status(200).json({
      success: true,
      message: "Code verified.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
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

    const data = global.verificationStore?.[email];
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email first.",
      });
    }

    if (!data.verified) {
      return res.status(400).json({
        success: false,
        message: "Email verification required.",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Validate farmer fields
    if (role === "farmer" && (!farmLocation || !cropTypes || !farmingMethod)) {
      return res.status(400).json({
        success: false,
        message: "Farmer profile information is required",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate 6-digit verification code
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

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

    // Create verification URL
    await sendEmail(
      user.email,
      "Green Basket Email Verification",
      `
    <h2>Welcome to Green Basket 🌱</h2>

    <p>Your verification code is:</p>

    <h1
      style="
        letter-spacing: 5px;
        color: #16a34a;
      "
    >
      ${verificationCode}
    </h1>

    <p>
      This code will expire in 10 minutes.
    </p>
  `,
    );

    // Optional: auto-login after registration
    generateToken(res, user._id);

    res.status(201).json({
      success: true,
      message:
        "Registration successful. A verification code has been sent to your email.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
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
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const normalizedEmail = email.toLowerCase();

    const attempt = loginAttempts.get(normalizedEmail);

    if (
      attempt &&
      attempt.count >= MAX_ATTEMPTS &&
      Date.now() < attempt.blockUntil
    ) {
      const remainingSeconds = Math.ceil(
        (attempt.blockUntil - Date.now()) / 1000,
      );

      return res.status(429).json({
        success: false,
        message: `Too many failed attempts. Try again in ${remainingSeconds} seconds.`,
      });
    }

    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    // User not found
    if (!user) {
      const existing = loginAttempts.get(normalizedEmail);

      if (existing) {
        existing.count += 1;

        if (existing.count >= MAX_ATTEMPTS) {
          existing.blockUntil = Date.now() + BLOCK_TIME;
        }
      } else {
        loginAttempts.set(normalizedEmail, {
          count: 1,
          blockUntil: null,
        });
      }

      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Email verification check
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in.",
      });
    }

    // Password check
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const existing = loginAttempts.get(normalizedEmail);

      if (existing) {
        existing.count += 1;

        if (existing.count >= MAX_ATTEMPTS) {
          existing.blockUntil = Date.now() + BLOCK_TIME;
        }
      } else {
        loginAttempts.set(normalizedEmail, {
          count: 1,
          blockUntil: null,
        });
      }

      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Clear failed attempts after successful login
    loginAttempts.delete(normalizedEmail);

    // Create JWT cookie
    generateToken(res, user._id);
    console.log("Cookie sent");

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
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

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getCurrentUser = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    const user = await User.findById(req.user._id);

    user.name = name;
    user.phone = phone;
    user.address = address;

    if (req.file) {
      user.profileImage = `/uploads/profiles/${req.file.filename}`;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// @desc    Google Login
// @route   POST /api/auth/google
// @access  Public

export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { email, name, picture } = payload;

    let user = await User.findOne({
      email,
    });

    if (!user) {
      user = await User.create({
        name,
        email,
        role: "customer",
        password: Math.random().toString(36).slice(-10),
        profileImage: picture,
        isVerified: true,
      });
    } else if (!user.profileImage && picture) {
      user.profileImage = picture;

      await user.save();
    }

    generateToken(res, user._id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Google login failed",
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification link",
      });
    }

    user.isVerified = true;

    user.emailVerificationToken = undefined;

    user.emailVerificationExpires = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
