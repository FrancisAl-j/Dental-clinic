import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import crypto from "crypto";
import bodyParser from "body-parser";
import cron from "node-cron";

// Files
import connectDB from "./config.js";
import authRoute from "./router/authRoute.js";
import clinicRoute from "./router/clinicRoute.js";
import userRoute from "./router/userRoute.js";
import listRoute from "./router/listRoute.js";
import searchRoute from "./router/searchRoute.js";
import sendAppointmentsReminder from "./sendingEmails/nodeMailer.js";
import dentalRecordRoute from "./router/dentalRecordRoute.js";
import serviceRoute from "./router/serviceRoute.js";
import recommendationRoute from "./router/recommendationRoute.js";
import chartRoute from "./router/chartRoute.js";

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//const secretKey = crypto.randomBytes(64).toString("hex");
//console.log("Generated Secret Key:", secretKey);

cron.schedule("0 0 * * *", () => {
  console.log("Running the reminder email cron job...");
  sendAppointmentsReminder();
});

// for Authentication
app.use("/auth", authRoute);

// For clinic
app.use("/clinic", clinicRoute);

// For Users
app.use("/user", userRoute);

// List of patients
app.use("/list", listRoute);

// Searchin for specific patients
app.use("/search", searchRoute);

// Dental Record for recommendation for services
app.use("/dental", dentalRecordRoute);

// For services of each clinics
app.use("/service", serviceRoute);

// API for recommendation
app.use("/api", recommendationRoute);

// Debtal Chart
app.use("/api/chart", chartRoute);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
  connectDB();
});
