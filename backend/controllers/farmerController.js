import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const getFarmerAnalytics = async (req, res) => {
  try {
    const farmerId = req.user._id;

    const totalProducts = await Product.countDocuments({
      farmer: farmerId,
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
  analytics: {
    totalProducts,
    totalOrders,
    pendingOrders,
    deliveredOrders,
    revenue:
      revenue.length > 0
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
export const getRecentOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      farmer: req.user._id,
    })
      .populate("customer", "name")
      .populate("products.product", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
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

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Confirmed",
      "Packed",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (
      !allowedStatuses.includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const order = await Order.findOne({
      _id: req.params.id,
      farmer: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;

    await order.save();

    res.status(200).json({
      success: true,
      message:
        "Order status updated",
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};