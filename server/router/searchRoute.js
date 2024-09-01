import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import controller from "../controller/searchController.js";

const router = express.Router();

router.get("/names", verifyUser, controller.queryPatient);

export default router;
