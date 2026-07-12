import mongoose from "mongoose";

const driverSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    licenseNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    licenseCategory: {
      type: String,
      enum: ["LMV", "HMV", "Transport", "Heavy"],
      required: true,
    },

    licenseExpiryDate: {
      type: Date,
      required: true,
    },

    safetyScore: {
      type: Number,
      default: 100,
      min: 0,
      max: 100,
    },

    status: {
      type: String,
      enum: [
        "Available",
        "On Trip",
        "Off Duty",
        "Suspended",
      ],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

const Driver = mongoose.model("Driver", driverSchema);

export default Driver;