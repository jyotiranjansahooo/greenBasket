import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    password: {
  type: String,
  minlength: 8,
  select: false,
},

   phone: {
  type: String,
  trim: true,
},

    role: {
      type: String,
      enum: ["customer", "farmer", "admin"],
      default: "customer",
    },

    address: {
      type: String,
      trim: true,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    // Farmer-only fields
    farmLocation: {
      type: String,
      default: "",
    },

    cropTypes: [
      {
        type: String,
        trim: true,
      },
    ],

    farmingMethod: {
      type: String,
      enum: ["organic", "conventional", ""],
      default: "",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    language: {
  type: String,
  enum: ["en", "hi", "or"],
  default: "en",
},
  },
  {
    timestamps: true,
  }
);


const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;