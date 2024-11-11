import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import validator from "validator";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { color } from "framer-motion";
import { fullWidth } from "validator/lib/isFullWidth";
import { VisibilityOff, Visibility } from "@mui/icons-material";

const validateSignupData = (
  firstname,
  lastname,
  email,
  password,
  repeatPassword,
  birthdate,
  sex,
  Profession,
  EducationBackground,
  Religion
) => {
  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !repeatPassword ||
    !birthdate ||
    !sex ||
    !Profession ||
    !EducationBackground ||
    !Religion
  ) {
    return "All fields are required";
  }
  if (password !== repeatPassword) {
    return "Passwords do not match";
  }
  if (!validator.isEmail(email)) {
    return "Invalid email";
  }
  if (!validator.isISO8601(birthdate, { strict: true })) {
    return "Invalid birthdate";
  }

  const birthDateObj = new Date(birthdate);
  let age = new Date().getFullYear() - birthDateObj.getFullYear();
  const monthDiff = new Date().getMonth() - birthDateObj.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && new Date().getDate() < birthDateObj.getDate())
  ) {
    age--;
  }

  if (age < 15) {
    return "You must be at least 15 years old";
  }

  if (!["Male", "Female"].includes(sex)) {
    return "Sex must be either 'Male' or 'Female'";
  }
  return null;
};

