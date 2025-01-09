import express from "express";
import controller from "../controller/superAdminController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

// Clinic
router.get("/get/employees", verifyUser, controller.fetchEmployees);
router.delete("/delete/employees/:id", verifyUser, controller.deleteEmployees);
router.put("/update/employees/:id", verifyUser, controller.updateEmployees);

router.get("/get/admins", controller.fetchAllAdmins);
router.put("/update/admin/:id", controller.updateActiveAdmin);
router.delete("/delete/admin/:id", controller.deleteAdmins);

router.get("/get/clinics", controller.fetchAllClinics);
router.put("/update/clinic/:id", controller.updateActiveClinic);
router.delete("/delete/clinic/:id", controller.deleteClinic);

router.get("/get/patients", controller.fetchPatients);
router.put("/update/patient/:id", controller.updateActiveStatus);
router.delete("/delete/patient/:id", controller.deletePatient);

export default router;
