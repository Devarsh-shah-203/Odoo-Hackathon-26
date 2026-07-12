import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema(
    {
        maintenanceNumber: {
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

        maintenanceType: {
            type: String,
            enum: [
                "Oil Change",
                "Tyre Replacement",
                "Engine Repair",
                "Brake Service",
                "General Service",
                "Battery Replacement",
                "Insurance",
                "Other",
            ],
            required: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        serviceCenter: {
            type: String,
            required: true,
            trim: true,
        },

        estimatedCost: {
            type: Number,
            required: true,
            min: 0,
        },

        actualCost: {
            type: Number,
            default: 0,
        },

        scheduledDate: {
            type: Date,
            required: true,
        },

        completedDate: {
            type: Date,
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "In Progress",
                "Completed",
            ],
            default: "Pending",
        },

        remarks: {
            type: String,
            default: "",
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Maintenance = mongoose.model(
    "Maintenance",
    maintenanceSchema
);

export default Maintenance;