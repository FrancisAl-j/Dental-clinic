import express from "express";
import controller from "../controller/serviceController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyUser, controller.createService);

router.get("/get", verifyUser, controller.getServices);

router.get("/get/:id", verifyUser, controller.getService);

router.put("update/:id", verifyUser, controller.updateService);

export default router;
