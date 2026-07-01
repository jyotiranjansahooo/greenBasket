import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
 {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },

    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: 0,
    },

    unit: {
      type: String,
      enum: ["kg", "g", "piece", "dozen", "liter"],
      required: true,
    },

    images: [
      {
        type: String,
      },
    ],

    farmingMethod: {
    type: String,
    enum: ["organic", "conventional"]
    ,required: true,
},

    harvestDate: {
      type: Date,
      required: true,
    },

    availability: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)
const Product =   mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;