import express from "express";
import controller from "../controller/recommendationController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

// Get the recommendation base on conditions and treatments needed by the patient
router.get("/recommendation/:id", verifyUser, controller.getRecommendation);

export default router;
