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
  IconButton,
  InputAdornment,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import logo from "../images/bigLogo.png";
import { useAuth } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { fullWidth } from "validator/lib/isFullWidth";

const API_URL = "https://backend-vp67.onrender.com";

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
  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState([]);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();
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

    let failedAttempts = parseInt(localStorage.getItem("failedAttempts")) || 0;
    const lockTime = parseInt(localStorage.getItem("lockTime")) || 0;
    const lockoutCount = parseInt(localStorage.getItem("lockoutCount")) || 0;

    // Calculate the lock time based on lockoutCount
    let lockDuration = 15 * 60 * 1000; // Default 15 minutes in ms

    if (lockoutCount === 1) {
      lockDuration = 60 * 60 * 1000; // 1 hour for 2nd lock
    } else if (lockoutCount === 2) {
      lockDuration = 2 * 60 * 60 * 1000; // 2 hours for 3rd lock
    } else if (lockoutCount > 2) {
      lockDuration = (lockoutCount + 1) * 60 * 60 * 1000; // Increase by 1 hour for each subsequent lock
    }

    // Check if account is locked
    if (failedAttempts >= 5) {
      const currentTime = new Date().getTime();

      // If the lock time is still valid, show lock message
      if (currentTime - lockTime < lockDuration) {
        Swal.fire({
          icon: "error",
          title: "Account Locked",
          text: `You have reached the maximum number of login attempts in this browser. Please try again in ${
            lockDuration / 1000 / 60
          } minutes.`,
        });
        setLoading(false);
        return;
      } else {
        // Reset failed attempts if lock time has expired
        localStorage.setItem("failedAttempts", 0);
        localStorage.removeItem("lockTime");
      }
    }

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      // Reset failed attempts on successful login
      localStorage.setItem("failedAttempts", 0);
      localStorage.setItem("lockoutCount", 0); // Reset lockout count after successful login

      localStorage.setItem("token", response.data.token);
      setUser(response.data);

      await fetchProfile();

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
      const status = error.response?.status;
      const errorMessage =
        error.response?.data?.error || "An error occurred. Please try again.";

      // Increment failed attempts
      failedAttempts += 1;
      localStorage.setItem("failedAttempts", failedAttempts);

      // Update lockout count after every 5 failed attempts
      if (failedAttempts % 5 === 0) {
        const currentLockoutCount = lockoutCount + 1;
        localStorage.setItem("lockoutCount", currentLockoutCount);

        // Lock the account and set lock time
        const currentTime = new Date().getTime();
        localStorage.setItem("lockTime", currentTime);
      }

      if (status === 400) {
        Swal.fire({
          icon: "warning",
          title: "Missing Information",
          text: "Email and password are required",
        });
      } else if (status === 404) {
        Swal.fire({
          icon: "warning",
          title: "Oops",
          text: "User not found",
        });
      } else if (status === 401) {
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: "Incorrect password",
        });
      } else if (status === 403) {
        Swal.fire({
          icon: "error",
          title: "Access Denied",
          text: "Admin user, please use the admin login form!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Admin user not found",
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
        <Box alignItems="center" className="flex justify-center " mb={4}>
          <img
            className="md:block hidden"
            src={logo}
            alt="Logo"
            style={{ width: "150px" }}
          />
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
            type={showPassword ? "text" : "password"}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#d3d3d3",
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
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
        <Box mt={2}>
          <Link to="/adminform" className="underline text-blue-500">
            Sign In as Doctor
          </Link>
        </Box>
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
