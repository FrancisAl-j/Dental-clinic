import express from "express";
//import controller from "../controller/dentalRecordController.js";
import controller from "../controller/dentalRecordController.js";

const router = express.Router();

router.post("/create-record", controller.createDentalRecord);

export default router;
