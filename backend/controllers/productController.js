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
      farmingMethod,
      harvestDate,
      origin,
      isFeatured,
    } = req.body;

    // Check farmer verification
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

    // Images uploaded by Multer
    const imagePaths = req.files
      ? req.files.map((file) => `/uploads/products/${file.filename}`)
      : [];

    // Create product
    const product = await Product.create({
      farmer: req.user._id,
      category,
      name,
      description,
      price,
      quantity,
      unit,
      farmingMethod,
      harvestDate,
      origin,
      isFeatured,
      images: imagePaths,
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
    const {
      search,
      category,
      farmer,
      farmingMethod,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
      sort = "latest",
    } = req.query;

    const query = {
      availability: true,
    };

    // Search by product name
    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by farmer
    if (farmer) {
      query.farmer = farmer;
    }

    // Filter by farming method
    if (farmingMethod) {
      query.farmingMethod = farmingMethod;
    }

    // Price Filter
    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

    let sortOption = {};

    switch (sort) {
      case "priceAsc":
        sortOption.price = 1;
        break;

      case "priceDesc":
        sortOption.price = -1;
        break;

      case "oldest":
        sortOption.createdAt = 1;
        break;

      default:
        sortOption.createdAt = -1;
    }

    const skip = (page - 1) * limit;

    const totalProducts = await Product.countDocuments(query);

    const products = await Product.find(query)
      .populate("farmer", "name farmLocation")
      .populate("category", "name")
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      totalProducts,
      currentPage: Number(page),
      totalPages: Math.ceil(totalProducts / limit),
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

    // Verify category
    if (req.body.category) {
      const category = await Category.findById(req.body.category);

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }
    }

    // Update fields
    product.name = req.body.name;
    product.category = req.body.category;
    product.description = req.body.description;
    product.price = req.body.price;
    product.quantity = req.body.quantity;
    product.unit = req.body.unit;
    product.farmingMethod = req.body.farmingMethod;
    product.harvestDate = req.body.harvestDate;
    product.origin = req.body.origin;

    // Replace images only if new ones are uploaded
    if (req.files && req.files.length > 0) {
      product.images = req.files.map(
        (file) => `/uploads/products/${file.filename}`
      );
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
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


// admin    Delete Product


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
// @   Get Logged-in Farmer Products
// @   GET /api/products/farmer
// @  Private (Farmer)

export const getFarmerProducts = async (req, res) => {
  try {
    const products = await Product.find({
  farmer: req.user._id,
  availability: true,
})
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