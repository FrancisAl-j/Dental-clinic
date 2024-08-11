import express from "express";
import controller from "../controller/authController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

// For admin sign up and sign in
router.post("/admin/signup", controller.adminRegister);
router.post("/admin/signin", controller.adminSignin);

// For assistant sign up and sign in
router.post("/assistant/signup", verifyUser, controller.assistantSignup);

// Sign out
router.get("/admin/signout", verifyUser, controller.signout);

export default router;
