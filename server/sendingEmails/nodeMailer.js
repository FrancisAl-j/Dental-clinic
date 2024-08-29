import Appointment from "../models/appointmentModel.js";
import nodemailer from "nodemailer";
import Clinic from "../models/clinicModel.js";

// Create a transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "kikobilas123@gmail.com",
    pass: process.env.APP_PASSWORD,
  },
});

/*const sendReminderEmails = async (patients, appointmentDetails) => {
  try {
    for (const patient of patients) {
      let mailOption = {
        from: '"Your Clinic Name" <your-email@gmail.com>',
        to: patient.email,
        subject: "Appointment Reminder",
        text: `Dear ${patient.name},\n\nThis is a reminder that your appointment is scheduled for ${appointmentDetails.date} at ${appointmentDetails.time}.\n\nThank you,\nYour Clinic`,
        html: `<p>Dear ${patient.name},</p><p>This is a reminder that your appointment is scheduled for ${appointmentDetails.date} at ${appointmentDetails.time}.</p><p>Thank you,<br>Your Clinic</p>`,
      };

      await transporter.sendMail(mailOption);
    }
  } catch (error) {}
};*/

const sendAppointmentsReminder = async () => {
  try {
    const today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const startOfTomorrow = new Date(tomorrow.setHours(0, 0, 0, 0));
    const endOfTomorrow = new Date(tomorrow.setHours(23, 59, 59, 999));

    const appointments = await Appointment.find({
      appointmentDate: {
        $gte: startOfTomorrow,
        $lte: endOfTomorrow,
      },
      status: "Confirmed",
    });

    if (appointments.length === 0) {
      console.log("No appointments found for tomorrow.");
      return;
    }

    // Group appointments by clinic
    const clinics = {};
    for (const appointment of appointments) {
      const clinicId = appointment.clinicId;

      if (!clinics[clinicId]) {
        // Fetch clinic details including email
        const clinic = await Clinic.findById(clinicId).exec();

        if (!clinic) {
          console.error(`Clinic not found for ID: ${clinicId}`);
          continue;
        }

        clinics[clinicId] = {
          clinicName: clinic.clinicName,
          clinicEmail: clinic.email,
          patients: [],
        };
      }

      clinics[clinicId].patients.push({
        name: appointment.patientName,
        email: appointment.patientEmail,
        date: appointment.appointmentDate,
      });
    }
    for (const clinicId in clinics) {
      const { clinicName, patients, clinicEmail } = clinics[clinicId];
      console.log(`Sending emails for clinic: ${clinicName}`);

      for (const patient of patients) {
        const mailOptions = {
          from: `"${clinicName}" <${clinicEmail}>`, // Customize the sender based on the clinic
          to: patient.email,
          subject: `Appointment Reminder from ${clinicName}`,
          text: `Dear ${
            patient.name
          },\n\nThis is a reminder that your appointment is scheduled for ${patient.date.toDateString()}.\n\nThank you,\n${clinicName}`,
          html: `<p>Dear ${
            patient.name
          },</p><p>This is a reminder that your appointment is scheduled for ${patient.date.toDateString()}.</p><p>Thank you,<br>${clinicName}</p>`,
        };

        await transporter.sendMail(mailOptions);
      }
    }
  } catch (error) {
    console.log(`Error sending reminder emails: ${error}`);
  }
};

export default sendAppointmentsReminder;

// This one is the the body
/* const mailOption = {
  from: "kikobilas123@gmail.com",
  to: "bilas.fa.bsinfotech@gmail.com",
  subject: "Sending Email using Node.js",
  text: "That was easy!",
}; */

// This code below is responsible for sending message to email
/*transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });*/
