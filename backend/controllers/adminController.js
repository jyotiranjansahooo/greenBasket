import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Category from "../models/category.js";



// Get all farmers
export const getAllFarmers = async (req, res) => {
  try {
    const farmers = await User.find({
      role: "farmer",
    }).select("-password");

    res.status(200).json({
      success: true,
      count: farmers.length,
      farmers,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Verify / unverify farmer
export const verifyFarmer = async (req, res) => {
  try {

    const farmer = await User.findById(req.params.id);


    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: "Farmer not found",
      });
    }

    if (farmer.role !== "farmer") {
      return res.status(400).json({
        success: false,
        message: "User is not a farmer",
      });
    }

    farmer.isVerified = !farmer.isVerified;

    await farmer.save();

    res.status(200).json({
      success: true,
      message: farmer.isVerified
        ? "Farmer verified successfully"
        : "Farmer verification removed",
      farmer,
    });
  } catch (error) {
    console.error("VERIFY ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer", "name email")
      .populate("farmer", "name")
      .populate("products.product", "name price");

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


export const getPlatformAnalytics = async (req, res) => {
  try {
    const totalCustomers = await User.countDocuments({
      role: "customer",
    });

    const totalFarmers = await User.countDocuments({
      role: "farmer",
    });

    const verifiedFarmers = await User.countDocuments({
      role: "farmer",
      isVerified: true,
    });

    const totalProducts = await Product.countDocuments();

    const totalCategories = await Category.countDocuments();

    const totalOrders = await Order.countDocuments();

    const revenue = await Order.aggregate([
      {
        $match: {
          status: "Delivered",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      analytics: {
        totalCustomers,
        totalFarmers,
        verifiedFarmers,
        totalProducts,
        totalCategories,
        totalOrders,
        totalRevenue: revenue.length
          ? revenue[0].totalRevenue
          : 0,
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

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("farmer", "name")
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const toggleFeaturedProduct = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.isFeatured =
      !product.isFeatured;

    await product.save();

    res.status(200).json({
      success: true,
      message: product.isFeatured
        ? "Product marked as featured"
        : "Product removed from featured",
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};