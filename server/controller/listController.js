import Patient from "../models/patientModel.js";
import Admin from "../models/adminModel.js";
import Clinic from "../models/clinicModel.js";
import Patient_List from "../models/patientListModel.js";

// Storing patient to patient List
const storePatient = async (req, res, next) => {
  const patients = req.body; // Assuming req.body is an array of patients

  if (!Array.isArray(patients)) {
    return res.status(400).json({ message: "Request body must be an array" });
  }

  try {
    const user = await Admin.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "Unauthenticated User!" });
    }

    for (const patient of patients) {
      const {
        patientId,
        patientName,
        patientAge,
        patientEmail,
        patientContact,
        patientGender,
      } = patient;

      // Validate required fields
      if (
        !patientId ||
        !patientName ||
        !patientAge ||
        !patientEmail ||
        !patientGender
      ) {
        return res
          .status(400)
          .json({ message: "Missing required patient fields" });
      }

      // Check if the patient already exists in the Patient_List collection
      const existingPatient = await Patient_List.findOne({ patientId });

      if (existingPatient) {
        console.log(`Patient with ID ${patientId} already exists.`);
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
      }
    }

    res.status(200).json({ message: "Patients successfully stored" });
  } catch (error) {
    next(error);
  }
};

// Displaying all the patients
const displayPatients = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(400).json({ message: "Unauthenticated admin" });
    }

    const clinicId = admin.clinicId;

    const patient_list = await Patient_List.find({ clinicId }).exec();

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
    const admin = await Admin.findById(req.user.is);
    if (!admin) {
      return res.status(400).json({ message: "Admin unauthenticated" });
    }
    const newPatient = new Patient_List({
      patientName,
      patientAge,
      patientEmail,
      patientGender,
      patientContact,
      clinicId: admin.clinicId,
    });

    await newPatient.save();

    res.status(200).json({ message: "Patient successfully created" });
  } catch (error) {
    next(error);
  }
};

export default { storePatient, displayPatients, addPatient };
