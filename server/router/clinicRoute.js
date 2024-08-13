import express from "express";
import controller from "../controller/clinicController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

// Creating clinic
router.post("/create", verifyUser, controller.createClinic);

// Output the information inside clinic
router.get("/:id", verifyUser, controller.getClinic);

// Get all the clinics
router.get("/clinics", controller.getClinics);

export default router;
