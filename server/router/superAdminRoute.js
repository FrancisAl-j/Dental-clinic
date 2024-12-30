import express from "express";
import controller from "../controller/superAdminController.js";

const router = express.Router();

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
