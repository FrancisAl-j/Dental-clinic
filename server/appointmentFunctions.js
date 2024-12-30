import ActivityLogs from "./models/logsModel.js";
import Appointment from "./models/appointmentModel.js";
import Clinic from "./models/clinicModel.js";

export const autoUpdateStatus = async () => {
  let date = new Date();

  // Extract time components
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  const milliseconds = date.getUTCMilliseconds();
  const day = date.getUTCDate(); // Extracts the day (18)
  const newDay = day - 1; // Subtract 1
  date.setUTCDate(newDay);

  try {
    const appointments = await Appointment.find({
      appointmentDate: date,
    }).exec();

    //console.log(appointments);

    if (appointments.length === 0) {
      console.log("There is no appointment to update today.");
    } else {
      console.log("There is an appointment");

      for (const appointment of appointments) {
        const appointmentId = appointment._id;
        //console.log(appointmentId);

        if (!appointmentId) {
          console.log("There is no appointment to update today.");
        } else {
          const appointment = await Appointment.findById(appointmentId);
          let date = new Date();

          if (
            appointment.status === "Pending" &&
            appointment.appointmentDate < date
          ) {
            appointment.status = "Canceled";
            console.log("Updating the appointment");

            await appointment.save();

            const activityLogs = new ActivityLogs({
              name: "System",
              details: `Cancelled the appointment of ${appointment.patientName}`,
              role: "System",
              clinic: appointment.clinicId,
            });

            await activityLogs.save();
          } else if (
            appointment.status === "Confirmed" &&
            appointment.appointmentDate < date
          ) {
            appointment.status = "Completed";
            await appointment.save();
            console.log("Updating the appointment");

            const activityLogs = new ActivityLogs({
              name: "System",
              details: `Confirmed the appointment of ${appointment.patientName}`,
              clinic: appointment.clinicId,
              role: "System",
            });

            await activityLogs.save();
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
