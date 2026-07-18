import User from "../models/user.js";
import Order from "../models/order.js";
import Product from "../models/product.js";

export const getHeroStats = async (req, res) => {
  try {
    const farmers = await User.countDocuments({
      role: "farmer",
    });

    const customers = await User.countDocuments({
      role: "customer",
    });

    const orders = await Order.countDocuments();

    const organicProducts =
      await Product.countDocuments({
        farmingMethod: "organic",
      });

    const totalProducts =
      await Product.countDocuments();

    const organicPercentage =
      totalProducts > 0
        ? Math.round(
            (organicProducts /
              totalProducts) *
              100
          )
        : 0;

    res.status(200).json({
      success: true,

      stats: {
        farmers,
        customers,
        orders,
        organicPercentage,
      },
    });
  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};