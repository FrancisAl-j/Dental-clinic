import express from "express";
import controller from "../controller/serviceController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

// Fetching dentist for clinic
router.get("/fetch/dentist", verifyUser, controller.fetchDentists);

router.post("/create", verifyUser, controller.createService);

router.get("/get", verifyUser, controller.getServices);

router.get("/get/:id", verifyUser, controller.getService);

router.put("/update/:id", verifyUser, controller.updateService);

router.delete("/delete/:id", verifyUser, controller.deleteService);

// Patient Side
router.get("/fetch/:id", verifyUser, controller.patientService);
router.get("/clinic/services", verifyUser, controller.clinicServices);

// Pagination Services
router.get("/paginated/services", verifyUser, controller.paginatedServices);

// Patient services for appointent
router.get("/appointment/services", verifyUser, controller.patientGetServices);

// Search for Services (Patient's side)
router.get("/search/services", controller.fetchAllServices);

// All services
router.get("/all/services", controller.allServices);

export default router;
