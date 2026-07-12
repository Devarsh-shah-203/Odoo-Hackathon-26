import {
    createFuelLog,
    getFuelLogs
} from "../services/fuel.service.js";



// POST /api/fuel
export const createFuelLogController = async (req, res) => {

    try {

        const fuelLog = await createFuelLog(req.body);


        res.status(201).json({

            success: true,
            message: "Fuel log created successfully",
            data: fuelLog

        });


    } catch (error) {

        res.status(400).json({

            success:false,
            message:error.message

        });

    }

};




// GET /api/fuel
export const getFuelLogsController = async (req, res) => {


    try {

        const fuelLogs = await getFuelLogs();


        res.status(200).json({

            success:true,
            data:fuelLogs

        });


    } catch(error) {


        res.status(400).json({

            success:false,
            message:error.message

        });

    }

};