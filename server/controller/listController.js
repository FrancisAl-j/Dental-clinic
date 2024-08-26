import Patient from "../models/patientModel.js";
import Admin from "../models/adminModel.js";
import Clinic from "../models/clinicModel.js";
import Patient_List from "../models/patientListModel.js";

// Storing patient to patient List
const storePatient = async (req, res, next) => {
  const {
    patientName,
    patientAge,
    patientEmail,
    patientContact,
    patientGender,
  } = req.body;
  try {
    const user = await Admin.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "Unauthenticated User!" });
    }
    const newPatientList = new Patient_List(
      patientName,
      patientAge,
      patientEmail,
      patientContact,
      patientGender
    );

    newPatientList.clinicId = user.clinicId;

    await newPatientList.save();
    res.status(200).json({ message: "Patient successfully stored" });
  } catch (error) {
    next(error);
  }
};

export default { storePatient };
