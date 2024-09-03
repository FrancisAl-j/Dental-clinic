import Admin from "../models/adminModel.js";
import DentalRecord from "../models/dentalRecordModel.js";

const createDentalRecord = async (req, res, next) => {
  const { patientId, treatments, conditions, chartDetails } = req.body;
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(401).json({ message: "Admin unauthenticated" });
    }

    const newDentalRecord = new DentalRecord({
      patientId,
      treatments,
      conditions,
      chartDetails,
      clinicId: admin.clinicId,
    });

    await newDentalRecord.save();

    res.status(200).json({ message: "Dental record created" });
  } catch (error) {
    next(error);
  }
};

export default { createDentalRecord };
