import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Alert,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import logo from "../images/bigLogo.png";
import { useAuth } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { data } from "autoprefixer";

const API_URL = "https://backend-production-c8da.up.railway.app";

const LoginModal = ({
  open,
  onClose,
  handleOpenRegisterModal,
  handleOpenLoginModal,
}) => {
  const { setError, loading, user, setUser, setLoading, fetchProfile } =
    useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState([]);

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
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setUser(response.data);
      await fetchProfile();

      if (response.data.role === "admin") {
        Swal.fire({
          icon: "error",
          title: "Access Denied",
          text: "Admins are not allowed to log in.",
        });
        setLoading(false);
        return;
      }

      if (rememberMe) {
        localStorage.setItem("rememberMe", true);
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("rememberedPassword", password);
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
      }

      const userRole = response.data.role;
      if (userRole === "user") {
        navigate("/booking");
      } else {
        navigate("/home");
      }
      onClose();
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "An error occurred. Please try again.";

      if (errorMessage === "Email and password are required") {
        Swal.fire({
          icon: "warning",
          title: "Missing Information",
          text: errorMessage,
        });
      } else if (errorMessage === "User not found") {
        Swal.fire({
          icon: "warning",
          title: "User Not Found",
          text: errorMessage,
        });
      } else if (errorMessage === "Incorrect password") {
        Swal.fire({
          icon: "error",
          title: "Incorrect Password",
          text: errorMessage,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: errorMessage,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
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
  );
};

export default LoginModal;
