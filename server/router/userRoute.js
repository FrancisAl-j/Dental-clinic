import express from "express";
import controller from "../controller/userController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.put("/update/:id", verifyUser, controller.userUpdate);

router.delete("/patient/:id", verifyUser, controller.deletePatient);

router.delete("/admin/:id", verifyUser, controller.deleteAdmin);

// History of Appointments for patient
router.get("/appointments", verifyUser, controller.viewAppointment);

// Patient cancelling Appointments
router.delete("/cancel/:id", verifyUser, controller.cancelAppointment);

router.post("/click/services", verifyUser, controller.interestedServices);

router.get("/service/dentists", verifyUser, controller.getDentists);

export default router;
