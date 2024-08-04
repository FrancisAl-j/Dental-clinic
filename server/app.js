import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// Files
import connectDB from "./config.js";

const app = express();

app.use(express.json());

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
  connectDB();
});
