import React, { useEffect } from "react";
import "./verifyPayment.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updatePaid } from "../../redux/user/userSlice.js";

const VerifyPayment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const type = searchParams.get("type");

  console.log(success);

  useEffect(() => {
    verifyPayment();
  }, []);

  const verifyPayment = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/payment/verify",
        { success, type },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        dispatch(updatePaid(true));
        navigate("/create-clinic");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="verify-container">
      <section className="verify-content">
        <div className="loading"></div>
        <h1>Verifying...</h1>
      </section>
    </div>
  );
};

export default VerifyPayment;
