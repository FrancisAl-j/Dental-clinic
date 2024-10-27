import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import controller from "../controller/chartController.js";

const router = express.Router();

router.post("/create", verifyUser, controller.createDentalChart);

export default router;
