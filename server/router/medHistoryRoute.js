import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import controller from "../controller/medHistoryController.js";

const router = express.Router();

router.post("/create", verifyUser, controller.createMedicalHistory);
router.get("/get", verifyUser, controller.fetchPatientMedical);
router.put(
  "/update/:id/:questionsId",
  verifyUser,
  controller.updateMedicalHistory
);

// Fetching Diseases & Allergic
router.get("/get/diseases", verifyUser, controller.fetchDiseases);
router.get("/get/allergic", verifyUser, controller.fetchAlergic);

// !! Admin fetching of medical history
router.get("/get/medical/:id", verifyUser, controller.fetchAdminMedical);

export default router;
