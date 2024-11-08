import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Close as CloseIcon } from "@mui/icons-material";
import axios from "axios";
import UserAppointments from "./userhistory"; // Update with the actual path
import { saveAs } from "file-saver"; // Ensure to install file-saver: npm install file-saver

const PatientDetails = ({ patient, onClose, handleRefund }) => {
  const [refundFile, setRefundFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [note, setNote] = useState(""); // State for note input
  const [showAppointments, setShowAppointments] = useState(false); // State to toggle appointments view
  function downloadImage(url) {
    saveAs(url, "receipt.jpg");
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setRefundFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleRefundClick = () => {
    if (refundFile) {
      handleRefund(patient.id, refundFile);
      setRefundFile(null);
      setPreviewUrl(null);
    } else {
      alert("Please select a file before submitting.");
    }
  };

  const handleRemovePreview = () => {
    setRefundFile(null);
    setPreviewUrl(null);
  };

  // Function to handle adding a note to the appointment
  const handleAddNote = async () => {
    try {
      const response = await axios.put(
        `https://backend-vp67.onrender.com/Appointments/api/${patient.id}/note`,
        {
          note,
        }
      );
      alert(response.data.message); // Display success message
      setNote(""); // Clear the note input after submission
    } catch (error) {
      console.error("Error adding note:", error);
      alert("Failed to add note. Please try again."); // Display error message
    }
  };

  return (
    <Modal
      open={!!patient}
      onClose={onClose}
      aria-labelledby="patient-details-modal"
      aria-describedby="patient-details-description"
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          width: "100%",
          maxWidth: 800,
          maxHeight: "90vh",
          mx: "auto",
          mt: 8,
          position: "relative",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "text.secondary",
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          variant="h6"
          component="div"
          align="center"
          className="capitalize"
          sx={{ mb: 2, color: "#2C6975", fontWeight: "bold" }}
        >
          {patient.status}
        </Typography>

        {patient.status === "completed" && (
          <>
            {" "}
            {!patient.note ? ( // Only show this section if there is no existing note
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Add a Note:
                </Typography>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Write your note here..."
                  style={{
                    width: "100%",
                    height: 100,
                    borderRadius: 4,
                    border: "1px solid #ccc",
                    padding: 8,
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddNote}
                  sx={{ mt: 2 }}
                >
                  Add Note
                </Button>
              </Box>
            ) : (
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Existing Note:
                </Typography>
                <Typography>{patient.note}</Typography>
              </Box>
            )}
          </>
        )}

        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          flexGrow={1}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Box sx={{ mb: 4 }}>
              {patient.status === "requested" && (
                <Box
                  sx={{
                    textAlign: "center",
                    mt: 4,
                    flexGrow: 1,
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    id="refund-file"
                    style={{ display: "none", borderRadius: "100px" }}
                  />
                  <label htmlFor="refund-file" className="m-2">
                    <Button
                      variant="outlined"
                      component="span"
                      sx={{
                        mb: 2,
                        color: "#2c6975",
                        borderColor: "#2c6975",
                        borderRadius: "100px",
                      }}
                    >
                      Click to Upload Proof
                    </Button>
                  </label>

                  {previewUrl && (
                    <Box sx={{ mb: 2, position: "relative" }}>
                      <img
                        src={previewUrl}
                        alt="Refund Preview"
                        style={{
                          width: 200,
                          height: 200,
                          borderRadius: 4,
                        }}
                      />
                      <IconButton
                        onClick={handleRemovePreview}
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          color: "text.secondary",
                          backgroundColor: "background.paper",
                          borderRadius: "50%",
                          boxShadow: 2,
                          p: 0.5,
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  )}

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRefundClick}
                    disabled={!refundFile}
                    sx={{ mb: 2, borderRadius: "100px" }}
                  >
                    Process Refund
                  </Button>
                </Box>
              )}
              <Box
                sx={{
                  mb: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={
                    patient.user.profilePicture ||
                    "https://via.placeholder.com/150"
                  }
                  alt="Avatar"
                  style={{ width: 100, height: 100, borderRadius: "50%" }}
                />
              </Box>
              <Typography
                variant="h6"
                className="capitalize"
                sx={{ fontWeight: "bold" }}
              >
                {`${patient.user.firstname} ${patient.user.lastname}`}
              </Typography>
            </Box>

            <Box
              sx={{
                textAlign: "left",
                color: "#2C6975",
                mb: 4,
              }}
              display="flex"
              flexDirection="column"
              gap={1}
            >
              <Typography>
                <strong>Email: </strong> {patient.user.email || "N/A"}
              </Typography>
              <Typography>
                <strong>Education Background: </strong>
                {patient.user.educationBackground || "N/A"}
              </Typography>
              <Typography>
                <strong>Religion: </strong>
                {patient.user.religion || "N/A"}
              </Typography>
              <Typography>
                <strong>Profession: </strong>
                {patient.user.profession || "N/A"}
              </Typography>
              <Typography>
                <strong>Sex: </strong>
                {patient.user.sex || "N/A"}
              </Typography>
              <Typography>
                <strong>Complaint: </strong>
                {patient.primaryComplaint || "N/A"}
              </Typography>
              <Typography className="capitalize">
                <strong>Service Availed: </strong>

                {patient.typeOfCounseling || "N/A"}
              </Typography>
              <Typography className="capitalize">
                <strong>History of Intervention: </strong>
                {patient.historyOfIntervention !== "false"
                  ? patient.historyOfIntervention
                  : "N/A"}
              </Typography>
              <Typography>
                <strong>Preferred Schedule: </strong>
                {patient.date || "N/A"}
                <span> | </span>
                {patient.time || "N/A"}
              </Typography>
              <Typography className="capitalize">
                <strong>Consultaion Method: </strong>
                {patient.consultationMethod || "N/A"}
              </Typography>
              <Typography className="capitalize">
                <strong>Total Payment: </strong>

                {patient.TotalPayment || "N/A"}
              </Typography>
            </Box>
          </Box>
          {patient.status === "requested" && (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              {patient.qrCode ? (
                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    component="div"
                    sx={{ mb: 1 }}
                  >
                    Patient's QR Code
                  </Typography>
                  <img
                    src={patient.qrCode}
                    alt="QR Code"
                    style={{
                      width: "100%",
                      maxWidth: 500,
                      height: "auto",
                      border: "1px solid #000",
                      borderRadius: 4,
                      padding: 4,
                    }}
                  />
                  <button
                    onClick={() => downloadImage(patient.receipt)}
                    style={{
                      marginTop: "8px",
                      padding: "8px 16px",
                      backgroundColor: "#1976d2",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Download Receipt
                  </button>
                </Box>
              ) : (
                "No QR Code Available"
              )}
            </Box>
          )}
          {patient.status === "refunded" && (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              {patient.refundReceipt ? (
                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    component="div"
                    sx={{ mb: 1 }}
                  >
                    Patient's QR Code
                  </Typography>
                  <img
                    src={patient.refundReceipt}
                    alt="Receipt"
                    style={{
                      width: "100%",
                      maxWidth: 500,
                      height: "auto",
                      border: "1px solid #000",
                      borderRadius: 4,
                      padding: 4,
                    }}
                  />
                  <button
                    onClick={() => downloadImage(patient.receipt)}
                    style={{
                      marginTop: "8px",
                      padding: "8px 16px",
                      backgroundColor: "#1976d2",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Download Receipt
                  </button>
                </Box>
              ) : (
                "No Receipt Code Available"
              )}
            </Box>
          )}
          {patient.status !== "refunded" && patient.status !== "requested" && (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              {patient.receipt ? (
                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div className="w-full">
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      component="div"
                      sx={{ mb: 1 }}
                    >
                      Payment Receipt
                    </Typography>
                  </div>
                  <img
                    src={patient.receipt}
                    alt="Receipt"
                    style={{
                      width: "100%",
                      maxWidth: 500,
                      height: "auto",
                      border: "1px solid #000",
                      borderRadius: 4,
                      padding: 4,
                    }}
                  />
                  <button
                    onClick={() => downloadImage(patient.receipt)}
                    style={{
                      marginTop: "8px",
                      padding: "8px 16px",
                      backgroundColor: "#1976d2",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Download Receipt
                  </button>
                </Box>
              ) : (
                "No Receipt Code Available"
              )}
            </Box>
          )}
        </Box>

        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            onClick={() => setShowAppointments(true)} // Show appointments
            sx={{ mr: 2, bgcolor: "#2C6975", borderRadius: "100px" }}
          >
            View All Appointments
          </Button>
        </Box>

        {showAppointments && (
          <Box sx={{ mt: 4 }}>
            <UserAppointments userId={patient.user.id} />
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setShowAppointments(false)} // Hide appointments
              sx={{ mt: 2 }}
            >
              Close Appointments
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default PatientDetails;
