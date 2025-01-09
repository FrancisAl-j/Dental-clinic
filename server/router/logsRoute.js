import express from "express";
import controller from "../controller/logsController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

// Fetch clinic's Activity Logs
router.get("/activity-logs", verifyUser, controller.fetchActivityLogs);
router.delete("/delete", verifyUser, controller.deleteAllLogs);

export default router;
