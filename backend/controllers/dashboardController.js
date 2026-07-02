import Product from "../models/Product.js";
import Order from "../models/Order.js";
import User from "../models/User.js";
import Category from "../models/category.js";


// @desc Farmer Dashboard
// @route GET /api/dashboard/farmer
// @access Private (Farmer)

export const getFarmerDashboard = async (req, res) => {
  try {
    const farmerId = req.user._id;

    const totalProducts = await Product.countDocuments({
      farmer: farmerId,
      availability: true,
    });

    const totalOrders = await Order.countDocuments({
      farmer: farmerId,
    });

    const pendingOrders = await Order.countDocuments({
      farmer: farmerId,
      status: "Pending",
    });

    const deliveredOrders = await Order.countDocuments({
      farmer: farmerId,
      status: "Delivered",
    });

    const revenue = await Order.aggregate([
      {
        $match: {
          farmer: farmerId,
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
      dashboard: {
        totalProducts,
        totalOrders,
        pendingOrders,
        deliveredOrders,
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


// @desc Admin Dashboard
// @route GET /api/dashboard/admin
// @access Private (Admin)

export const getAdminDashboard = async (req, res) => {
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

    const totalOrders = await Order.countDocuments();

    const totalCategories = await Category.countDocuments();

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
      dashboard: {
        totalCustomers,
        totalFarmers,
        verifiedFarmers,
        totalProducts,
        totalOrders,
        totalCategories,
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