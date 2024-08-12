import express from "express";
import controller from "../controller/authController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

// For admin sign up and sign in
router.post("/admin/signup", controller.adminRegister);
router.post("/admin/signin", controller.adminSignin);

// For assistant sign up
router.post("/assistant/signup", verifyUser, controller.assistantSignup);

// For cashier sign up
router.post("/cashier/signup", verifyUser, controller.cashierSignup);

// Patient sign up
router.post("/patient/signup", controller.patientSignup);

// Sign out
router.get("/admin/signout", verifyUser, controller.signout);

export default router;
