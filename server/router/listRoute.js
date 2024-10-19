import express from "express";
import controller from "../controller/listController.js";
import multer from "multer";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

// Multer middleware for uploading images to uploads folder
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });

// Storing patient to patient List
router.post("/patients", verifyUser, controller.storePatient);

// Display all the patients inside database
router.get("/patient-list", verifyUser, controller.displayPatients);

// Manually creating patients
router.post("/create-patient", verifyUser, controller.addPatient);

// Option patients
router.get("/option", verifyUser, controller.optionPatients);

// Creating patients through image ocr
router.post(
  "/image-ocr",
  verifyUser,
  upload.single("file"),
  controller.createPatientWithImage
);

export default router;
