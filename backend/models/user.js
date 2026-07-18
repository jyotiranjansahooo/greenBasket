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
  houseNumber: {
    type: String,
    default: "",
  },

  area: {
    type: String,
    default: "",
  },

  state: {
    type: String,
    default: "",
  },

  pincode: {
    type: String,
    default: "",
  },
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

    verificationCode: {
      type: String,
    },

    verificationCodeExpires: {
      type: Date,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
