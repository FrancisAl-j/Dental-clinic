import Admin from "../models/adminModel.js";
import Patient_List from "../models/patientListModel.js";

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

export default { queryPatient };
