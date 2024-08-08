import express from "express";
import controller from "../controller/clinicController.js";

const router = express.Router();

router.post("/create", controller.createClinic);

export default router;
