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
  Religion,
  Age
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
    !Religion ||
    !Age
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
  if (!["Male", "Female"].includes(sex)) {
    return "Sex must be either 'Male' or 'Female'";
  }
  if (!Number.isInteger(Age) || Age <= 0) {
    return "Invalid age";
  }
  return null;
};

const SignupModal = ({ open, onClose, handleOpenLoginModal }) => {
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
  const [Age, setAge] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [agreement, setAgreement] = useState(false);
  const [step, setStep] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    setIsButtonDisabled(
      step === 1
        ? !(
            firstname &&
            lastname &&
            middleName &&
            birthdate &&
            sex &&
            Profession &&
            EducationBackground &&
            Religion &&
            Age
          )
        : !(email && password && repeatPassword && agreement)
    );
  }, [
    step,
    firstname,
    lastname,
    middleName,
    birthdate,
    sex,
    Profession,
    EducationBackground,
    Religion,
    Age,
    email,
    password,
    repeatPassword,
    agreement,
  ]);

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
      Religion,
      Age
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
          Age,
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
                  label="Age"
                  type="number"
                  value={Age}
                  onChange={(e) => setAge(parseInt(e.target.value))}
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
                  onChange={(e) => setPassword(e.target.value)}
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
                  label="Repeat Password"
                  type="password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={agreement}
                      onChange={(e) => setAgreement(e.target.checked)}
                    />
                  }
                  label="I agree to the Terms and Conditions"
                />
              </Box>
            )}
            {error && (
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
              >
                <Alert onClose={handleCloseSnackbar} severity="error">
                  {error}
                </Alert>
              </Snackbar>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          {step === 2 && (
            <Button onClick={handlePrev} color="primary">
              Back
            </Button>
          )}
          <Button
            type="submit"
            onClick={step === 2 ? handleSubmit : handleNext}
            color="primary"
            disabled={isButtonDisabled}
            variant="contained"
          >
            {step === 1 ? "Next" : loading ? "Loading..." : "Sign Up"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignupModal;
