import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import {
  TextField,
  Button,
  Alert,
  Container,
  Typography,
  Box,
  CircularProgress,
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const API_URL = "https://backend-production-c8da.up.railway.app";

// Custom theme with your preferred palette
const theme = createTheme({
  palette: {
    primary: {
      main: "#2c6975", // Custom primary color
    },
    secondary: {
      main: "#4a8e8b", // Secondary color
    },
  },
});

function OTPForm({ email }) {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { setUser, user, fetchProfile } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Ensure only digits are entered
    if (/^\d*$/.test(value)) {
      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input box if it's filled
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const otpValue = otp.join(""); // Combine the 6 boxes into one OTP string

    // Check if OTP is a valid 6-digit number
    if (otpValue.length !== 6) {
      setError("OTP must be a 6-digit number.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/verify-otp`, {
        email,
        otp: otpValue,
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h5" align="center" gutterBottom>
          OTP Verification
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Grid container spacing={2} justifyContent="center">
            {otp.map((value, index) => (
              <Grid item key={index}>
                <TextField
                  inputRef={(el) => (inputRefs.current[index] = el)}
                  value={value}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  inputProps={{
                    maxLength: 1,
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    style: { textAlign: "center" },
                  }}
                  sx={{ width: 50, fontSize: "1.5rem" }}
                  variant="outlined"
                  color="primary"
                />
              </Grid>
            ))}
          </Grid>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Verify OTP"
            )}
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {success}
          </Alert>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default OTPForm;
