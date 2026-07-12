import mongoose from "mongoose";


const fuelLogSchema = new mongoose.Schema(
    {

        vehicle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            required: true,
        },


        trip: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Trip",
            required: true,
        },


        fuelType: {
            type: String,
            enum: [
                "Diesel",
                "Petrol",
                "CNG",
                "Electric"
            ],
            default: "Diesel",
        },


        quantity: {
            type: Number,
            required: true,
            min: 0,
        },


        pricePerLiter: {
            type: Number,
            required: true,
            min: 0,
        },


        totalCost: {
            type: Number,
            required: true,
            min: 0,
        },


        fuelStation: {
            type: String,
            required: true,
            trim: true,
        },


        odometerReading: {
            type: Number,
            required: true,
        },


        fuelDate: {
            type: Date,
            default: Date.now,
        },


        remarks: {
            type: String,
            default: "",
            trim: true,
        }

    },
    {
        timestamps:true
    }
);



const FuelLog = mongoose.model(
    "FuelLog",
    fuelLogSchema
);


export default FuelLog;