import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { fetchAvailableSlots } from "../../api/schedulesAPI/fetchAvailableSlots";
import { createAppointment } from "../../api/appointmentAPI/createAppointmentApi";
import { updateSlotStatus } from "../../api/schedulesAPI/updateSlotStatus";
import { LoadingSpinner } from "../../components/custom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import paypal from "../../images/PayPal.png";
import gcash from "../../images/GCash.png";
import {
  Box,
  Button,
  Checkbox,
  createTheme,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAuth } from "../../context/AuthProvider";
import CompletedAppointments from "../../components/custom/Completed";
import {
  Appointments,
  CanceledAppointments,
  RefundedAppointments,
  RejectedAppointments,
} from "../../components/client";
import ActiveAppointments from "../../components/custom/DefaultViewClient";
import { teal } from "@mui/material/colors";
import { CloudUploadOutlined } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    primary: {
      main: teal[600], // teal-600 color
    },
  },
});
const AppointmentsPage = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [currentView, setCurrentView] = useState("default");
  const [isHoveredCompleted, setIsHoveredCompleted] = useState(false);
  const [isHoveredCanceled, setIsHoveredCanceled] = useState(false);
  const [isHoveredAccepted, setIsHoveredAccepted] = useState(false);

  const [isHoveredRejected, setIsHoveredRejected] = useState(false);
  const [isHoveredRefunded, setIsHoveredRefunded] = useState(false);
  const [isHoveredoption, setIsHoveredoption] = useState(false);
  const [appointmentType, setAppointmentType] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [price, setPrice] = useState(0);
  const { user } = useAuth(); // Assuming user comes from a context
  const [showContent, setShowContent] = useState(false);
  const [step, setStep] = useState(1);
  const [historyOfIntervention, setHistoryOfIntervention] = useState(false);
  const [primaryComplaint, setPrimaryComplaint] = useState("");
  const [briefDetails, setBriefDetails] = useState("");
  const [consultationMethod, setConsultationMethod] = useState("");
  const fileInputRef = useRef(null); // Create a ref for the file input
  const handleReplaceFile = () => {
    fileInputRef.current.click();
  };
  const appointmentTypes = [
    { value: "", label: "Select an appointment type" },
    {
      value: "Individual Counceling",
      label: "Individual Counceling",
      price: 540,
    },
    { value: "Family Counceling", label: "Family Counceling", price: 350 },
    { value: "Couple Counceling", label: "Couple Counceling", price: 450 },
    { value: "Therapy", label: "Therapy", price: 450 },
    {
      value: "Psychological Report",
      label: "Psychological Report",
      price: 450,
    },
    {
      value: "Seminars and WorkShop",
      label: "Seminars and WorkShop",
      price: 450,
    },
  ];
  const handleHistoryChange = (event) => {
    setHistoryOfIntervention(event.target.value === "Yes");
  };

  // Handle consultation method change
  const handleConsultationMethodChange = (event) => {
    setConsultationMethod(event.target.value);
  };
  useEffect(() => {
    const selectedType = appointmentTypes.find(
      (type) => type.value === appointmentType
    );
    if (selectedType) {
      setPrice(selectedType.price);
    }
  }, [appointmentType]);

  const loadAvailableSlots = async () => {
    try {
      const slots = await fetchAvailableSlots();
      setAvailableSlots(slots);
    } catch (error) {
      console.error("Error loading available slots:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAvailableSlots();
  }, []);
  const handleProceed = () => {
    if (
      !selectedSlot ||
      !primaryComplaint ||
      !consultationMethod ||
      !agreementChecked
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please complete all fields before proceeding.",
      });
      return;
    }
    setStep(2); // Proceed to step 2
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getAvailableSlotsForSelectedDate = () => {
    const selectedDateStr = new Date(selectedDate).toLocaleDateString();
    return availableSlots.filter(
      (slot) => new Date(slot.date).toLocaleDateString() === selectedDateStr
    );
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const appointmentData = new FormData();
      appointmentData.append("date", selectedSlot.date);
      appointmentData.append("time", selectedSlot.time);
      appointmentData.append("appointmentType", appointmentType);

      appointmentData.append("userId", user._id);
      appointmentData.append("firstname", user.firstname);
      appointmentData.append("lastname", user.lastname);
      appointmentData.append("email", user.email);
      appointmentData.append("role", user.role);
      appointmentData.append("avatar", user.profilePicture);
      appointmentData.append("sex", user.sex);

      // Include patient information
      appointmentData.append("primaryComplaint", primaryComplaint);
      appointmentData.append("historyOfIntervention", historyOfIntervention);
      appointmentData.append("briefDetails", briefDetails);
      appointmentData.append("consultationMethod", consultationMethod);

      if (file) {
        appointmentData.append("receipt", file);
      }

      const response = await createAppointment(appointmentData);
      await updateSlotStatus(selectedSlot._id, "pending");

      Swal.fire({
        icon: "success",
        title: "Appointment Created",
        text: "Your appointment has been scheduled successfully!",
        willClose: () => {
          window.location.reload();
        },
      });
    } catch (error) {
      console.error("Error creating appointment:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to create appointment. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <>
      {showContent === true ? (
        <>
          {" "}
          <button
            onClick={() => setShowContent(false)}
            className="bg-teal-600 text-white m-2 px-4 py-2 md:px-6 md:py-2 rounded-full mb-4 md:mb-8 shadow-md"
          >
            Close Booking
          </button>
          {step == 1 ? (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              gap={1}
              m={2}
              sx={{
                bgcolor: "white",
                flexDirection: { xs: "column", md: "row", p: 2 },
              }}
              fullWidth
            >
              <Box sx={{ mb: 3, flex: 1, p: 2 }} className="shadow-2xl">
                <Typography variant="h6" fontWeight={500} mb={2}>
                  Kindly specify the service you need here
                </Typography>
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ color: appointmentType ? "black" : "grey" }}
                  >
                    {appointmentType || "Select Appointment Type"}
                  </Typography>
                </Box>
                <Box sx={{ mt: 1 }}>
                  {appointmentTypes.slice(1).map((type) => (
                    <Box
                      key={type.value}
                      onClick={() => setAppointmentType(type.value)}
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                      className="shadow-sm m-2"
                      sx={{
                        mb: "4",
                        padding: "8px",
                        backgroundColor:
                          appointmentType === type.value
                            ? "#ccfbf1"
                            : "transparent",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#e6fffa",
                        },
                        "&:active": {
                          backgroundColor: "#b2f5ea",
                        },
                        "& .text-teal-600": {
                          color:
                            appointmentType === type.value
                              ? "#065f46"
                              : "#14b8a6",
                        },
                      }}
                    >
                      <p>{type.label}</p>
                      <p className="text-teal-600">₱ {type.price}</p>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Step 2: Select Date and Time */}
              <Box sx={{ mb: 3, flex: 1, padding: 2 }} className="shadow-2xl">
                <Typography variant="h6" fontWeight={500} mb={2}>
                  Select your preferred schedule here
                </Typography>
                <Box padding={2}>
                  <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    minDate={new Date()}
                    className="custom-calendar bg-transparent"
                  />
                </Box>
                <Typography variant="body2">Available Time Slots</Typography>
                <Box>
                  {loading ? (
                    <LoadingSpinner />
                  ) : getAvailableSlotsForSelectedDate().length === 0 ? (
                    <Typography
                      variant="body1"
                      sx={{
                        textAlign: "center",
                        margin: "10px",
                        color: "#888",
                      }}
                    >
                      No available slots for the selected date.
                    </Typography>
                  ) : (
                    getAvailableSlotsForSelectedDate().map((slot) => (
                      <Button
                        key={slot._id}
                        variant={
                          selectedSlot === slot ? "contained" : "outlined"
                        }
                        onClick={() => handleSlotClick(slot)}
                        sx={{
                          margin: "5px",
                          backgroundColor:
                            selectedSlot === slot ? "#2c6975" : "inherit",
                          color: selectedSlot === slot ? "#fff" : "inherit",
                        }}
                      >
                        {slot.time}
                      </Button>
                    ))
                  )}
                </Box>
              </Box>
              <ThemeProvider theme={theme}>
                <Box sx={{ mb: 3, flex: 1, padding: 2 }} className="shadow-2xl">
                  <Typography variant="h6" gutterBottom>
                    Patient Information Form
                  </Typography>

                  {/* Mental Health Information */}
                  <Box mb={3}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                    >
                      1. Mental Health Information
                    </Typography>
                    <Typography component="li">Primary Complaint:</Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      variant="outlined"
                      name="primaryComplaint"
                      value={primaryComplaint}
                      onChange={(e) => setPrimaryComplaint(e.target.value)}
                      placeholder="e.g. feeling overwhelmed by daily tasks or emotions"
                    />
                  </Box>

                  {/* History of Intervention */}
                  <Box mb={3}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                    >
                      2. History of Intervention
                    </Typography>
                    <Typography component="li">
                      Have you previously sought mental health support?
                    </Typography>
                    <RadioGroup
                      row
                      value={historyOfIntervention ? "Yes" : "No"}
                      onChange={handleHistoryChange}
                    >
                      <FormControlLabel
                        value="Yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="No"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>

                    {historyOfIntervention && (
                      <>
                        <Typography component="li">
                          If Yes, please provide brief details
                        </Typography>
                        <TextField
                          fullWidth
                          multiline
                          rows={4}
                          variant="outlined"
                          name="briefDetails"
                          value={briefDetails}
                          onChange={(e) => setBriefDetails(e.target.value)}
                          placeholder="Brief details of your previous interventions"
                        />
                      </>
                    )}
                  </Box>

                  {/* Preferred Consultation Method */}
                  <Box mb={3}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                    >
                      3. Preferred Consultation Method
                    </Typography>
                    <RadioGroup
                      row
                      value={consultationMethod}
                      onChange={handleConsultationMethodChange}
                    >
                      <FormControlLabel
                        value="online"
                        control={<Radio color="primary" />}
                        label="Online"
                      />
                      <FormControlLabel
                        value="face-to-face"
                        control={<Radio color="primary" />}
                        label="Face-to-Face"
                      />
                    </RadioGroup>
                  </Box>

                  {/* Agreement Checkbox */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={agreementChecked}
                        onChange={(e) => setAgreementChecked(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="I agree to the terms and conditions"
                  />

                  {/* Proceed Button */}
                  <Box display="flex" justifyContent="flex-end" fullWidth>
                    <button
                      type="submit"
                      onClick={handleProceed}
                      className="bg-[#2C6975] text-white px-4 py-2 md:px-6 md:py-2 rounded-xl shadow-md hover:bg-teal-700"
                    >
                      Proceed
                    </button>
                  </Box>
                </Box>
              </ThemeProvider>
            </Box>
          ) : (
            <>
              {" "}
              <button
                className="bg-teal-600 text-white m-2 px-4 py-2 md:px-6 md:py-2 rounded-full mb-4 md:mb-8 shadow-md"
                onClick={() => setStep(1)}
              >
                Previous
              </button>
              <Box
                display="flex"
                sx={{ flexDirection: { xs: "column", md: "row" } }}
                gap={2}
                m={2}
              >
                <Box
                  sx={{
                    mb: 3,
                    flex: 1,
                    p: 3,
                    border: "1px solid #e0e0e0",
                    borderRadius: 2,
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Review Your Information
                  </Typography>
                  <Box sx={{ ml: 1 }}>
                    <Typography
                      variant="body1"
                      color="#2C6975"
                      sx={{ mb: 1, width: "100%", display: "flex", gap: 1 }}
                    >
                      <strong className="text-[#2C6975]">Full Name:</strong>{" "}
                      <p className="capitalize">{`${user.firstname} ${user.lastname}`}</p>
                    </Typography>
                    <Typography
                      variant="body1"
                      color="#2C6975"
                      className="capitalize"
                      sx={{ mb: 1 }}
                    >
                      <strong style={{ color: "#2C6975" }}>
                        Service Availed:
                      </strong>{" "}
                      {appointmentType}
                    </Typography>
                    <Typography
                      className="capitalize"
                      color="#2C6975"
                      variant="body1"
                      sx={{ mb: 1 }}
                    >
                      <strong style={{ color: "#2C6975" }}>Date:</strong>{" "}
                      {new Date(selectedSlot.date).toLocaleDateString()}
                    </Typography>
                    <Typography
                      className="capitalize"
                      color="#2C6975"
                      variant="body1"
                      sx={{ mb: 1 }}
                    >
                      <strong style={{ color: "#2C6975" }}>Time:</strong>{" "}
                      {selectedSlot.time}
                    </Typography>
                    <Typography color="#2C6975" variant="body1" sx={{ mb: 1 }}>
                      <strong>Email:</strong> {user.email}
                    </Typography>
                    <Typography
                      className="capitalize"
                      color="#2C6975"
                      variant="body1"
                      sx={{ mb: 1 }}
                    >
                      <strong style={{ color: "#2C6975" }}>Sex:</strong>{" "}
                      {user.sex}
                    </Typography>
                    <Typography
                      className="capitalize"
                      color="#2C6975"
                      variant="body1"
                      sx={{ mb: 1 }}
                    >
                      <strong style={{ color: "#2C6975" }}>
                        Primary Complaint:
                      </strong>{" "}
                      {primaryComplaint}
                    </Typography>
                    <Typography
                      className="capitalize"
                      color="#2C6975"
                      variant="body1"
                      sx={{ mb: 1 }}
                    >
                      <strong style={{ color: "#2C6975" }}>
                        History of Intervention:
                      </strong>{" "}
                      {historyOfIntervention ? "Yes" : "No"}
                    </Typography>
                    {historyOfIntervention && (
                      <Typography
                        className="capitalize"
                        color="#2C6975"
                        variant="body1"
                        sx={{ mb: 1 }}
                      >
                        <strong style={{ color: "#2C6975" }}>
                          Brief Details:
                        </strong>{" "}
                        {briefDetails}
                      </Typography>
                    )}
                    <Typography
                      className="capitalize"
                      color="#2C6975"
                      variant="body1"
                      sx={{ mb: 1 }}
                    >
                      <strong style={{ color: "#2C6975" }}>
                        Consultation Method:
                      </strong>{" "}
                      {consultationMethod}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  display="flex"
                  flexDirection="column"
                  gap={1}
                  sx={{
                    mb: 3,
                    flex: 1,
                    p: 3,
                    border: "1px solid #e0e0e0",
                    borderRadius: 2,
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <p>
                    <strong>STEP 2:</strong> Choose a payment method and simply
                    scan the qr code below. Pay the right amount and take a
                    screenshot/ picture of the proof of payment.
                  </p>
                  <p>
                    <strong>Total Payment:</strong> ₱ {price}
                  </p>
                  <Box display="flex" flexDirection="row" flexWrap="wrap">
                    <div className="bg-white shadow-2xl px-2 py-1">
                      <img src={gcash} alt="" />
                    </div>
                    gcash QR here
                  </Box>
                  <Box display="flex" flexDirection="row" flexWrap="wrap">
                    <div className="bg-white shadow-2xl px-2 py-1">
                      <img src={paypal} alt="" />
                    </div>
                    paypal QR here
                  </Box>
                </Box>
                <Box
                  sx={{
                    mb: 3,
                    flex: 1,
                    p: 3,
                    border: "1px solid #e0e0e0",
                    borderRadius: 2,
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#f9f9f9",
                  }}
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <div>
                    <Typography variant="p">
                      Upload your proof of payment using the button below to
                      confirm your appointment.
                    </Typography>

                    <div className="flex justify-center items-center gap-2">
                      <label className="inline-flex w-fit gap-1 items-center bg-[#2c6975] text-white py-2 px-4 rounded-lg cursor-pointer">
                        <input
                          type="file"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <CloudUploadOutlined />
                        <span>Choose File</span>
                      </label>
                    </div>

                    <div className="flex justify-center items-center">
                      {filePreview && (
                        <img
                          src={filePreview}
                          alt="Receipt Preview"
                          style={{
                            width: "300px",
                            height: "auto",
                            marginTop: "10px",
                          }}
                        />
                      )}
                    </div>
                  </div>

                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={submitting}
                    sx={{
                      alignSelf: "end",
                      m: 2,
                      bgcolor: "#2C6975",
                      borderRadius: "100px",
                    }}
                  >
                    {submitting ? "Booking..." : "Book Appointment"}
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </>
      ) : (
        <Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            padding={2}
          >
            <button
              className="bg-[#2C6975] text-white px-6 py-2 rounded-full font-poppins pt-4 pb-4 pl-10 pr-10 transition duration-300 ease-in-out hover:bg-[#358898] hover:shadow-lg "
              onClick={() => {
                setShowContent(true);
              }}
            >
              Book Appointment
            </button>
            <div className="relative">
              <div className="hidden md:flex space-x-4">
                <button
                  className="px-4 py-2 rounded-full transition duration-300 ease-in-out"
                  style={{
                    backgroundColor:
                      currentView === "completed" || isHoveredCompleted
                        ? "rgba(44, 105, 117, 0.13)"
                        : "#E9F1EF",
                    color: "#2C6975",
                  }}
                  onMouseEnter={() => setIsHoveredCompleted(true)}
                  onMouseLeave={() => setIsHoveredCompleted(false)}
                  onClick={() => handleViewChange("completed")}
                >
                  Completed
                </button>

                <button
                  className="px-4 py-2 rounded-full transition duration-300 ease-in-out"
                  style={{
                    backgroundColor:
                      currentView === "canceled" || isHoveredCanceled
                        ? "rgba(44, 105, 117, 0.13)"
                        : "#E9F1EF",
                    color: "#2C6975",
                  }}
                  onMouseEnter={() => setIsHoveredCanceled(true)}
                  onMouseLeave={() => setIsHoveredCanceled(false)}
                  onClick={() => handleViewChange("canceled")}
                >
                  Canceled
                </button>

                <button
                  className="px-4 py-2 rounded-full transition duration-300 ease-in-out"
                  style={{
                    backgroundColor:
                      currentView === "rejected" || isHoveredRejected
                        ? "rgba(44, 105, 117, 0.13)"
                        : "#E9F1EF",
                    color: "#2C6975",
                  }}
                  onMouseEnter={() => setIsHoveredRejected(true)}
                  onMouseLeave={() => setIsHoveredRejected(false)}
                  onClick={() => handleViewChange("rejected")}
                >
                  Rejected
                </button>
                <button
                  className="px-4 py-2 rounded-full transition duration-300 ease-in-out"
                  style={{
                    backgroundColor:
                      currentView === "refunded" || isHoveredRefunded
                        ? "rgba(44, 105, 117, 0.13)"
                        : "#E9F1EF",
                    color: "#2C6975",
                  }}
                  onMouseEnter={() => setIsHoveredRefunded(true)}
                  onMouseLeave={() => setIsHoveredRefunded(false)}
                  onClick={() => handleViewChange("refunded")}
                >
                  Refunded
                </button>
                <button
                  className="px-4 py-2 rounded-full transition duration-300 ease-in-out"
                  style={{
                    backgroundColor:
                      currentView === "Accepted" || isHoveredAccepted
                        ? "rgba(44, 105, 117, 0.13)"
                        : "#E9F1EF",
                    color: "#2C6975",
                  }}
                  onMouseEnter={() => setIsHoveredAccepted(true)}
                  onMouseLeave={() => setIsHoveredAccepted(false)}
                  onClick={() => handleViewChange("Accepted")}
                >
                  Accepted
                </button>
              </div>

              {/* Dropdown for smaller screens */}
              <div className="md:hidden">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="px-4 py-2 rounded-full transition duration-300 ease-in-out"
                  style={{
                    backgroundColor: isHoveredoption
                      ? "rgba(44, 105, 117, 0.13)"
                      : "#E9F1EF",
                    color: "#2C6975",
                  }}
                  onMouseEnter={() => setIsHoveredoption(true)}
                  onMouseLeave={() => setIsHoveredoption(false)}
                >
                  More Options
                </button>
                {showDropdown && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10"
                  >
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Completed
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Canceled
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Rejected
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Refunded
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Accepted
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Box>
          {currentView === "completed" && (
            <CompletedAppointments
              onBackToActive={() => handleViewChange("default")}
            />
          )}
          {currentView === "canceled" && (
            <CanceledAppointments
              onBackToActive={() => handleViewChange("default")}
            />
          )}
          {currentView === "rejected" && (
            <RejectedAppointments
              onBackToActive={() => handleViewChange("default")}
            />
          )}
          {currentView === "refunded" && (
            <RefundedAppointments
              onBackToActive={() => handleViewChange("default")}
            />
          )}
          {currentView === "Accepted" && (
            <Appointments onBack={() => handleViewChange("default")} />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Render Active or Completed Appointments */}
            {currentView === "default" && (
              <>
                <ActiveAppointments />
              </>
            )}
          </div>
        </Box>
      )}
    </>
  );
};

export default AppointmentsPage;
