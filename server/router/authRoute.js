import express from "express";
import controller from "../controller/authController.js";

const router = express.Router();

router.post("/admin/signup", controller.adminRegister);
router.post("/admin/signin", controller.adminSignin);

// Sign out
router.get("/admin/signout", controller.signout);

export default router;
