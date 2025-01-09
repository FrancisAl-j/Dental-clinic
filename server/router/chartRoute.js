import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import controller from "../controller/chartController.js";

const router = express.Router();

router.post("/create", verifyUser, controller.createDentalChart); // Create Dental Chart for specific patient
router.get("/get/notes/patient", verifyUser, controller.fetchPatientNotes);
router.get("/get/:id", verifyUser, controller.fetchDentalChart); // Fetch Dentap chart of a patient
router.put("/update/chart/:id", verifyUser, controller.updateChart);
router.put("/update/:id/:toothId", verifyUser, controller.updateStatus); // Updating the status of tooth
router.put("/clear/:id/:toothId", verifyUser, controller.clearTooth); // Updating the status of tooth

router.put("/create/notes/:id", verifyUser, controller.createNotes);
router.get("/get/notes/:id", verifyUser, controller.fetchNotes);

export default router;
