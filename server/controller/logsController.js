import ActivityLogs from "../models/logsModel.js";
import Admin from "../models/adminModel.js";

const fetchActivityLogs = async (req, res, next) => {
  try {
    const user = await Admin.findById(req.user.id);
    //console.log(user);

    if (!user) {
      return res.status(401).json({ message: "User not authenticated." });
    }
    const clinic = user.clinicId;

    console.log("clinic id: " + clinic);

    const activityLogs = await ActivityLogs.find({ clinic })
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json(activityLogs);
  } catch (error) {
    next(error);
  }
};

export default { fetchActivityLogs };