const SignupModal = ({ open, onClose, handleOpenLoginModal }) => {
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [sex, setSex] = useState("");
  const [Profession, setProfession] = useState("");
  const [EducationBackground, setEducationBackground] = useState("");
  const [Religion, setReligion] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [agreement, setAgreement] = useState(false);
  const [step, setStep] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
    specialChar: false,
    upperCase: false,
    number: false,
  });
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();
  useEffect(() => {
    setIsButtonDisabled(
      step === 1
        ? !(
            firstname &&
            lastname &&
            birthdate &&
            sex &&
            Profession &&
            EducationBackground &&
            Religion
          )
        : !(email && password && repeatPassword && agreement && passwordsMatch)
    );
  }, [
    step,
    firstname,
    lastname,
    birthdate,
    sex,
    Profession,
    EducationBackground,
    Religion,
    email,
    password,
    repeatPassword,
    agreement,
    passwordsMatch,
  ]);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    setPasswordValidations({
      minLength: newPassword.length >= 8,
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
      upperCase: /[A-Z]/.test(newPassword),
      number: /[0-9]/.test(newPassword),
    });
    setPasswordsMatch(newPassword === repeatPassword);
  };

  const handleRepeatPasswordChange = (e) => {
    const newRepeatPassword = e.target.value;
    setRepeatPassword(newRepeatPassword);

    setPasswordsMatch(password === newRepeatPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateSignupData(
      firstname,
      lastname,
      email,
      password,
      repeatPassword,
      birthdate,
      sex,
      Profession,
      EducationBackground,
      Religion
    );

    if (validationError) {
      setError(validationError);
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `https://backend-vp67.onrender.com/auth/signup`,
        {
          firstname,
          lastname,
          middleName,
          email,
          password,
          repeatPassword,
          birthdate,
          sex,
          Profession,
          EducationBackground,
          Religion,
        }
      );

      if (response.status === 201) {
        Swal.fire("Success", "Account created successfully", "success");
        onClose();
      } else {
        setError("Failed to create account");
        setSnackbarOpen(true);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
        setSnackbarOpen(true);
      } else {
        setError("An unexpected error occurred");
        setSnackbarOpen(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setStep(2);
  };

  const handlePrev = () => {
    setStep(1);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle className="flex gap-2 items-center">
          <ArrowBackIcon
            onClick={handleOpenLoginModal}
            sx={{
              cursor: "pointer",
              fontSize: "1.5rem",
              color: "#2C6975",
            }}
          />
          <Typography variant="h6" component="span">
            {step === 1 ? "Personal Information" : "Account Details"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            {step === 1 && (
              <Box>
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#4e8e9b",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#2c6975",
                      },
                    },
                  }}
                  label="First Name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#4e8e9b",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#2c6975",
                      },
                    },
                  }}
                  label="Middle Name"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#4e8e9b",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#2c6975",
                      },
                    },
                  }}
                  label="Last Name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#4e8e9b",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#2c6975",
                      },
                    },
                  }}
                  label="Birthdate"
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                  InputLabelProps={{ shrink: true }}
                />
                <FormControl
                  component="fieldset"
                  margin="normal"
                  required
                  fullWidth
                >
                  <RadioGroup
                    row
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                  >
                    <FormControlLabel
                      value="Male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="Female"
                      control={<Radio />}
                      label="Female"
                    />
                  </RadioGroup>
                </FormControl>
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#4e8e9b",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#2c6975",
                      },
                    },
                  }}
                  label="Profession"
                  value={Profession}
                  onChange={(e) => setProfession(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#4e8e9b",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#2c6975",
                      },
                    },
                  }}
                  label="Education Background"
                  value={EducationBackground}
                  onChange={(e) => setEducationBackground(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#4e8e9b",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#2c6975",
                      },
                    },
                  }}
                  label="Religion"
                  value={Religion}
                  onChange={(e) => setReligion(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
              </Box>
            )}
            {step === 2 && (
              <Box>
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#4e8e9b",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#2c6975",
                      },
                    },
                  }}
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#4e8e9b",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#2c6975",
                      },
                    },
                  }}
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  fullWidth
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
                {/* Password validation checks */}
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={0.1}
                  sx={{ mt: 2 }}
                >
                  <Typography variant="subtitle1">
                    Password must contain:
                  </Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{
                      mt: 1,
                      p: 1,
                      backgroundColor: passwordValidations.minLength
                        ? "#e6f7e9"
                        : "#fdecea",
                    }}
                  >
                    {passwordValidations.minLength ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <CancelIcon color="error" />
                    )}
                    <Typography sx={{ ml: 1 }}>
                      At least 8 characters
                    </Typography>
                  </Box>

                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{
                      mt: 1,
                      p: 1,
                      backgroundColor: passwordValidations.specialChar
                        ? "#e6f7e9"
                        : "#fdecea",
                    }}
                  >
                    {passwordValidations.specialChar ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <CancelIcon color="error" />
                    )}
                    <Typography sx={{ ml: 1 }}>
                      At least 1 special character
                    </Typography>
                  </Box>

                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{
                      mt: 1,
                      p: 1,
                      backgroundColor: passwordValidations.upperCase
                        ? "#e6f7e9"
                        : "#fdecea",
                    }}
                  >
                    {passwordValidations.upperCase ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <CancelIcon color="error" />
                    )}
                    <Typography sx={{ ml: 1 }}>
                      At least 1 uppercase letter
                    </Typography>
                  </Box>

                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{
                      mt: 1,
                      p: 1,
                      backgroundColor: passwordValidations.number
                        ? "#e6f7e9"
                        : "#fdecea",
                    }}
                  >
                    {passwordValidations.number ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <CancelIcon color="error" />
                    )}
                    <Typography sx={{ ml: 1 }}>At least 1 number</Typography>
                  </Box>
                </Box>
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": {
                        borderColor: "#4e8e9b",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#2c6975",
                      },
                    },
                  }}
                  label="Repeat Password"
                  type="password"
                  value={repeatPassword}
                  onChange={handleRepeatPasswordChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <Alert
                  severity={passwordsMatch ? "success" : "error"}
                  icon={passwordsMatch ? <CheckCircleIcon /> : <CancelIcon />}
                  sx={{
                    backgroundColor: passwordsMatch ? "#e6f7e9" : "#fdecea",
                  }}
                >
                  {passwordsMatch ? "Password Match" : "Password do not match"}
                </Alert>
                <div className="flex flex-row items-center">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={agreement}
                        onChange={(e) => setAgreement(e.target.checked)}
                        sx={{
                          "&.Mui-checked": {
                            color: "#2c6975",
                          },
                        }}
                        required
                      />
                    }
                  />
                  <p>
                    I agree to the{" "}
                    <span
                      className="text-blue-700 underline cursor-pointer"
                      onClick={() => setShowModal(true)}
                    >
                      Terms and Conditions
                    </span>
                  </p>
                </div>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between", mx: 3 }}>
          <Button
            onClick={step === 2 ? handlePrev : onClose}
            variant="outlined"
            disabled={loading}
            sx={{
              color: "#2c6975",
              borderColor: "#2c6975",
              "&:hover": {
                backgroundColor: "#d5e7e8",
                borderColor: "#2c6975",
              },
            }}
          >
            {step === 2 ? "Previous" : "Cancel"}
          </Button>
          {step === 1 ? (
            <Button
              onClick={handleNext}
              variant="contained"
              sx={{
                backgroundColor: "#2c6975",
                "&:hover": {
                  backgroundColor: "#4e8e9b",
                },
              }}
              disabled={isButtonDisabled}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                backgroundColor: "#2c6975",
                "&:hover": {
                  backgroundColor: "#4e8e9b",
                },
              }}
              disabled={loading || isButtonDisabled}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <Dialog open={showModal} onClose={showModal} maxWidth="md" fullWidth>
        <DialogTitle>
          <h1 className="text-2xl font-bold text-[#2C6975] text-center">
            Terms of Use
          </h1>
        </DialogTitle>
        <DialogContent>
          <div className="space-y-6">
            <section>
              <p className="mb-4">
                Welcome to SafePlace. By accessing or using the SafePlace
                platform, you agree to comply with these Terms of Use. If you
                disagree with any part of the terms, you may not access the
                platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#2C6975] mb-3">
                Service Overview
              </h2>
              <p className="text-gray-700">
                SafePlace is an online appointment management system designed to
                facilitate the scheduling and communication needs of Dr. Jeb
                Bohol's practice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#2C6975] mb-3">
                User Responsibilities
              </h2>
              <div className="ml-4">
                <h3 className="font-semibold mb-2">For Patients:</h3>
                <ul className="list-disc ml-6 text-gray-700 mb-4">
                  <li>
                    You agree to provide accurate information when scheduling
                    appointments and uploading payment receipts.
                  </li>
                  <li>
                    Appointment bookings and communication with Dr. Bohol must
                    be used solely for legitimate healthcare purposes.
                  </li>
                </ul>

                <h3 className="font-semibold mb-2">For Dr. Bohol:</h3>
                <ul className="list-disc ml-6 text-gray-700">
                  <li>
                    You are responsible for setting availability, approving
                    appointments, and manually sending email reminders as
                    needed.
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => setShowModal(false)}
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SignupModal;
