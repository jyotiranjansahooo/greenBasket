import Product from "../models/product.js";
import Category from "../models/category.js";



//product create
export const createProduct = async (req, res) => {
  try {
    const {
      category,
      name,
      description,
      price,
      quantity,
      unit,
      images,
      farmingMethod,
      harvestDate,
    } = req.body;

if (!req.user.isVerified) {
  return res.status(403).json({
    success: false,
    message: "Your account is not verified by the admin yet.",
  });
}

    // Check category exists
    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const product = await Product.create({
      farmer: req.user._id,
      category,
      name,
      description,
      price,
      quantity,
      unit,
      images,
      farmingMethod,
      harvestDate,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
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


//get all products

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ availability: true })
      .populate("farmer", "name farmLocation")
      .populate("category", "name");

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

// @desc    Get Single Product
// @route   GET /api/products/:id
// @access  Public

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("farmer", "name farmLocation phone")
      .populate("category", "name");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};




export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Only the product owner or an admin can update
    if (
      product.farmer.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // If category is being changed, verify it exists
    if (req.body.category) {
      const category = await Category.findById(req.body.category);

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// @desc    Delete Product
// @route   DELETE /api/products/:id
// @access  Private (Farmer/Admin)

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Only owner or admin
    if (
      product.farmer.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    product.availability = false;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};