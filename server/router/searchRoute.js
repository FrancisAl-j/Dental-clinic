import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import controller from "../controller/searchController.js";

const router = express.Router();

router.get("/names", verifyUser, controller.queryPatient);
router.get("/clinics", verifyUser, controller.searchClinics);

export default router;
