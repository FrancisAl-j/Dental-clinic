import express from "express";
import controller from "../controller/listController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

// Storing patient to patient List
router.post("/patients", verifyUser, controller.storePatient);
