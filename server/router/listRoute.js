import express from "express";
import controller from "../controller/listController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

// Storing patient to patient List
router.post("/patients", verifyUser, controller.storePatient);

// Display all the patients inside database
router.get("/patient-list", verifyUser, controller.displayPatients);

// Manually creating patients
router.post("/create-patient");

export default router;
