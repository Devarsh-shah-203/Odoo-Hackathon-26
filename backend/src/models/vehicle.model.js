import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    vehicleName: {
      type: String,
      required: true,
      trim: true,
    },

    vehicleType: {
      type: String,
      enum: [
        "Truck",
        "Van",
        "Mini Truck",
        "Trailer",
        "Bus",
        "Other",
      ],
      required: true,
    },

    maximumLoadCapacity: {
      type: Number,
      required: true,
    },

    odometer: {
      type: Number,
      default: 0,
    },

    acquisitionCost: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Available",
        "On Trip",
        "In Shop",
        "Retired",
      ],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;