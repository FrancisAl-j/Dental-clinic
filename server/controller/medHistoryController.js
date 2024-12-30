import MedicalHistory from "../models/medHistoryModel.js";
import Patient from "../models/patientModel.js";
import Admin from "../models/adminModel.js";

const createMedicalHistory = async (req, res, next) => {
  const {
    healthy,
    treatment,
    illness,
    hospitalized,
    medication,
    smoking,
    addiction,
    pregnant,
    nursing,
    pills,
    yesTreatment,
    yesIllness,
    yesHospitalized,
    yesMedication,
    bleedingTime,
    bloodType,
    bloodPressure,
    diseases,
    allergic,
  } = req.body;
  try {
    const user = await Patient.findById(req.user.user.id);
    if (!user) {
      return res.status(401).json({ message: "User not authenticated." });
    }
    const medicalHistory = new MedicalHistory({
      questions: [
        {
          healthy,
          treatment,
          illness,
          hospitalized,
          medication,
          smoking,
          addiction,
          pregnant,
          nursing,
          pills,
          yesTreatment,
          yesIllness,
          yesHospitalized,
          yesMedication,
          bleedingTime,
          bloodType,
          bloodPressure,
          diseases,
          allergic,
        },
      ],

      patient: user._id,
    });

    await medicalHistory.save();
    user.medicalHistory = true;

    await user.save();

    res.status(200).json(medicalHistory);
  } catch (error) {
    next(error);
  }
};

const fetchPatientMedical = async (req, res, next) => {
  try {
    const user = await Patient.findById(req.user.user.id);
    if (!user) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    const patient = user._id;

    const medicalHistory = await MedicalHistory.find({ patient });
    if (!medicalHistory) {
      return res.status(404).json({ message: "Medical history not found." });
    }

    res.status(200).json(medicalHistory);
  } catch (error) {
    next(error);
  }
};

const updateMedicalHistory = async (req, res, next) => {
  const { id, questionsId } = req.params;
  const {
    healthy,
    treatment,
    illness,
    hospitalized,
    medication,
    smoking,
    addiction,
    pregnant,
    nursing,
    pills,
    yesTreatment,
    yesIllness,
    yesHospitalized,
    yesMedication,
    bleedingTime,
    bloodType,
    bloodPressure,
    diseases,
    allergic,
  } = req.body;
  try {
    // console.log(healthy);

    const user = await Patient.findById(req.user.user.id);
    if (!user) {
      return res.status(401).json({ message: "User not authenticated." });
    }
    const medicalHistory = await MedicalHistory.findById(id);

    const question = medicalHistory.questions.id(questionsId);

    //console.log(question);
    //console.log(question.healthy);

    if (healthy !== undefined) {
      //console.log("This code is running");

      question.healthy = healthy;
    }

    if (treatment !== undefined) {
      question.treatment = treatment;
    }

    if (illness !== undefined) {
      question.illness = illness;
    }

    if (hospitalized !== undefined) {
      question.hospitalized = hospitalized;
    }

    if (medication !== undefined) {
      question.medication = medication;
    }

    if (smoking !== undefined) {
      question.smoking = smoking;
    }

    if (addiction !== undefined) {
      question.addiction = addiction;
    }

    if (pregnant !== undefined) {
      question.pregnant = pregnant;
    }

    if (nursing !== undefined) {
      question.nursing = nursing;
    }

    if (pills !== undefined) {
      question.pills = pills;
    }

    if (yesTreatment !== undefined) {
      question.yesTreatment = yesTreatment;
    }

    if (yesHospitalized !== undefined) {
      question.yesHospitalized = yesHospitalized;
    }

    if (yesIllness !== undefined) {
      question.yesIllness = yesIllness;
    }

    if (yesMedication !== undefined) {
      question.yesMedication = yesMedication;
    }

    if (bleedingTime !== undefined) {
      question.bleedingTime = bleedingTime;
    }

    if (bloodType !== undefined) {
      question.bloodType = bloodType;
    }

    if (bloodPressure !== undefined) {
      question.bloodPressure = bloodPressure;
    }

    if (allergic !== undefined) {
      question.allergic = allergic;
    }

    if (diseases !== undefined) {
      question.diseases = diseases;
    }

    /* 
    bleedingTime,
    bloodType,
    bloodPressure,
    diseases,
    allergic,
    */

    await medicalHistory.save();

    res.status(200).json({ message: "Successfully updated" });
  } catch (error) {
    next(error);
  }
};

const fetchDiseases = async (req, res, next) => {
  try {
    const user = await Patient.findById(req.user.user.id);
    if (!user) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    const patient = user._id;

    const medicalHistory = await MedicalHistory.find({ patient });

    const diseases = medicalHistory.flatMap(
      (entry) => entry.questions[0]?.diseases || []
    );

    res.status(200).json(diseases);
  } catch (error) {
    next(error);
  }
};

const fetchAlergic = async (req, res, next) => {
  try {
    const user = await Patient.findById(req.user.user.id);
    if (!user) {
      return res.status(401).json({ message: "User not authenticated." });
    }
    const patient = user._id;
    const medicalHistory = await MedicalHistory.find({ patient });

    const allergic = medicalHistory.flatMap(
      (entry) => entry.questions[0]?.allergic || []
    );

    res.status(200).json(allergic);
  } catch (error) {
    next(error);
  }
};

const fetchAdminMedical = async (req, res, next) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(401).json({ message: "Admin not authenticated." });
    }
    const medicalHistory = await MedicalHistory.find({ patientId: id });

    res.status(200).json(medicalHistory);
  } catch (error) {
    next(error);
  }
};

export default {
  createMedicalHistory,
  fetchPatientMedical,
  updateMedicalHistory,
  fetchDiseases,
  fetchAlergic,
  fetchAdminMedical,
};
