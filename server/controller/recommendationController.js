import Admin from "../models/adminModel.js";
import DentalRecord from "../models/dentalRecordModel.js";
import Patient from "../models/patientModel.js";
import Service from "../models/serviceModel.js";
import Chart from "../models/chartModel.js";
import Patient_List from "../models/patientListModel.js";

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

// Chart data Recommendation
// Sample dataset for conditions and services mapping
const servicesMapping = {
  Present: [],
  Missing: ["Bridgework", "Dentures", "Dental Crowns", "Dental Implant"],
  "Root Fragment": ["Root Canal Therapy"],
  "Impacted Tooth": ["Tooth Extractions"],
  Caries: ["Cosmetic Fillings", "Dental Bonding", "Root Canal Therapy"],
  Composite: ["Cosmetic Fillings"],
  Amalgam: ["Cosmetic Fillings"],
  "Recurrent Caries": ["Root Canal Therapy"],
  "Metallic Crown": ["Dental Crowns"],
  "Gold Crown": ["Dental Crowns"],
  "Ceramic Crown": ["Dental Crowns"],
  "Porcelain Fused to Metal Crown": ["Dental Crowns"],
  "Class (Molar)": [
    "Clear Aligners",
    "Metallic Braces",
    "Self-Ligating Braces",
  ],
  Overjet: ["Clear Aligners", "Metallic Braces"],
  Overbite: ["Clear Aligners", "Self-Ligating Braces"],
  "Midline Deviation": [
    "Clear Aligners",
    "Metallic Braces",
    "Dental Retainers",
  ],
  Crossbite: ["Metallic Braces", "Self-Ligating Braces", "Dental Retainers"],

  Clenching: ["Dental Crowns", "Clear Aligners"],
  Clicking: ["Dental Retainers", "Dental Consultation"],
  Trismus: ["Root Canal Therapy", "Dental Crowns"],
  "Muscle Spasm": ["Dental Consultation"],

  Gingivitis: ["Scaling and Root Planing"],
  "Early Periodontics": ["Scaling and Root Planing", "Gum Grafting"],
  "Moderate Periodontics": [
    "Scaling and Root Planing",
    "Gum Grafting",
    "Periodontal Surgery",
  ],
  "Advanced Periodontics": [
    "Scaling and Root Planing",
    "Gum Grafting",
    "Periodontal Surgery",
  ],
};

