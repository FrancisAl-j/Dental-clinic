import React, { useState } from "react";
import "./payment.css";
import axios from "axios";

const PaymentGuidelines = ({ setShow }) => {
  const [amount] = useState(2000);
  const [type] = useState("Payment");

  const handlePayment = async (e) => {
    e.preventDefault();
    const apiURL = "http://localhost:5000/api/payment/pay";

    try {
      const res = await axios.post(
        apiURL,
        { amount, type },
        {
          withCredentials: true,
        }
      );

      if (res.status === 201) {
        window.open(res.data.checkoutUrl, "_blank");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="payment-wrapper">
      <form action="" className="payment-container" onSubmit={handlePayment}>
        <header>
          <h1>Payment</h1>
          <h2 onClick={() => setShow(false)}>X</h2>
        </header>

        <section className="payment-content">
          <h1>Terms and Agreement</h1>
          <h3>Last Updated: December 17, 2024</h3>
          <h2>Welcome to Dental-Suite</h2>

          <span>
            This Terms and Agreement document (“Agreement”) governs your use of
            the Dental-Suite platform (“Platform”). By registering, accessing,
            or using our Platform, you (“User”) agree to be bound by the terms
            outlined herein. If you do not agree to these terms, you may not use
            the Platform.
          </span>

          <hr />
          <h1>1. Definition</h1>
          <span>
            <b>1.1.</b> <b>Platform:</b> Refers to the online web application
            provided by Dental-Suite, designed to connect dental clinics with
            their patients and facilitate appointment bookings, and clinic
            management.
          </span>
          <span>
            <b>1.2.</b> <b>User:</b> Includes clinic administrators, employees
            (assistants, dentists), and patients who register or interact with
            the Platform.
          </span>

          <span>
            <b>1.3.</b> <b>Services:</b> Refers to all features provided by the
            Platform, including patient scheduling/booking.
          </span>

          <hr />

          <h1>2. Use of the Platform</h1>
          <span>
            <b>2.1.</b> User's must create an account in order to book an
            appointment.
          </span>

          <span>
            <b>2.2.</b> Clinics are responsible for managing their accounts,
            ensuring the security of their login credentials, and the accuracy
            of clinic-related data, such as services, and availability.
          </span>

          <span>
            <b>2.3</b> Users may not:
          </span>
          <ul>
            <li>Share their login credentials with other</li>
            <li>Attempt to access unauthorized areas of the Platform.</li>
            <li>Use the Platform for unlawful purposes.</li>
          </ul>

          <hr />

          <h1>3. Responsibilities and Disclaimer</h1>
          <h5>3.1 Platform Responsibilities</h5>
          <span>
            Dental-Suite provides the infrastructure for clinics and patients to
            interact and process payments. We are not liable for the quality of
            services provided by clinics.
          </span>

          <h5>3.2 User Responsibilities</h5>
          <span>
            Users must provide accurate information, adhere to clinic policies,
            and use the Platform in good faith.
          </span>

          <h5>3.2 No Guarantees</h5>
          <span>
            While we strive to ensure the Platform’s uptime and security, we do
            not guarantee uninterrupted access or error-free performance.
          </span>

          <hr />

          <h1>Limitation and Liability</h1>
          <span>
            In no event shall Dental-Suite be held liable for any indirect,
            incidental, or consequential damages arising from the use of the
            Platform, including but not limited to payment disputes, appointment
            cancellations, or service failures.
          </span>

          <hr />

          <h1>Privacy Policy</h1>
          <span>
            Your use of the Platform is subject to our Privacy Policy, which
            outlines how we collect, use, and protect your personal information.
            By using the Platform, you agree to the terms of the Privacy Policy.
          </span>
        </section>
        <div className="checkboxs-element">
          <input type="checkbox" id="check" required />
          <label htmlFor="check">
            By Checking this box, I agree that I have read the terms and
            agreement
          </label>
        </div>
        <button>Proceed to Payment</button>
      </form>
    </div>
  );
};

export default PaymentGuidelines;
