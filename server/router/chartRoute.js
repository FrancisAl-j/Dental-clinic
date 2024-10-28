import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import controller from "../controller/chartController.js";

const router = express.Router();

router.post("/create", verifyUser, controller.createDentalChart); // Create Dental Chart for specific patient
router.get("/get/:id", verifyUser, controller.fetchDentalChart); // Fetch Dentap chart of a patient

export default router;
