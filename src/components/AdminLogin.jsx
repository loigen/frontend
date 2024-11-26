import React, { useState, useEffect } from "react";
import LoginForm from "./custom/AdminLoginForm";
import OTPForm from "./custom/OTPForm";
import {
  Container,
  Typography,
  Box,
  Paper,
  CssBaseline,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2c6975",
    },
    secondary: {
      main: "#4a8e8b",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});
const API_URL = "https://backend-vp67.onrender.com";
function LoginPage() {
  const [otpRequested, setOtpRequested] = useState(false);
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [sentToEmail, setSentToEmail] = useState(false);
  const handleOtpRequested = (email) => {
    setOtpRequested(true);
    setEmail(email);
    setIsTimerActive(true);
    setSentToEmail(true);
  };

  useEffect(() => {
    let timer;
    if (isTimerActive && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isTimerActive, countdown]);

  const handleResendOtp = async () => {
    setCountdown(60);
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post(`${API_URL}/auth/resend-otp`, {
        email,
      });
      setSuccessMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while resending the OTP.");
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            {!otpRequested ? (
              <LoginForm onOtpRequested={handleOtpRequested} />
            ) : (
              <Box display="flex" flexDirection="column" alignItems="center">
                {sentToEmail && (
                  <>
                    <Typography color="primary">
                      OTP sent through Gmail, please check!
                    </Typography>
                  </>
                )}
                <OTPForm email={email} />
                {countdown > 0 ? (
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    Resend OTP in {countdown} seconds
                  </Typography>
                ) : (
                  <>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleResendOtp}
                      sx={{ mt: 2 }}
                    >
                      Resend OTP
                    </Button>
                    {successMessage && (
                      <Typography
                        variant="body2"
                        color="success.main"
                        sx={{ mt: 2 }}
                      >
                        {successMessage}
                      </Typography>
                    )}
                    {error && (
                      <Typography
                        variant="body2"
                        color="error.main"
                        sx={{ mt: 2 }}
                      >
                        {error}
                      </Typography>
                    )}
                  </>
                )}
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default LoginPage;
