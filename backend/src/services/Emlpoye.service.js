import User from "../models/user.model.js";
import Driver from "../models/driver.model.js";

import ApiError from "../utils/ApiError.js";
import { sendWelcomeEmployeeEmail } from "./email.service.js";

export const createEmployeeService = async (data) => {
  const {
    username,
    email,
    password,
    phone,
    role,
    driverDetails,
  } = data;

  // Check if employee already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "Employee already exists.");
  }

  // Validate Driver Details
  if (role === "DRIVER") {
    if (!driverDetails) {
      throw new ApiError(
        400,
        "Driver details are required for Driver role."
      );
    }

    const existingLicense = await Driver.findOne({
      licenseNumber: driverDetails.licenseNumber,
    });

    if (existingLicense) {
      throw new ApiError(
        409,
        "License number already exists."
      );
    }
  }

  // Create User
  const user = await User.create({
    username,
    email,
    password,
    phone,
    role,
  });

  // Create Driver Profile
  if (role === "DRIVER") {
    await Driver.create({
      user: user._id,
      licenseNumber: driverDetails.licenseNumber,
      licenseCategory: driverDetails.licenseCategory,
      licenseExpiryDate: driverDetails.licenseExpiryDate,
      safetyScore: driverDetails.safetyScore ?? 100,
      status: "Available",
    });
  }

  // Send Welcome Email
  await sendWelcomeEmployeeEmail({
    username,
    role,
    email,
    temporaryPassword: password,
  });

  return user;
};

export const getEmployeesService = async () => {
    return await User.find().select("-password");
  };

export const getEmployeeByIdService = async (id) => {
    const user = await User.findById(id).select("-password");
  
    if (!user) {
      throw new ApiError(404, "Employee not found");
    }
  
    if (user.role === "DRIVER") {
      const driver = await Driver.findOne({ user: user._id });
  
      return {
        user,
        driver,
      };
    }
  
    return { user };
  };

export const updateEmployeeService = async (id, data) => {
    const user = await User.findById(id);
  
    if (!user) {
      throw new ApiError(404, "Employee not found");
    }
  
    // Update User Fields
    user.username = data.username ?? user.username;
    user.email = data.email ?? user.email;
    user.phone = data.phone ?? user.phone;
    user.role = data.role ?? user.role;
  
    if (data.password) {
      user.password = data.password;
    }
  
    await user.save();
  
    // Update Driver Profile
    if (user.role === "DRIVER" && data.driverDetails) {
      await Driver.findOneAndUpdate(
        { user: user._id },
        {
          licenseNumber: data.driverDetails.licenseNumber,
          licenseCategory: data.driverDetails.licenseCategory,
          licenseExpiryDate: data.driverDetails.licenseExpiryDate,
          safetyScore: data.driverDetails.safetyScore,
          status: data.driverDetails.status,
        },
        {
          new: true,
        }
      );
    }
  
    return user;
  };

export const deleteEmployeeService = async (id) => {
    const user = await User.findById(id);
  
    if (!user) {
      throw new ApiError(404, "Employee not found");
    }
  
    if (user.role === "DRIVER") {
      await Driver.findOneAndDelete({
        user: user._id,
      });
    }
  
    await User.findByIdAndDelete(id);
  
    return true;
  };