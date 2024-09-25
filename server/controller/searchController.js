import Admin from "../models/adminModel.js";
import Patient_List from "../models/patientListModel.js";
import Patient from "../models/patientModel.js";
import Clinic from "../models/clinicModel.js";

// Employers and admin side
const queryPatient = async (req, res, next) => {
  const { query } = req.query;
  const searchQuery = query ? String(query) : "";
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(400).json({ message: "Admin not authenticated" });
    }

    const patients = await Patient_List.find({
      clinicId: admin.clinicId,

      ...(searchQuery && {
        patientName: { $regex: searchQuery, $options: "i" },
      }),
    });

    res.status(200).json(patients);
  } catch (error) {
    next(error);
  }
};

const searchClinics = async (req, res, next) => {
  const { query } = req.query;
  try {
    const user = await Patient.findById(req.user.user.id);

    if (!user) {
      return res.status(401).json({ message: "User not authenticated!" });
    }

    if (!query || query.trim() === "") {
      // Return an empty array if the search query is empty
      return res.status(200).json([]);
    }

    const clinics = await Clinic.find({
      clinicName: {
        $regex: query,
        $options: "i",
      },
    });

    res.status(200).json(clinics);
  } catch (error) {
    next(error);
  }
};

export default { queryPatient, searchClinics };
