import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    tripNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: true,
    },

    source: {
      type: String,
      required: true,
      trim: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    cargoWeight: {
      type: Number,
      required: true,
      min: 0,
    },

    plannedDistance: {
      type: Number,
      required: true,
      min: 0,
    },

    actualDistance: {
      type: Number,
      default: 0,
    },

    fuelUsed: {
      type: Number,
      default: 0,
    },

    startOdometer: {
      type: Number,
      default: 0,
    },

    endOdometer: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "Draft",
        "Dispatched",
        "Completed",
        "Cancelled",
      ],
      default: "Draft",
    },

    dispatchedAt: {
      type: Date,
    },

    completedAt: {
      type: Date,
    },

    remarks: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;