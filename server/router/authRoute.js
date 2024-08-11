import express from "express";
import controller from "../controller/authController.js";

const router = express.Router();

// For admin sign up and sign in
router.post("/admin/signup", controller.adminRegister);
router.post("/admin/signin", controller.adminSignin);

// For assistant sign up and sign in
router.post("/assistant/signup");

// Sign out
router.get("/admin/signout", controller.signout);

export default router;
