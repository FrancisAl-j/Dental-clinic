import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import crypto from "crypto";

// Files
import connectDB from "./config.js";
import authRoute from "./router/authRoute.js";
import clinicRoute from "./router/clinicRoute.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
  connectDB();
});

//const secretKey = crypto.randomBytes(64).toString("hex");
//console.log("Generated Secret Key:", secretKey);

// for Authentication
app.use("/auth", authRoute);

// For clinic
app.use("/clinic", clinicRoute);

app.use((err, req, res, next) => {
  console.error(err); // Log the full error details to the server console
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
