import Admin from "../models/adminModel.js";
import Chart from "../models/chartModel.js";
import Patient_List from "../models/patientListModel.js";
import ActivityLogs from "../models/logsModel.js";
import Patient from "../models/patientModel.js";

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

    const activityLogs = new ActivityLogs({
      name: admin.name,
      clinic: admin.clinicId,
      role: "Dentist",
      details: `Created a dental chart for patient: id(${patientId})`,
    });

    await activityLogs.save();

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

    const chart = await Chart.find({ patientId: id, clinicId })
      .populate("patientId")
      .sort({ createdAt: -1 })
      .exec();
    //console.log(chart);

    res.status(200).json(chart);
  } catch (error) {
    next(error);
  }
};

// Update the status of the teeth
const updateStatus = async (req, res, next) => {
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
  } = req.body;
  const { id, toothId } = req.params;
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(401).json({ message: "Admin not authenticated." });
    }

    const clinicId = admin.clinicId;

    const chart = await Chart.findById(id);

    const teeth = chart.teeth.id(toothId);

    //console.log("Bridge: " + teeth.bridge);

    if (status) {
      teeth.status = status;
    }

    if (prosthetic) {
      teeth.prosthetic = prosthetic;
    }

    if (surgery) {
      teeth.surgery = surgery;
    }

    if (occlusal) {
      teeth.occlusal = occlusal;
    }

    if (mesial) {
      teeth.mesial = mesial;
    }

    if (distal) {
      teeth.distal = distal;
    }

    if (buccal) {
      teeth.buccal = buccal;
    }

    if (lingual) {
      teeth.lingual = lingual;
    }

    if (bridge !== undefined) {
      teeth.bridge = bridge;
    }

    if (crown) {
      teeth.crown = crown;
    }

    await chart.save();

    res.status(200).json(chart);
  } catch (error) {
    next(error);
  }
};

// Clearing all the data on tooth
const clearTooth = async (req, res, next) => {
  const { toothId, id } = req.params;
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(401).json({ message: "Admin not authenticated." });
    }

    const clinicId = admin.clinicId;

    const chart = await Chart.findById(id);

    const teeth = chart.teeth.id(toothId);
    if (teeth) {
      teeth.status = "Present";
      teeth.prosthetic = "None";
      teeth.surgery = "None";
      teeth.occlusal = "None";
      teeth.mesial = "None";
      teeth.distal = "None";
      teeth.buccal = "None";
      teeth.lingual = "None";
      teeth.bridge = false;
      teeth.crown = "None";
    }

    await chart.save();

    res.status(200).json({ message: "Successfully clear the chart" });
  } catch (error) {
    next(error);
  }
};

const createNotes = async (req, res, next) => {
  const { notes } = req.body;
  const { id } = req.params;
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(401).json({ message: "Admin not authenticated." });
    }

    const chart = await Chart.findByIdAndUpdate(id, { notes });

    res.status(200).json(chart);
  } catch (error) {
    next(error);
  }
};

// Admin Fetch Notes
const fetchNotes = async (req, res, next) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(401).json({ message: "Admin not authenticated." });
    }

    const chart = await Chart.findById(id);
    if (!chart) {
      return res.status(404).json({ message: "Chart Not Found." });
    }
    const notes = chart.notes;

    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

// Patient's Fetch Notes
const fetchPatientNotes = async (req, res, next) => {
  try {
    const user = await Patient.findById(req.user.user.id);
    if (!user) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    const patientId = user._id;

    const patient = await Patient_List.find({ patientId });

    const id = patient.flatMap((entry) => entry._id);

    const chart = await Chart.find({ patientId: id });

    const notes = chart.flatMap((data) => data.notes);

    //console.log(notes);

    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

//! Updating the chart not the tooth but as a whole
const updateChart = async (req, res, next) => {
  const { id } = req.params;
  const { occlusion, tmd, ps } = req.body;

  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(401).json({ message: "Admin not authenticated." });
    }
    const chart = await Chart.findById(id);
    // console.log(chart);

    if (occlusion !== undefined) {
      chart.occlusion = occlusion;
    }

    if (tmd !== undefined) {
      chart.tmd = tmd;
    }

    if (ps !== undefined) {
      chart.ps = ps;
    }

    await chart.save();

    res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    next(error);
  }
};

export default {
  createDentalChart,
  fetchDentalChart,
  updateStatus,
  clearTooth,
  createNotes,
  fetchNotes,
  fetchPatientNotes,
  updateChart,
};
