// LoginPage.js
import React, { useState } from "react";
import LoginForm from "./custom/AdminLoginForm";
import OTPForm from "./custom/OTPForm";
import { Container, Typography, Box, Paper, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Custom theme with your preferred color palette
const theme = createTheme({
  palette: {
    primary: {
      main: "#2c6975", // Your primary color
    },
    secondary: {
      main: "#4a8e8b", // Your secondary color
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

function LoginPage() {
  const [otpRequested, setOtpRequested] = useState(false);
  const [email, setEmail] = useState("");

  const handleOtpRequested = (email) => {
    setOtpRequested(true);
    setEmail(email);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h4" align="center" gutterBottom color="primary">
            {otpRequested ? "OTP Verification" : "Admin Login"}
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            {!otpRequested ? (
              <LoginForm onOtpRequested={handleOtpRequested} />
            ) : (
              <OTPForm email={email} />
            )}
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default LoginPage;
