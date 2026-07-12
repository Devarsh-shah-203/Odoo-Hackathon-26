import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },

    phone: {
      type: String,
      default: null,
      trim: true,
      match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },

    role: {
      type: String,
      enum: [
        "FLEET_MANAGER",
        "DRIVER",
        "SAFETY_OFFICER",
        "FINANCIAL_ANALYST",
      ],
      default: "DRIVER",
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    loginAttempts: {
      type: Number,
      default: 0,
    },

    lastLogin: {
      type: Date,
    },

    passwordChangedAt: {
      type: Date,
    },

    refreshToken: {
      type: String,
      select: false,
    },

    resetPasswordToken: {
      type: String,
      select: false,
    },

    resetCodeExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before save
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


const User = mongoose.model("User", userSchema);

export default User;