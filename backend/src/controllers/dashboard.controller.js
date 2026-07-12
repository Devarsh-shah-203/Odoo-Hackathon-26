import {
  getDashboardStats,
  getRecentTrips,
  getRecentMaintenance
} from "../services/dashboard.service.js";



export const dashboardStats = async (req, res) => {

  try {

    const stats = await getDashboardStats();

    res.status(200).json({
      success: true,
      data: stats
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};





export const recentTrips = async (req, res) => {

  try {

    const trips = await getRecentTrips();


    res.status(200).json({
      success: true,
      data: trips
    });


  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};






export const recentMaintenance = async (req,res)=>{

  try{

    const maintenance = await getRecentMaintenance();


    res.status(200).json({
      success:true,
      data:maintenance
    });


  }catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};