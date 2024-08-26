import Patient from "../models/patientModel.js";
import Admin from "../models/adminModel.js";
import Clinic from "../models/clinicModel.js";
import Patient_List from "../models/patientListModel.js";

// Storing patient to patient List
const storePatient = async (req, res, next) => {
  const patients = req.body; // Assuming req.body is an array of patients

  // Check if req.body is an array
  if (!Array.isArray(patients)) {
    return res.status(400).json({ message: "Request body must be an array" });
  }

  try {
    const user = await Admin.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "Unauthenticated User!" });
    }

    // Iterate over the patients array and validate each patient object
    const patientDocs = patients.map((patient) => {
      const {
        patientName,
        patientAge,
        patientEmail,
        patientContact,
        patientGender,
      } = patient;

      // Validate required fields
      if (!patientName || !patientAge || !patientEmail || !patientGender) {
        throw new Error("Missing required patient fields");
      }

      // Return a new Patient_List document
      return new Patient_List({
        patientName,
        patientAge,
        patientEmail,
        patientContact,
        patientGender,
        clinicId: user.clinicId, // Assign the clinicId here
      });
    });

    // Save all patient documents to MongoDB using insertMany
    await Patient_List.insertMany(patientDocs);

    res.status(200).json({ message: "Patients successfully stored" });
  } catch (error) {
    // Check if error is from patient validation
    if (error.message === "Missing required patient fields") {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};

export default { storePatient };
