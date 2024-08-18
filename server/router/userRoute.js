import express from "express";
import controller from "../controller/userController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.put("/update/:id", verifyUser, controller.userUpdate);

router.delete("/patient/:id", verifyUser, controller.deletePatient);

router.delete("/admin/:id", verifyUser, controller.deleteAdmin);

export default router;
