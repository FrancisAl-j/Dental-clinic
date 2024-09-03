import express from "express";
import controller from "../controller/serviceController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyUser, controller.createService);

export default router;
