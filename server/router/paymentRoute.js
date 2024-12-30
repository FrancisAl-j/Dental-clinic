import express from "express";
import controller from "../controller/paymentController.js";
import { verifyUser } from "../utils/verifyUser.js";
import { planExpired } from "../controller/paymentController.js";

const router = express.Router();

router.post("/pay", verifyUser, controller.paymentPlatform);
router.post("/verify", verifyUser, controller.verifyPayment);
//router.post("/expires", verifyUser, planExpired);

export default router;
