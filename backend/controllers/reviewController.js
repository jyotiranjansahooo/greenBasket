import Review from "../models/eview.js";
import Product from "../models/product.js";
import Order from "../models/order.js";

const updateProductRating = async (productId) => {
  const reviews = await Review.find({
    product: productId,
  });

  const numReviews = reviews.length;

  const rating =
    numReviews === 0
      ? 0
      : reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        ) / numReviews;

  await Product.findByIdAndUpdate(productId, {
    rating,
    numReviews,
  });
};

//    Create Review
export const createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Customer must have purchased and received the product
    const order = await Order.findOne({
      customer: req.user._id,
      "products.product": productId,
      status: "Delivered",
    });

    if (!order) {
      return res.status(400).json({
        success: false,
        message: "You can review only delivered products.",
      });
    }

    // Prevent duplicate reviews
    const existingReview = await Review.findOne({
      customer: req.user._id,
      product: productId,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product.",
      });
    }

    const review = await Review.create({
      customer: req.user._id,
      product: productId,
      farmer: product.farmer,
      rating,
      comment,
    });
await updateProductRating(productId);

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//    Get Product Reviews


export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    })
      .populate("customer", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const canReviewProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Must be a customer
    if (req.user.role !== "customer") {
      return res.json({
        success: true,
        canReview: false,
      });
    }

    // Must have a delivered order
    const order = await Order.findOne({
      customer: req.user._id,
      "products.product": productId,
      status: "Delivered",
    });

    if (!order) {
      return res.json({
        success: true,
        canReview: false,
      });
    }

    // Must not have already reviewed
    const existingReview = await Review.findOne({
      customer: req.user._id,
      product: productId,
    });

    res.json({
      success: true,
      canReview: !existingReview,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (review.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;

    await review.save();
    await updateProductRating(review.product);

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      review,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (
      review.customer.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
const productId = review.product;
    await review.deleteOne();
    await updateProductRating(productId);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};