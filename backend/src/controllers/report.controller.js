import {
    getTripReport,
    getMaintenanceReport,
    getFuelReport,
    getExpenseReport,
    getFleetSummaryReport
} from "../services/report.service.js";





export const tripReport = async(req,res)=>{

    try{

        const report = await getTripReport();


        res.status(200).json({
            success:true,
            data:report
        });


    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};







export const maintenanceReport = async(req,res)=>{

    try{


        const report = await getMaintenanceReport();


        res.status(200).json({
            success:true,
            data:report
        });



    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};









export const fuelReport = async(req,res)=>{


    try{


        const report = await getFuelReport();


        res.status(200).json({
            success:true,
            data:report
        });



    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};








export const expenseReport = async(req,res)=>{


    try{


        const report = await getExpenseReport();


        res.status(200).json({
            success:true,
            data:report
        });



    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};









export const fleetSummaryReport = async(req,res)=>{


    try{


        const report = await getFleetSummaryReport();


        res.status(200).json({
            success:true,
            data:report
        });



    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};