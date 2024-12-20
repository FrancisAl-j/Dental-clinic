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

    res.status(200).json({ message: "Dental Chart created!" });
  } catch (error) {
    next(error);
  }
};

// Fetching Dental Chart
const fetchDentalChart = async (req, res, next) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(401).json({ message: "Admin unauthenticated." });
    }

    const clinicId = admin.clinicId;

    const chart = await Chart.find({ patientId: id, clinicId });

    res.status(200).json(chart);
  } catch (error) {
    next(error);
  }
};

// Update the status of the teeth
const updateStatus = async (req, res, next) => {
  const { status } = req.body;
  const { id, toothId } = req.params;
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(401).json({ message: "Admin not authenticated." });
    }

    const clinicId = admin.clinicId;

    const chart = await Chart.findById(id);

    const teeth = chart.teeth.id(toothId);

    teeth.status = status;

    await chart.save();

    res.status(200).json(chart);
  } catch (error) {
    next(error);
  }
};

export default { createDentalChart, fetchDentalChart, updateStatus };
