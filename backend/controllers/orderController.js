import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Cart from "../models/cart.js";

export const placeOrder = async (req, res) => {
  try {
    const { products, deliveryAddress, deliverySlot, paymentMethod } = req.body;
    if (!products || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No products selected",
      });
    }

    let orderItems = [];
    let totalAmount = 0;
    let farmerId = null;

    for (const item of products) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      // First product determines the farmer
      if (!farmerId) {
        farmerId = product.farmer;
      }

      // Prevent ordering from multiple farmers in one order
      if (product.farmer.toString() !== farmerId.toString()) {
        return res.status(400).json({
          success: false,
          message: "All products in one order must belong to the same farmer",
        });
      }

      const itemTotal = product.price * item.quantity;

      totalAmount += itemTotal;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const order = await Order.create({
  customer: req.user._id,
  farmer: farmerId,
  products: orderItems,
  totalAmount,
  deliveryAddress,
  deliverySlot,
  paymentMethod,
  paymentStatus:
    paymentMethod === "ONLINE"
      ? "Paid"
      : "Pending",
});
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
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

//custumer orders

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      customer: req.user._id,
    })
      .populate("products.product", "name price images")
      .populate("farmer", "name farmLocation")
      .sort({ createdAt: -1 });

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

//Get Farmer Orders

export const getFarmerOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      farmer: req.user._id,
    })
      .populate("customer", "name phone address")
      .populate("products.product", "name price")
      .sort({ createdAt: -1 });

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

//    Get Order By ID

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customer", "name email phone")
      .populate("farmer", "name farmLocation phone")
      .populate("products.product", "name images");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Allow only customer, farmer, or admin
    if (
      req.user.role !== "admin" &&
      order.customer._id.toString() !== req.user._id.toString() &&
      order.farmer._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.status(200).json({
      success: true,
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

//    Update Order Status

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Farmer can update only their own orders
    if (
      req.user.role === "farmer" &&
      order.farmer.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    order.status = status;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
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

export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (
      order.customer.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    if (
      !["Pending", "Confirmed"].includes(
        order.status
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "This order can no longer be cancelled",
      });
    }

    order.status = "Cancelled";

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
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
