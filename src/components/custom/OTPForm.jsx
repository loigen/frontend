import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
const API_URL = "https://backend-production-c8da.up.railway.app";

function OTPForm({ email }) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { setUser, user, fetchProfile } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (otp.length !== 6) {
      setError("OTP must be 6 digits.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/verify-otp`, {
        email,
        otp,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setUser(response.data);
        await fetchProfile();
        setSuccess(response.data.message);
        navigate("/home");
      } else {
        setError("Verification failed. No token returned.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        required
      />
      <button type="submit">Verify OTP</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
}

export default OTPForm;
