import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const getFarmerAnalytics = async (
  req,
  res
) => {
  try {
    const farmerId = req.user._id;

    // Existing dashboard stats

    const totalProducts =
      await Product.countDocuments({
        farmer: farmerId,
      });

    const totalOrders =
      await Order.countDocuments({
        farmer: farmerId,
      });

    const pendingOrders =
      await Order.countDocuments({
        farmer: farmerId,
        status: "Pending",
      });

    const deliveredOrders =
      await Order.countDocuments({
        farmer: farmerId,
        status: "Delivered",
      });

    const revenueResult =
      await Order.aggregate([
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

    const revenue =
      revenueResult[0]?.totalRevenue || 0;

    // Weekly revenue

    const startOfWeek = new Date();

    startOfWeek.setDate(
      startOfWeek.getDate() - 7
    );

    const weekRevenue =
      await Order.aggregate([
        {
          $match: {
            farmer: farmerId,
            status: "Delivered",
            createdAt: {
              $gte: startOfWeek,
            },
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$totalAmount",
            },
          },
        },
      ]);

    // Best selling product

    const bestSelling =
      await Order.aggregate([
        {
          $match: {
            farmer: farmerId,
          },
        },
        {
          $unwind: "$products",
        },
        {
          $group: {
            _id:
              "$products.product",

            sold: {
              $sum:
                "$products.quantity",
            },
          },
        },
        {
          $sort: {
            sold: -1,
          },
        },
        {
          $limit: 1,
        },
      ]);

    let bestProduct = null;

    if (bestSelling.length) {
      bestProduct =
        await Product.findById(
          bestSelling[0]._id
        ).select("name");
    }

    // Total customers

    const customers =
      await Order.distinct(
        "customer",
        {
          farmer: farmerId,
        }
      );

    res.status(200).json({
      success: true,

      analytics: {
        totalProducts,

        totalOrders,

        revenue,

        pendingOrders,

        deliveredOrders,

        weeklyRevenue:
          weekRevenue[0]?.total ||
          0,

        bestSellingProduct:
          bestProduct?.name ||
          "No sales",

        totalCustomers:
          customers.length,
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

export const getLowStockProducts =
  async (req, res) => {
    try {
      const products =
        await Product.find({
          farmer: req.user._id,

          quantity: {
            $lte: 5,
          },
        }).select(
          "name quantity unit"
        );

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Server Error",
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

export const getFarmerEarnings = async (
  req,
  res
) => {
  try {
    const stats = await Order.aggregate([
      {
        $match: {
          farmer: req.user._id,
          status: "Delivered",
        },
      },

      {
        $group: {
          _id: null,

          totalRevenue: {
            $sum: "$totalAmount",
          },

          totalOrders: {
            $sum: 1,
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,

      earnings: {
        totalRevenue:
          stats[0]?.totalRevenue || 0,

        totalOrders:
          stats[0]?.totalOrders || 0,
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