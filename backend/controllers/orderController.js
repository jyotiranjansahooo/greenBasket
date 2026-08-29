import Order from "../models/order.js";
import Product from "../models/product.js";
import Cart from "../models/cart.js";

// ======================================================
// Place Order
// ======================================================

export const placeOrder = async (req, res) => {
  try {
    const {
      products,
      deliveryAddress,
      deliverySlot,
      paymentMethod,
    } = req.body;

    // --------------------------------------------------
    // Validate products
    // --------------------------------------------------

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No products selected",
      });
    }

    // --------------------------------------------------
    // Validate delivery address
    // --------------------------------------------------

    if (
      !deliveryAddress ||
      typeof deliveryAddress !== "object" ||
      Array.isArray(deliveryAddress)
    ) {
      return res.status(400).json({
        success: false,
        message: "Delivery address is required",
      });
    }

    const {
      houseNumber,
      street,
      landmark,
      city,
      state,
      pincode,
    } = deliveryAddress;

    // --------------------------------------------------
    // Validate required address fields
    // --------------------------------------------------

    if (!houseNumber?.trim()) {
      return res.status(400).json({
        success: false,
        message: "House number is required",
      });
    }

    if (!street?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Street / Area is required",
      });
    }

    if (!landmark?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Landmark is required",
      });
    }

    if (!city?.trim()) {
      return res.status(400).json({
        success: false,
        message: "City is required",
      });
    }

    if (!state?.trim()) {
      return res.status(400).json({
        success: false,
        message: "State is required",
      });
    }

    if (!pincode?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Pincode is required",
      });
    }

    // --------------------------------------------------
    // Validate pincode
    // --------------------------------------------------

    if (!/^\d{6}$/.test(String(pincode).trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 6-digit pincode",
      });
    }

    // --------------------------------------------------
    // Validate delivery slot
    // --------------------------------------------------

    const allowedDeliverySlots = [
      "Morning (8AM - 12PM)",
      "Afternoon (12PM - 4PM)",
      "Evening (4PM - 8PM)",
    ];

    if (!allowedDeliverySlots.includes(deliverySlot)) {
      return res.status(400).json({
        success: false,
        message: "Invalid delivery slot",
      });
    }

    // --------------------------------------------------
    // Validate payment method
    // --------------------------------------------------

    const allowedPaymentMethods = ["COD", "ONLINE"];

    if (!allowedPaymentMethods.includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }

    // --------------------------------------------------
    // Process products
    // --------------------------------------------------

    const orderItems = [];

    let totalAmount = 0;

    let farmerId = null;

    for (const item of products) {
      // Validate product ID
      if (!item.product) {
        return res.status(400).json({
          success: false,
          message: "Product ID is required",
        });
      }

      // Validate quantity
      if (
        !item.quantity ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid product quantity",
        });
      }

      // Find product
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      // ------------------------------------------------
      // First product determines the farmer
      // ------------------------------------------------

      if (!farmerId) {
        farmerId = product.farmer;
      }

      // ------------------------------------------------
      // Prevent multiple farmers in one order
      // ------------------------------------------------

      if (
        product.farmer.toString() !== farmerId.toString()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "All products in one order must belong to the same farmer",
        });
      }

      // ------------------------------------------------
      // Calculate item total
      // ------------------------------------------------

      const itemTotal =
        product.price * item.quantity;

      totalAmount += itemTotal;

      // ------------------------------------------------
      // Add item to order
      // ------------------------------------------------

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // --------------------------------------------------
    // Make sure farmer exists
    // --------------------------------------------------

    if (!farmerId) {
      return res.status(400).json({
        success: false,
        message: "Unable to determine farmer",
      });
    }

    // --------------------------------------------------
    // Create order
    // --------------------------------------------------

    const order = await Order.create({
      customer: req.user._id,

      farmer: farmerId,

      products: orderItems,

      totalAmount,

      deliveryAddress: {
        houseNumber: houseNumber.trim(),
        street: street.trim(),
        landmark: landmark.trim(),
        city: city.trim(),
        state: state.trim(),
        pincode: String(pincode).trim(),
      },

      deliverySlot,

      paymentMethod,

      paymentStatus:
        paymentMethod === "ONLINE"
          ? "Paid"
          : "Pending",

      transactionId:
        paymentMethod === "ONLINE"
          ? `TXN-${Date.now()}`
          : null,

      status: "Pending",
    });

    // --------------------------------------------------
    // Clear customer's cart
    // --------------------------------------------------

    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [] },
    );

    // --------------------------------------------------
    // Response
    // --------------------------------------------------

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("PLACE ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================================
// Customer Orders
// ======================================================

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      customer: req.user._id,
    })
      .populate(
        "products.product",
        "name price images",
      )
      .populate(
        "farmer",
        "name farmLocation",
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("GET MY ORDERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================================
// Farmer Orders
// ======================================================

export const getFarmerOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      farmer: req.user._id,
    })
      .populate(
        "customer",
        "name phone address",
      )
      .populate(
        "products.product",
        "name price",
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("GET FARMER ORDERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================================
// Get Order By ID
// ======================================================

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate(
        "customer",
        "name email phone",
      )
      .populate(
        "farmer",
        "name farmLocation phone",
      )
      .populate(
        "products.product",
        "name images",
      );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // --------------------------------------------------
    // Authorization
    // --------------------------------------------------

    if (
      req.user.role !== "admin" &&
      order.customer._id.toString() !==
        req.user._id.toString() &&
      order.farmer._id.toString() !==
        req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("GET ORDER BY ID ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================================
// Update Order Status
// ======================================================

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Packed",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    // --------------------------------------------------
    // Validate status
    // --------------------------------------------------

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    // --------------------------------------------------
    // Find order
    // --------------------------------------------------

    const order = await Order.findById(
      req.params.id,
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // --------------------------------------------------
    // Farmer can only update their own orders
    // --------------------------------------------------

    if (
      req.user.role === "farmer" &&
      order.farmer.toString() !==
        req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const oldStatus = order.status;

    order.status = status;

    await order.save();

    // --------------------------------------------------
    // Reduce product quantity only when delivered
    // --------------------------------------------------

    if (
      status === "Delivered" &&
      oldStatus !== "Delivered"
    ) {
      for (const item of order.products) {
        await Product.findByIdAndUpdate(
          item.product,
          {
            $inc: {
              quantity: -item.quantity,
            },
          },
        );
      }
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error(
      "UPDATE ORDER STATUS ERROR:",
      error,
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ======================================================
// Cancel Order
// ======================================================

export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(
      req.params.id,
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // --------------------------------------------------
    // Only customer who created the order can cancel
    // --------------------------------------------------

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
      ![
        "Pending",
        "Confirmed",
      ].includes(order.status)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "This order can no longer be cancelled",
      });
    }

    order.status = "Cancelled";

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.error("CANCEL ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
