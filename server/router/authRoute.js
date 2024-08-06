import express from "express";
import controller from "../controller/authController.js";

const router = express.Router();

router.post("/admin/signup", controller.adminRegister);

export default router;
