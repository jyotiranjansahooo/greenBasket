import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Protect Routes
export const protect = async (req, res, next) => {
  try {


const token = req.cookies.token;
 

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please login.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );


    const user = await User.findById(
      decoded.id
    ).select("-password");


    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(
      "AUTH ERROR:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

// Role Authorization
export const authorize = (...roles) => {
  return (req, res, next) => {
   

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. You do not have permission to perform this action.",
      });
    }

    next();
  };
};