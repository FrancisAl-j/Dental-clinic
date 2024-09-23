import Admin from "../models/adminModel.js";
import DentalRecord from "../models/dentalRecordModel.js";
import Patient from "../models/patientModel.js";
import Service from "../models/serviceModel.js";

// Algorithm to find the similarity of conditions and treatments to services
const calculateSimilarities = (dentalRecords, service) => {
  let score = 0;

  dentalRecords.forEach((record) => {
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
  });

  return score;
};

const getRecommendation = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Patient.findById(req.user.user.id);
    if (!user) {
      return res.status(401).json({ message: "User unauthenticated!" });
    }

    const dentalRecord = await DentalRecord.find({
      patientId: user._id,
      clinicId: id,
    });
    if (!dentalRecord || dentalRecord.length === 0) {
      return res.json([]);
    }

    const services = await Service.find({ clinicId: id });

    const recommendations = services
      .map((service) => {
        const similarity = calculateSimilarities(dentalRecord, service);
        return { service, similarity };
      })
      .filter((recommendation) => recommendation.similarity > 0);

    recommendations.sort((a, b) => b.similarity - a.similarity);

    res.json(recommendations.slice(0, 5));
  } catch (error) {
    next(error);
  }
};

// Recommend most visits services on clinics
const topServices = async (req, res, next) => {
  const { clinicId } = req.query;
  try {
    const user = Patient.findById(req.user.user.id);
    if (!user) {
      return res.status(401).json({ message: "User not authenticated!" });
    }
    const services = await Service.find({ clinicId }).sort({ visited: -1 });
    const mostVisited = services.filter((service) => {
      return service.visited > 10;
    });
    const results = mostVisited.slice(0, 5);
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

export default { getRecommendation, topServices };
