import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token]);

  console.log(token);

  const verifyEmail = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/auth/email/${token}`);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Verify Email</h1>
      <b>Email Activated Successfully</b>
      <p>Click the link provided to Sign in</p>
      {data && data.role === "Admin" ? (
        <Link to="/patient-signin">http://localhost:5173/signin</Link>
      ) : (
        <Link to="/signin">http://localhost:5173/patient-signin</Link>
      )}
    </div>
  );
};

export default VerifyEmail;
