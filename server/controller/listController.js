import Patient from "../models/patientModel.js";
import Admin from "../models/adminModel.js";
import Clinic from "../models/clinicModel.js";
import Patient_List from "../models/patientListModel.js";
import Assistant from "../models/assistantModel.js";
import Cashier from "../models/cashierModel.js";
// For image ocr
import { createWorker } from "tesseract.js";
import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const preProccessImage = async (imagePath) => {
  const uploadsDir = path.join(__dirname, "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }
  // Create the path for the processed image in the uploads folder
  const processImagePath = path.join(
    uploadsDir,
    "processed_" + path.basename(imagePath)
  );

  await sharp(imagePath)
    .resize({ width: 800 }) // Resize to improve OCR
    .grayscale() // Convert to grayscale
    .normalize() // Normalize the image to enhance contrast
    .toFile(processImagePath);

  return processImagePath;
};

// Storing patient to patient List
const storePatient = async (req, res, next) => {
  const patients = req.body; // Assuming req.body is an array of patients

  if (!Array.isArray(patients)) {
    return res.status(400).json({ message: "Request body must be an array" });
  }

  try {
    let user = await Admin.findById(req.user.id);
    if (!user) {
      user = await Assistant.findById(req.user.id);
      if (!user) {
        return res.status(401).json({ message: "User not authenticated" });
      }
    }

    for (const patient of patients) {
      console.log(`Processing patient ID: ${patient.patientId}`);
      const {
        patientId,
        patientName,
        patientAge,
        patientEmail,
        patientContact,
        patientGender,
        clinicId,
      } = patient;

      // Validate required fields
      if (
        !patientId ||
        !patientName ||
        !patientAge ||
        !patientEmail ||
        !patientGender ||
        !patientContact
      ) {
        return res
          .status(400)
          .json({ message: "Missing required patient fields" });
      }

      // Check if the patient already exists in the Patient_List collection
      const existingPatient = await Patient_List.findOne({
        patientId,
        clinicId: user.clinicId,
      });

      if (existingPatient) {
        console.log(
          `Patient with ID ${patientId} already exists in this clinic ${clinicId}`
        );
        // You could update the existing patient record if needed
      } else {
        // Create a new patient document if it doesn't exist
        const newPatient = new Patient_List({
          patientId,
          patientName,
          patientAge,
          patientEmail,
          patientContact,
          patientGender,
          clinicId: user.clinicId,
        });

        await newPatient.save();
        console.log(`Patient with ID ${patientId} successfully stored.`);
      }
    }
    res.status(200).json({ message: "Patients successfully stored" });
  } catch (error) {
    next(error);
  }
};

// Displaying all the patients
const displayPatients = async (req, res, next) => {
  // Query is use to search the patients name
  const { query } = req.query;
  const searchQuery = query ? String(query) : "";
  try {
    let user = await Admin.findById(req.user.id);
    if (!user) {
      user = await Assistant.findById(req.user.id);
      if (!user) {
        user = await Cashier.findById(req.user.id);
        if (!user) {
          return res.status(401).json({ message: "User is not authenticated" });
        }
      }
    }

    const clinicId = user.clinicId;

    const patient_list = await Patient_List.find({
      clinicId,
      ...(searchQuery && {
        patientName: { $regex: query, $options: "i" },
      }),
    }).exec();

    res.status(200).json(patient_list);
  } catch (error) {
    next(error);
  }
};

// Manually adding patients
const addPatient = async (req, res, next) => {
  const {
    patientName,
    patientAge,
    patientEmail,
    patientGender,
    patientContact,
  } = req.body;
  try {
    let user = await Admin.findById(req.user.id);
    if (!user) {
      user = await Assistant.findById(req.user.id);
      if (!user) {
        user = await Cashier.findById(req.user.id);
        if (!user) {
          return res.status(401).json({ message: "User is not authenticated" });
        }
      }
    }

    const newPatient = new Patient_List({
      patientName,
      patientAge,
      patientEmail,
      patientGender,
      patientContact,
      clinicId: user.clinicId,
    });

    await newPatient.save();

    res.status(200).json({ message: "Patient successfully created" });
  } catch (error) {
    next(error);
  }
};

const optionPatients = async (req, res, next) => {
  try {
    let user = await Admin.findById(req.user.id);
    if (!user) {
      user = await Assistant.findById(req.user.id);
      if (!user) {
        return res.status(401).json({ message: "User unauthenticated" });
      }
    }

    const clinicId = user.clinicId;

    const patients = await Patient_List.find({ clinicId });

    res.status(200).json(patients);
  } catch (error) {
    next(error);
  }
};

// For Extracting data/text from image based on name, email, age, etc..
let extractPatientsData = (text, clinicId) => {
  console.log("Extracted Text:\n", text); // Debug: Log extracted text
  const lines = text.split("\n").filter((line) => line.trim() !== ""); // Split text into lines
  const patients = [];
  const skipped = [];

  const nameRegex = /([A-Za-z\s,.']+)/;
  const emailRegex = /([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/;
  const contactRegex = /(\+?\d[\d\s-]+)/;
  const ageRegex = /(\d{1,3})/;
  const genderRegex = /\b(Male|Female)\b/i;

  lines.forEach((line) => {
    let name = line.match(nameRegex) ? line.match(nameRegex)[0].trim() : null;
    let email = line.match(emailRegex)
      ? line.match(emailRegex)[0].trim()
      : null;
    let contact = line.match(contactRegex)
      ? line.match(contactRegex)[0].trim().replace(/\s+/g, "")
      : null;
    let age = line.match(ageRegex)
      ? parseInt(line.match(ageRegex)[0], 10)
      : null;
    let gender = line.match(genderRegex)
      ? line.match(genderRegex)[0].trim()
      : null;

    const isValidEmail = email
      ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      : false;
    const isValidAge = age ? /^\d+$/.test(age.toString()) : false; // Ensure age is a number
    const isValidContact = contact ? /^\+?\d[\d\s-]+$/.test(contact) : false; // Ensure valid contact format
    const isValidGender = gender ? /^(Male|Female)$/i.test(gender) : false;

    if (isValidEmail && isValidAge && isValidContact && isValidGender) {
      patients.push({
        patientName: name.trim(),
        patientEmail: email.trim(),
        patientAge: parseInt(age, 10),
        patientContact: contact.trim().replace(/\s+/g, ""), // Clean up the contact number
        patientGender: gender.trim(),
        clinicId,
      });
    } else {
      skipped.push({
        line,
        reason: `Invalid field(s): ${!isValidEmail ? "Email" : ""} ${
          !isValidAge ? "Age" : ""
        } ${!isValidContact ? "Contact" : ""} ${
          !isValidGender ? "Gender" : ""
        }`.trim(),
      });
    }
  });

  if (skipped.length > 0) {
    console.log("Skipped lines:", skipped);
  }

  return { patients, skipped };
};

// Adding patient using image OCR
const createPatientWithImage = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(401).json({ message: "Admin unauthenticated!" });
    }

    const clinicId = admin.clinicId;
    const processImagePath = await preProccessImage(req.file.path);
    let worker = await createWorker();

    const { data } = await worker.recognize(processImagePath, "eng", {
      tessedit_char_whitelist:
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@.",
      psm: 6,
    });
    const text = data.text;

    await worker.terminate();

    const { patients, skipped } = extractPatientsData(text, clinicId);

    if (patients.length === 0) {
      return res
        .status(400)
        .json({ message: "No patient data found in the image." });
    }

    if (skipped.length > 0) {
      console.log("Skipped lines:", skipped);
    }

    // Log the patients data before saving
    console.log("Patients to be saved:", patients);

    const savedPatients = await Patient_List.insertMany(patients);

    await fs.unlink(req.file.path);

    res
      .status(201)
      .json({ message: "Patient data saved", patients: savedPatients });
  } catch (error) {
    next(error);
  }
};

// Delete Patient
const deletePatient = async (req, res, next) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(401).json({ message: "Admin not authenticated" });
    }

    const patient = await Patient_List.findByIdAndDelete(id);

    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export default {
  storePatient,
  displayPatients,
  addPatient,
  optionPatients,
  createPatientWithImage,
  deletePatient,
};
