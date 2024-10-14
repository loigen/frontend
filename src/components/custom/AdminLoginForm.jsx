import React, { useState } from "react";
import axios from "axios";
const API_URL = "https://backend-production-c8da.up.railway.app";

function LoginForm({ onOtpRequested }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${API_URL}/auth/AdminLogin`, {
        email,
        password,
      });
      alert(response.data.message);
      onOtpRequested(email);
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default LoginForm;
