import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRoutes from "./routes/auth.route.js";
import authRoutes from "./routes/auth.routes.js";
import tripRoutes from "./routes/trip.route.js";
import maintenanceRoutes from "./routes/maintenance.routes.js";
import fuelRoutes from "./routes/fuel.routes.js";
import employeeRoutes from "./routes/Employe.routes.js"
import dashboardRoutes from "./routes/dashboard.routes.js";

import employeeRoutes from "./routes/Employe.routes.js"
import vehiclesRoutes from "./routes/vehicle.routes.js"
const app = express();



app.use(cors({ // frontend on 3000 and backend on 8000
    origin: ['http://localhost:8000', 'http://localhost:5173'],
    credentials: true,
  }));


app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/manager",employeeRoutes)
app.use("/api/trips", tripRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/fuel", fuelRoutes);
app.use("/api/manager",employeeRoutes)
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/vehicles", vehiclesRoutes);


app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running 🚀",
  });
});

export default app;