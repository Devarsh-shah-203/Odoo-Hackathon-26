# Odoo-Hackathon-26
# 🚚 TransitOps – Smart Transport Operations Platform

A modern Fleet & Transport Management System built to digitize and automate logistics operations. TransitOps helps organizations efficiently manage vehicles, drivers, trips, maintenance, fuel expenses, and operational analytics through a centralized dashboard.

> Built during the **Odoo Hackathon 2026**.

---

## 📖 Overview

Many logistics companies still rely on spreadsheets and manual records, leading to:

- Scheduling conflicts
- Vehicle underutilization
- Missed maintenance
- Expired driver licenses
- Poor expense tracking
- Lack of operational visibility

TransitOps solves these challenges by providing an end-to-end transport management platform with role-based access control and intelligent business rule enforcement.

---

## ✨ Features

### 🔐 Authentication & Authorization
- Secure JWT Authentication
- Role-Based Access Control (RBAC)
- Protected Routes
- Refresh Token Authentication

---

### 🚛 Vehicle Management

- Register new vehicles
- Update vehicle information
- Vehicle status tracking
- Vehicle availability management
- Vehicle retirement management

Vehicle Status:
- Available
- On Trip
- In Shop
- Retired

---

### 👨‍✈️ Driver Management

- Driver registration
- License tracking
- Safety score monitoring
- Driver availability management

Driver Status:
- Available
- On Trip
- Off Duty
- Suspended

---

### 📦 Trip Management

- Create trips
- Assign drivers
- Assign vehicles
- Dispatch trips
- Complete trips
- Cancel trips

Trip Lifecycle:

```
Draft
   │
   ▼
Dispatched
   │
   ├────────► Cancelled
   │
   ▼
Completed
```

---

### 🔧 Maintenance Management

- Create maintenance logs
- Track maintenance history
- Automatic vehicle status updates
- Remove vehicles from dispatch during maintenance

---

### ⛽ Fuel & Expense Tracking

- Fuel logging
- Expense management
- Maintenance cost tracking
- Operational cost calculation

---

### 📊 Dashboard & Analytics

- Fleet Utilization
- Active Vehicles
- Available Vehicles
- Vehicles in Maintenance
- Drivers On Duty
- Active Trips
- Pending Trips
- Fuel Efficiency
- Vehicle ROI

---

## 📋 Business Rules

TransitOps automatically enforces the following rules:

- Vehicle Registration Number must be unique.
- Vehicles under maintenance cannot be dispatched.
- Retired vehicles cannot be assigned to trips.
- Drivers with expired licenses cannot drive.
- Suspended drivers cannot be assigned.
- Drivers already on a trip cannot be reassigned.
- Vehicles already on a trip cannot be reassigned.
- Cargo weight cannot exceed vehicle capacity.
- Dispatching automatically updates vehicle and driver status.
- Completing a trip restores driver and vehicle availability.
- Cancelling a trip restores assigned resources.
- Starting maintenance automatically marks vehicle as "In Shop".

---

## 👥 User Roles

### Fleet Manager

- Vehicle Management
- Maintenance Management
- Fleet Dashboard
- Reports

---

### Driver

- View Assigned Trips
- Trip Updates
- Complete Trips

---

### Safety Officer

- Driver Verification
- License Monitoring
- Safety Compliance

---

### Financial Analyst

- Expense Reports
- Fuel Analytics
- Cost Analysis
- ROI Reports

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

### Tools

- Git
- GitHub
- Postman

---


## 📌 API Modules

- Authentication
- Users
- Vehicles
- Drivers
- Trips
- Maintenance
- Fuel Logs
- Expenses
- Dashboard
- Analytics

---

## 📈 Future Improvements

- PDF Report Export
- CSV Export
- Email Notifications
- License Expiry Alerts
- Vehicle Document Management
- Advanced Analytics
- Dark Mode
- Search & Filtering
- Fleet Heatmaps

---



---

## ⭐ Acknowledgements

Special thanks to **Odoo Hackathon 2026** for providing the problem statement and opportunity to build a real-world logistics management solution.
