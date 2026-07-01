import Order from "../models/Order.js";
import Product from "../models/Product.js";

// @desc    Place Order
// @route   POST /api/orders
// @access  Private (Customer)

export const placeOrder = async (req, res) => {
  try {
    const { products, deliveryAddress, deliverySlot } = req.body;

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
    });

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

// @desc    Customer Order History
export const getMyOrders = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get My Orders API - Coming Next",
  });
};

// @desc    Farmer Orders
export const getFarmerOrders = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get Farmer Orders API - Coming Next",
  });
};

// @desc    Get Order By ID
export const getOrderById = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get Order By ID API - Coming Next",
  });
};

// @desc    Update Order Status
export const updateOrderStatus = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Update Order Status API - Coming Next",
  });
};