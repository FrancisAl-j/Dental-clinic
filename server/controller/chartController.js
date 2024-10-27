import Admin from "../models/adminModel.js";
import Chart from "../models/chartModel.js";
import Patient_List from "../models/patientListModel.js";

const createDentalChart = async (req, res, next) => {
  const { patientId, teeth } = req.body;
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(401).json({ message: "Admin unauthenticated." });
    }

    const clinicId = admin.clinicId;

    const newChart = new Chart({
      patientId,
      clinicId,
      teeth,
    });

    await newChart.save();
  } catch (error) {
    next(error);
  }
};

export default { createDentalChart };
