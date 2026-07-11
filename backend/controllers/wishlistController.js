import Wishlist from "../models/Wishlist.js";

export const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({
      user: req.user._id,
    }).populate(
      "products",
      "name price images"
    );

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        products: [],
      });
    }

    res.status(200).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const toggleWishlist = async (
  req,
  res
) => {
  try {
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({
      user: req.user._id,
    });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        products: [],
      });
    }

    const exists =
      wishlist.products.includes(
        productId
      );

    if (exists) {
      wishlist.products =
        wishlist.products.filter(
          (id) =>
            id.toString() !== productId
        );
    } else {
      wishlist.products.push(
        productId
      );
    }

    await wishlist.save();

    res.status(200).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};