import express from "express";
import controller from "../controller/serviceController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyUser, controller.createService);

router.get("/get", verifyUser, controller.getServices);

router.get("/get/:id", verifyUser, controller.getService);

router.put("/update/:id", verifyUser, controller.updateService);

router.delete("/delete/:id", verifyUser, controller.deleteService);

// Patient Side
router.get("/fetch/:id", verifyUser, controller.patientService);

// Pagination Services
router.get("/paginated/services", verifyUser, controller.paginatedServices);

export default router;
