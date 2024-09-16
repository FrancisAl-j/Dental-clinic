import express from "express";
import controller from "../controller/clinicController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

// Patients list
router.get("/patient", verifyUser, controller.getPatients);

// Creating clinic
router.post("/create", verifyUser, controller.createClinic);

// Output the information inside clinic
router.get("/:id", verifyUser, controller.getClinic);

// Get all the clinics
router.get("/", verifyUser, controller.getClinics);

// Patient side getting one clinic
router.get("/view/:id", verifyUser, controller.viewClinic);

// Updating clinic
router.put("/update/:id", verifyUser, controller.updateClinic);

// Deleting clinic along with employees
router.delete("/delete/:id", verifyUser, controller.deleteClinic);

// Appointment schedule
router.post("/appointment", verifyUser, controller.appointment);

// Fetching Appointment lists
router.get("/appointment/list", verifyUser, controller.appointmentLists);

// Updating status
router.put("/status/:id", verifyUser, controller.updateStatus);

router.delete(
  "/appointment/delete/:id",
  verifyUser,
  controller.deleteAppointment
);

export default router;
