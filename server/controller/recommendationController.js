import Admin from "../models/adminModel.js";
import DentalRecord from "../models/dentalRecordModel.js";
import Service from "../models/serviceModel.js";

// Algorithm to find the similarity of conditions and treatments to services
const calculateSimilarities = (record, service) => {
  let score = 0;

  // Matching for conditions and treatments
  record.conditions.forEach((condition) => {
    if (service.features.includes(condition)) {
      score += 1;
    }
  });

  record.treatments.forEach((treatment) => {
    if (service.features.includes(treatment)) {
      score += 1;
    }
  });

  return score;
};

const getRecommendation = async (req, res, next) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(401).json({ message: "Admin Unauthenticated" });
    }
    const dentalRecord = await DentalRecord.find({
      patientId: id,
      clinicId: admin.clinicId,
    });
    const services = await Service.find({ clinicId: admin.clinicId });

    const recommendations = services.map((service) => {
      const similarity = calculateSimilarities(dentalRecord, service);
      return { service, similarity };
    });

    recommendations.sort((a, b) => b.similarity - a.similarity);

    res.json(recommendations.slice(0, 5));
  } catch (error) {
    next(error);
  }
};

export default { getRecommendation };
