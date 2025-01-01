import Admin from "../models/adminModel.js";
import Clinic from "../models/clinicModel.js";
import axios from "axios";

/* 
  Basic = 3 months
  Standard = 6 months
  Premium = 1 year
*/

// This payment is for creating a clinic
const paymentPlatform = async (req, res, next) => {
  const { amount, type } = req.body;
  const url = `http://localhost:5173/`;
  const PAYMONGO_SECRET_KEY = Buffer.from(
    `${process.env.PAYMONGO_SECRET_KEY}:`
  ).toString("base64"); // Turn the secret key to base64
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(401).json({ message: "Admin not authenticated." });
    }

    await admin.save();

    const line_items = [
      {
        currency: "PHP",
        name: type,
        amount: amount * 100,
        quantity: 1,
      },
    ];

    line_items.push({
      currency: "PHP",
      name: "Charges",
      amount: 50 * 100,
      quantity: 1,
    });

    const metadata = {
      admin_id: admin._id.toString(),
      content: {
        type: type,
      },
    };

    // Creating paymongo payment link
    const options = {
      method: "POST",
      url: "https://api.paymongo.com/v1/checkout_sessions",

      headers: {
        accept: "application/json",
        "Content-type": "application/json",
        authorization: `Basic ${PAYMONGO_SECRET_KEY}`,
      },
      data: {
        data: {
          attributes: {
            line_items,
            amount: amount * 100,
            payment_method_types: ["gcash"],
            description: "Clinic Registration.",
            metadata,
            success_url: `${url}verify?success=true`,
            cancel_url: `${url}verify?success=false`,
            send_email_receipt: false, // Optional: Disable sending email receipts
            show_description: true, // Optional: Show description
            show_line_items: true, // Optional: Show line items
          },
        },
      },
    };

    const PayMongoResponse = await axios.request(options);

    res.status(201).json({
      admin: admin,
      checkoutUrl: PayMongoResponse.data.data.attributes.checkout_url,
    });
  } catch (error) {
    console.error(
      "Error in payment:",
      error.response ? error.response.data : error.message
    );
    next(error);
  }
};

const verifyPayment = async (req, res, next) => {
  const { success, type } = req.body;
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(401).json({ message: "Admin not authenticated." });
    }

    // Snippet for adjusting the date
    let today = new Date(); // Getting the current date
    //let month = String(today.getMonth() + 1).padStart(2, "0"); // Getting the month of the current date
    let month;
    let nextYear;
    let date;

    /*if (type === "Basic") {
      // the + 1 on getMonth() the january starts with 0 so that's why there is a + 1 and + 3 is for the duration I want the month to have
      month = String(today.getMonth() + 1 + 3).padStart(2, "0");
      today.setMonth(month - 1);
      date = today;
    } else if (type === "Standard") {
      month = String(today.getMonth() + 1 + 6).padStart(2, "0");
      today.setMonth(month - 1);
      date = today;
    } else if (type === "Premium") {
      nextYear = today.getFullYear() + 1;
      today.setFullYear(nextYear);
      date = today;
    } else {
      console.log("Invalid type of plan");
      return res.status(400).json({ message: "Invalid type of plan." });
    }*/

    if (success === "true") {
      admin.payment = true;

      await admin.save();

      res.status(200).json({ message: "Payment verified" });
    } else if (success === "false") {
      res.status(400).json({ message: "Payment cancelled." });
    } else {
      res.status(400).json({ message: "Invalid success value" });
    }
  } catch (error) {
    next(error);
  }
};

// Plan expired
export const planExpired = async () => {
  //const dateString = "2025-11-07T15:08:24.434+00:00";
  const date = new Date();

  // Extract time components
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  const milliseconds = date.getUTCMilliseconds();

  // Display the time in HH:MM:SS.sss format
  //console.log(`Time: ${hours}:${minutes}:${seconds}.${milliseconds} UTC`);
  try {
    const admins = await Admin.find({
      "payment.date": date,
    }).exec();

    //const paymentId = admin.payment._id;
    // console.log(`Admin ID: ${adminId}`);
    //console.log(date);

    if (admins.length === 0) {
      console.log(`Date of payment not found!`);
    } else {
      console.log(`Same Date!`);
      for (const admin of admins) {
        const adminId = admin._id;
        const paymentId = admin.payment.id;
        if (adminId) {
          //console.log(`Admin ID: ${adminId} is getting updated!`);
          const updateAdmin = await Admin.findById(adminId);
          updateAdmin.payment.date = null;
          updateAdmin.payment.paid = false;
          updateAdmin.payment.type = null;

          await updateAdmin.save();
        }
      }

      /* */
    }
  } catch (error) {
    console.log(`There was an error expiring the plan.`);
  }
};

export default { paymentPlatform, verifyPayment };
