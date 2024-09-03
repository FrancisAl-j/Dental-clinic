import express from "express";
import controller from "../controller/dentalRecordController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create-record", verifyUser, controller.createDentalRecord);

export default router;
