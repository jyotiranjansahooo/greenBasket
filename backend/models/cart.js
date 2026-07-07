import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  {
    _id: false,
  }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    items: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

const Cart =
  mongoose.models.Cart ||
  mongoose.model("Cart", cartSchema);

export default Cart;
