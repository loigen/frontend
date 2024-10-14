// LoginPage.js
import React, { useState } from "react";
import LoginForm from "./custom/AdminLoginForm";
import OTPForm from "./custom/OTPForm";

function LoginPage() {
  const [otpRequested, setOtpRequested] = useState(false);
  const [email, setEmail] = useState("");

  const handleOtpRequested = (email) => {
    setOtpRequested(true);
    setEmail(email);
  };

  return (
    <div>
      {!otpRequested ? (
        <LoginForm onOtpRequested={handleOtpRequested} />
      ) : (
        <OTPForm email={email} />
      )}
    </div>
  );
}

export default LoginPage;
