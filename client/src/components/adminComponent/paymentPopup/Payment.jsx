import React, { useEffect, useState } from "react";
import "./payment.css";
import axios from "axios";
import Inclusion from "./Inclusion";

const Payment = ({ setAmount, setShow }) => {
  const [type, setType] = useState(null);
  const [date, setDate] = useState(null);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (type === "Basic") {
      setPrice(2100);
    } else if (type === "Standard") {
      setPrice(2500);
    } else if (type === "Premium") {
      setPrice(3000);
    }
  }, [type]);

  console.log(price);
  const handlePayment = async (e) => {
    e.preventDefault();
    const apiURL = "http://localhost:5000/api/payment/pay";
    let amount = 0;
    try {
      if (type === "Basic") {
        amount = price;
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
      } else if (type === "Premium") {
        amount = price;
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
      } else if (type === "Standard") {
        amount = price;
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setType(e.target.value);
  };

  console.log(type);

  //console.log(price);

  return (
    <div className="payment-wrapper">
      <div className="payment-container">
        <header>
          <h1>Choose a plan</h1>
          <h2 onClick={() => setShow(false)}>X</h2>
        </header>

        <section className="payment-content">
          <div className="basic">
            <label htmlFor="basic">
              <header className={type === "Basic" ? "plan-header" : undefined}>
                <h2>Basic Plan</h2>
              </header>
              <h3>₱ 2,100</h3>
              <Inclusion type={"Basic"} />
            </label>
            <input
              type="radio"
              id="basic"
              value="Basic"
              checked={type === "Basic"}
              onChange={handleChange}
              hidden
            />
          </div>

          <div className="premium">
            <label htmlFor="premium">
              <header
                className={type === "Premium" ? "plan-header" : undefined}
              >
                <h2>Premium Plan</h2>
              </header>
              <h3>₱ 3,000</h3>
              <Inclusion type={"Premium"} />
            </label>
            <input
              type="radio"
              id="premium"
              value="Premium"
              checked={type === "Premium"}
              onChange={handleChange}
              hidden
            />
          </div>

          <div className="standard">
            <label htmlFor="standard">
              <header
                className={type === "Standard" ? "plan-header" : undefined}
              >
                <h2>Standard Plan</h2>
              </header>
              <h3>₱ 2,500</h3>
              <Inclusion type={"Standard"} />
            </label>
            <input
              type="radio"
              id="standard"
              value="Standard"
              checked={type === "Standard"}
              onChange={handleChange}
              hidden
            />
          </div>
        </section>
        <button onClick={handlePayment}>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default Payment;