const getRecommendedServices = async (req, res, next) => {
  const { clinicId } = req.params;
  try {
    // Authenticate user
    const user = await Patient.findById(req.user.user.id);
    if (!user) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    const userId = user._id;
    const patients = await Patient_List.find({ patientId: userId });

    let patientId;
    for (const patient of patients) {
      patientId = patient._id;
    }

    const chart = await Chart.findOne({ patientId });

    if (!chart) {
      return res
        .status(404)
        .json({ message: "Chart not found for the patient" });
    }

    // Fetch available services in the clinic
    const availableServices = await Service.find({ clinicId }).populate(
      "clinicId"
    );

    if (availableServices.length === 0) {
      return res
        .status(404)
        .json({ message: "No services available for this clinic" });
    }

    // Collect recommendations
    const recommendedServiceNames = new Set();

    chart.teeth.forEach((tooth) => {
      const {
        status,
        prosthetic,
        surgery,
        occlusal,
        mesial,
        distal,
        buccal,
        lingual,
        bridge,
        crown,
      } = tooth;

      // Add services based on tooth status
      if (servicesMapping[status]) {
        servicesMapping[status].forEach((serviceName) =>
          recommendedServiceNames.add(serviceName)
        );
      }

      // Check for conditions like Caries, etc., on specific tooth surfaces
      const surfaces = [occlusal, mesial, distal, buccal, lingual];
      surfaces.forEach((surface) => {
        if (servicesMapping[surface]) {
          servicesMapping[surface].forEach((serviceName) =>
            recommendedServiceNames.add(serviceName)
          );
        }
      });

      // Additional checks
      if (prosthetic !== "None" || crown !== "None") {
        recommendedServiceNames.add("Dental Crowns");
      }

      if (surgery !== "None") {
        recommendedServiceNames.add("Tooth Extractions");
      }

      if (bridge) {
        recommendedServiceNames.add("Bridgework");
      }
    });

    const { occlusion, tmd, ps } = chart;

    if (occlusion === "Crossbite") {
      ["Metallic Braces", "Self-Ligating Braces", "Dental Retainers"].forEach(
        (service) => {
          recommendedServiceNames.add(service);
        }
      );
    }

    if (occlusion === "Class (Molar)") {
      ["Clear Aligners", "Metallic Braces", "Self-Ligating Braces"].forEach(
        (service) => {
          recommendedServiceNames.add(service);
        }
      );
    }

    if (occlusion === "Overjet") {
      ["Clear Aligners", "Metallic Braces"].forEach((service) => {
        recommendedServiceNames.add(service);
      });
    }

    if (occlusion === "Overbite") {
      ["Clear Aligners", "Self-Ligating Braces"].forEach((service) => {
        recommendedServiceNames.add(service);
      });
    }

    if (occlusion === "Midline Deviation") {
      ["Clear Aligners", "Metallic Braces", "Dental Retainers"].forEach(
        (service) => {
          recommendedServiceNames.add(service);
        }
      );
    }

    if (tmd === "Clenching") {
      ["Dental Crowns", "Clear Aligners"].forEach((service) => {
        recommendedServiceNames.add(service);
      });
    }

    if (tmd === "CLicking") {
      ["Dental Retainers", "Dental Consultation"].forEach((service) => {
        recommendedServiceNames.add(service);
      });
    }

    if (tmd === "Trismus") {
      ["Root Canal Therapy", "Dental Crowns"].forEach((service) => {
        recommendedServiceNames.add(service);
      });
    }

    if (tmd === "Muscle Spasm") {
      ["Dental Consultation"].forEach((service) => {
        recommendedServiceNames.add(service);
      });
    }

    if (ps === "Gingivitis") {
      ["Scaling and Root Planing"].forEach((service) => {
        recommendedServiceNames.add(service);
      });
    }

    if (ps === "Early Periodontics") {
      ["Scaling and Root Planing", "Gum Grafting"].forEach((service) => {
        recommendedServiceNames.add(service);
      });
    }

    if (ps === "Moderate Periodontics") {
      [
        "Scaling and Root Planing",
        "Gum Grafting",
        "Periodontal Surgery",
      ].forEach((service) => {
        recommendedServiceNames.add(service);
      });
    }

    if (ps === "Advanced Periodontics") {
      [
        "Scaling and Root Planing",
        "Gum Grafting",
        "Periodontal Surgery",
      ].forEach((service) => {
        recommendedServiceNames.add(service);
      });
    }

    // Match recommendations with available services in the clinic
    const recommendedServices = availableServices.filter((service) =>
      recommendedServiceNames.has(service.name)
    );

    // Return recommendations
    res.status(200).json(recommendedServices);
  } catch (error) {
    next(error);
  }
};

// Patient clicks on services it will add on their visited services on content-based filtering
const getSortedServices = async (req, res) => {
  try {
    // Fetch the patient's interested services
    const patient = await Patient.findById(req.user.user.id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Extract the IDs of interested services
    const interestedServiceIds = patient.interested.map((item) => item.name);

    //console.log(interestedServiceIds);

    // Fetch all services
    const allServices = await Service.find().populate("clinicId").exec();

    // Sort services: Interested services first
    const sortedServices = allServices.sort((a, b) => {
      const isAInterested = interestedServiceIds.includes(a.name.toString());
      const isBInterested = interestedServiceIds.includes(b.name.toString());
      if (isAInterested && !isBInterested) return -1;
      if (!isAInterested && isBInterested) return 1;
      return 0; // Maintain order for non-interested services
    });

    res.status(200).json(sortedServices);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch services", error: error.message });
  }
};

// ! Creating another content-based filtering from scratch
const specialized_set = {
  Prosthodontics: ["Dental Crowns", "Bridgework", "Dental Implant", "Dentures"],
  Orthodontics: [
    "Clear Aligners",
    "Metallic Braces",
    "Self-Ligating Braces",
    "Dental Retainers",
  ],
  "General Dentistry": [
    "Dental Consultation",
    "Tooth Pasta",
    "Teeth Cleanings",
    "Tooth Extractions",
  ],

  "Dental Cosmetics": ["Dental Veneers", "Diastema Closure", "Teeth Whitening"],

  "Oral Surgery": ["Root Canal Therapy"],
};

const getServiceFiltering = async (req, res, next) => {
  const { clinicId } = req.params;
  try {
    const user = await Patient.findById(req.user.user.id);
    if (!user) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    const patientId = user._id;

    const patients = await Patient_List.find({ patientId });
    if (patients.length === 0) {
      return res.status(404).json({ message: "Patient not found." });
    }

    let patientID;
    for (const patient of patients) {
      patientID = patient._id;
    }

    const chart = await Chart.find({ patientId: patientID });

    const availableServices = await Service.find({ clinicId }).populate(
      "clinicId"
    );

    // Collect recommendations
    const recommendedServiceNames = new Set();
  } catch (error) {
    next(error);
  }
};

export default {
  getRecommendation,
  topServices,
  getRecommendedServices,
  getSortedServices,
};
