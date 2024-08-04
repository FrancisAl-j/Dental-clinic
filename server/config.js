import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const connectDB = () => {
  try {
    mongoose.connect(process.env.DATABASE);
    console.log("Successfully connected to database");
  } catch (error) {
    console.log("Cannot connect to database");
  }
};

export default connectDB;
