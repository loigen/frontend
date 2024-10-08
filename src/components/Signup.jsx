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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import validator from "validator";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

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

  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
    specialChar: false,
    upperCase: false,
    number: false,
  });

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
        : !(email && password && repeatPassword && agreement)
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
        `https://backend-production-c8da.up.railway.app/auth/signup`,
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
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  fullWidth
                  margin="normal"
                  required
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
                  label="I agree to the terms and conditions"
                  sx={{ mt: 2 }}
                />
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
