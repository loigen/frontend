import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import logo from "../images/bigLogo.png";
import { useAuth } from "../context/AuthProvider";

const LoginModal = ({ open, onClose, handleOpenRegisterModal }) => {
  const { login, error, loading, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const remembered = localStorage.getItem("rememberMe");
    if (remembered) {
      setEmail(localStorage.getItem("rememberedEmail") || "");
      setPassword(localStorage.getItem("rememberedPassword") || "");
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    setIsButtonDisabled(!(email.trim() && password.trim()));
  }, [email, password]);

  useEffect(() => {
    if (user) {
      const userRole = user.role;
      if (userRole === "user") {
        navigate("/booking");
      } else {
        navigate("/home");
      }
      onClose();
    }
  }, [user, navigate, onClose]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);

      if (rememberMe) {
        localStorage.setItem("rememberMe", true);
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("rememberedPassword", password);
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
      }
    } catch (error) {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <ArrowBackIcon
            onClick={onClose}
            sx={{
              cursor: "pointer",
              fontSize: "1.5rem",
              color: "#2C6975",
            }}
          />
        </DialogTitle>
        <DialogContent>
          <Box alignItems="center" className="flex justify-center" mb={4}>
            <img src={logo} alt="Logo" style={{ width: "150px" }} />
          </Box>
          <Box textAlign="center" mb={2}>
            <Typography variant="h5" component="h1" gutterBottom>
              Welcome to Safe Place
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Please take a moment to complete your account
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
            <TextField
              id="email"
              label="Email Address"
              variant="outlined"
              type="email"
              fullWidth
              value={email}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#",
                  },
                  "&:hover fieldset": {
                    borderColor: "#4e8e9b",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#2c6975",
                  },
                },
              }}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
            />
            <Box
              textAlign="right"
              mt={1}
              sx={{
                ":hover": {
                  color: "#2C6975",
                },
              }}
            >
              <Link to="/forgot-password">Forgot Password?</Link>
            </Box>
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#",
                  },
                  "&:hover fieldset": {
                    borderColor: "#4e8e9b",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#2c6975",
                  },
                },
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: "#2C6975",
                    "& .MuiSvgIcon-root": {
                      fontSize: 28,
                    },
                    "& .MuiCheckbox-root": {
                      borderColor: "#4e8e9b",
                    },
                    "& .Mui-checked": {
                      color: "#4e8e9b",
                    },
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                    "& .MuiCheckbox-root.Mui-checked": {
                      backgroundColor: "#2c6975",
                    },
                  }}
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
              }
              label="Remember password"
            />
          </Box>
        </DialogContent>
        <DialogActions className="flex flex-col">
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "20%",
              backgroundColor: "#4e8e9b",
              "&:hover": { backgroundColor: "#2c6975" },
            }}
            disabled={isButtonDisabled || loading}
            onClick={handleLogin}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
          <Box textAlign="center" mt={2}>
            <Typography variant="body2">
              Don{"'"}t have an account?{" "}
              <Button onClick={handleOpenRegisterModal}>Sign Up</Button>
            </Typography>
          </Box>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginModal;
