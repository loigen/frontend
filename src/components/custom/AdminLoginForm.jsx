import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Alert,
  Container,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// const API_URL = "http://localhost:5000";
const API_URL = "https://backend-vp67.onrender.com";
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 3 * 60 * 60 * 1000;

const theme = createTheme({
  palette: {
    primary: { main: "#2c6975" },
    secondary: { main: "#4a8e8b" },
  },
});

function LoginForm({ onOtpRequested }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [lockout, setLockout] = useState(false);

  useEffect(() => {
    const lockoutTime = localStorage.getItem("lockoutTime");
    if (lockoutTime && Date.now() < lockoutTime) {
      setLockout(true);
      const remainingTime = lockoutTime - Date.now();
      setTimeout(() => {
        setLockout(false);
        localStorage.removeItem("lockoutTime");
        localStorage.removeItem("attempts");
      }, remainingTime);
    } else {
      localStorage.removeItem("lockoutTime");
      localStorage.removeItem("attempts");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const attempts = parseInt(localStorage.getItem("attempts") || "0", 10);

    if (attempts >= MAX_ATTEMPTS) {
      const lockoutTime = Date.now() + LOCKOUT_DURATION;
      localStorage.setItem("lockoutTime", lockoutTime);
      setLockout(true);
      setError("Too many failed attempts. Account locked for 3 hours.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/AdminLogin`, {
        email,
        password,
      });
      setSuccess(response.data.message);
      onOtpRequested(email);
      localStorage.removeItem("attempts");
    } catch (error) {
      if (error.response?.status === 401) {
        const newAttempts = attempts + 1;
        localStorage.setItem("attempts", newAttempts);
        if (newAttempts >= MAX_ATTEMPTS) {
          const lockoutTime = Date.now() + LOCKOUT_DURATION;
          localStorage.setItem("lockoutTime", lockoutTime);
          setLockout(true);
          setError("Too many failed attempts. Account locked for 3 hours.");
        } else {
          setError("Incorrect password. Please try again.");
        }
      } else {
        setError(error.response?.data?.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Admin Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            variant="outlined"
            color="primary"
            disabled={lockout}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            variant="outlined"
            color="primary"
            disabled={lockout}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading || lockout}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
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

export default LoginForm;
