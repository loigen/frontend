import React, { useState } from "react";
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

const API_URL = "https://backend-production-c8da.up.railway.app";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2c6975",
    },
    secondary: {
      main: "#4a8e8b",
    },
  },
});

function LoginForm({ onOtpRequested }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true); // Set loading to true when the form is submitted

    try {
      const response = await axios.post(`${API_URL}/auth/AdminLogin`, {
        email,
        password,
      });
      setSuccess(response.data.message);
      onOtpRequested(email);
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false); // Stop loading when the request completes
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
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading} // Disable the button when loading
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
