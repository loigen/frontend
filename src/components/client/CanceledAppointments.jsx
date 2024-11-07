import React, { useState, useEffect } from "react";
import { fetchAppointmentsByUserId } from "../../api/appointmentAPI/fetchAppointmentsByUserId";
import { useAuth } from "../../context/AuthProvider";
import {
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LoadingSpinner from "../custom/LoadingSpinner";
import {
  Close,
  CloudDownloadOutlined,
  CloudSyncOutlined,
  MoreHoriz,
} from "@mui/icons-material";
import axios from "axios";
import Swal from "sweetalert2";


const CanceledAppointments = ({ onBackToActive }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [qrCode, setQrCode] = useState(null); // For storing QR code file
  const [qrCodePreview, setQrCodePreview] = useState(null); // For storing the image preview
  const [notifOpen, setNotifOpen] = useState(false);

  const notif = {
    title: "Payment Issue Notification",
    header: `Dear ${user.firstname} ${user.lastname},`,
    body: "I hope this message finds you well. I wanted to bring to your attention an issue with the recent payment for your session(s). Upon reviewing the payment details and receipt you provided, it appears that there may be an error or inconsistency.",
    body1:
      "At this time, we have not received the payment reflected in the provided receipt. To continue providing services, I kindly request that you verify the payment and submit a valid receipt or make the necessary payment as soon as possible.",
    body2:
      "If this is a mistake or misunderstanding, please feel free to reach out to discuss and resolve the issue.",
    body3:
      "I appreciate your prompt attention to this matter and look forward to your cooperation.",
    end: "Sincerely,",
    name: "Jeb Bohol",
  };

  const handleNotifClose = () => {
    setNotifOpen(false);
  };
  useEffect(() => {
    const getAppointments = async () => {
      if (!user) return;
      try {
        const data = await fetchAppointmentsByUserId(user._id);
        const filteredAppointments = data.filter(
          (appointment) => appointment.status === "canceled"
        );
        setAppointments(filteredAppointments);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getAppointments();
  }, [user]);

  const handleOpenDialog = (appointment, action) => {
    setSelectedAppointment({ ...appointment, action });
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedAppointment(null);
    setQrCodePreview(null);
  };

  const handleMenuOpen = (event, appointment) => {
    setAnchorEl(event.currentTarget);
    setSelectedAppointment(appointment);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAppointment(null);
  };

  // Handle QR Code file upload
  const handleQrCodeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setQrCode(file);
      setQrCodePreview(URL.createObjectURL(file)); // Create a preview URL for the image
    }
  };

  const handleRequestRefund = async () => {
    if (!qrCode) {
      Swal.fire({
        icon: "error",
        title: "No QR Code",
        text: "Please upload a QR code before requesting a refund.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("qrCode", qrCode);
    formData.append("appointmentId", selectedAppointment._id);

    try {
      const response = await axios.post(
        "https://backend-vp67.onrender.com/Appointments/api/appointments/update-with-bank-account",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      Swal.fire({
        icon: "success",
        title: "Refund Request",
        text: response.data.message,
      });

      setOpen(false);
      setAppointments(
        appointments.filter((app) => app._id !== selectedAppointment._id)
      );
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Refund Request Failed",
        text: err.response?.data?.error || "Something went wrong.",
      });
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      {/* Back Button */}
      <div className="mb-6">
        <button
          className="text-[#2C6975] flex items-center"
          onClick={onBackToActive}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          BACK
        </button>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-[#2C6975] mb-8">
        Canceled Appointments
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Type of Service</th>
              <th className="p-4 font-semibold">Consultation Method</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500">
                  No canceled appointments found. You can go back to view active
                  appointments.
                </td>
              </tr>
            ) : (
              appointments.map((appointment) => (
                <tr key={appointment._id} className="border-b">
                  <td className="p-4">
                    {new Date(appointment.date).toLocaleDateString()}
                  </td>
                  <td className="p-4">{appointment.appointmentType}</td>
                  <td className="p-4 font-semibold text-teal-600">
                    {appointment.consultationMethod}
                  </td>
                  <td className="p-4">
                    <IconButton onClick={(e) => handleMenuOpen(e, appointment)}>
                      <MoreHoriz />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem
                        onClick={() => handleOpenDialog(appointment, "details")}
                      >
                        View Details
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleMenuClose();
                          handleOpenDialog(appointment, "receipt");
                        }}
                      >
                        View Receipt
                      </MenuItem>
                      {appointment.refundReceipt && (
                        <MenuItem
                          onClick={() =>
                            window.open(appointment.refundReceipt, "_blank")
                          }
                        >
                          View Refund Receipt
                        </MenuItem>
                      )}
                      <MenuItem
                        onClick={() => handleOpenDialog(appointment, "notes")}
                      >
                        View Notes
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleOpenDialog(appointment, "refund")}
                      >
                        Request Refund
                      </MenuItem>
                    </Menu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Dialog for Refund Request */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            <Close />
          </Button>
        </DialogActions>
        <DialogContent>
          {selectedAppointment ? (
            <div>
              {selectedAppointment.action === "details" && (
                <>
                  <div className="text-[#2D4B40] flex flex-col gap-6">
                    <p>
                      <strong>Name:</strong> {selectedAppointment.firstname}{" "}
                      {selectedAppointment.lastname}
                    </p>
                    <p>
                      <strong>Email Address:</strong>{" "}
                      {selectedAppointment.email}
                    </p>
                    <p>
                      <strong>Complaint:</strong>{" "}
                      {selectedAppointment.primaryComplaint}
                    </p>
                    <p>
                      <strong>Service Availed:</strong>{" "}
                      {selectedAppointment.appointmentType}
                    </p>
                    <p>
                      <strong>History of Intervention:</strong>{" "}
                      {selectedAppointment.historyOfIntervention !== "false"
                        ? selectedAppointment.historyOfIntervention
                        : "N/A"}
                    </p>
                    <p>
                      <strong>Preferred Schedule:</strong>{" "}
                      {new Date(selectedAppointment.date).toLocaleString(
                        "en-US",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                      <span> - </span>
                      {selectedAppointment.time}
                    </p>

                    <p>
                      <strong>Preferred Consultation Method:</strong>{" "}
                      {selectedAppointment.consultationMethod}
                    </p>
                    <p>
                      <strong>Total Payment:</strong> ₱
                      {selectedAppointment.TotalPayment}
                    </p>
                  </div>
                </>
              )}
              {selectedAppointment.action === "receipt" && (
                <img src={selectedAppointment.receipt} alt="" />
              )}
              {selectedAppointment.action === "notes" && (
                <p className="text-[#2D4B40]">
                  {selectedAppointment.notes || "No Reason available."}
                </p>
              )}
              {selectedAppointment.action === "refund" && (
                <div className="flex-col flex gap-2">
                  <h3 className="text-lg font-semibold">
                    Refund Request: Upload Your GCash or PayPal QR Code{" "}
                  </h3>
                  <p>
                    Dear Patient, To process your refund, kindly upload the QR
                    code for your preferred payment method. We accept refunds
                    via:
                  </p>
                  <ol>
                    <li>1. GCash </li>
                    <li>2. PayPal</li>
                  </ol>
                  <p>
                    Please ensure the QR code is clear and accurate so that we
                    can process your refund swiftly.
                  </p>
                  <p>If you have any questions, feel free to reach out.</p>
                  <div className="mt-4 flex justify-center items-center">
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer inline-flex gap-2 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#2C6975] hover:bg-[#2C6e75] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <CloudDownloadOutlined /> <p>Upload Here</p>
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      onChange={handleQrCodeUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>

                  {/* Image Preview */}
                  {qrCodePreview && (
                    <div className="mt-4">
                      <img
                        src={qrCodePreview}
                        alt="QR Code Preview"
                        className="w-40 h-40 object-cover"
                      />
                    </div>
                  )}
                  <div className="flex justify-end items-center">
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ background: "#2C6975" }}
                      className="mt-4"
                      onClick={handleRequestRefund}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              )}
              {selectedAppointment.action === ""}
            </div>
          ) : (
            <p>Loading details...</p>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={notifOpen} onClose={handleNotifClose}>
        <DialogActions onClick={handleNotifClose}>
          <Close className="text-[#2C6975]" />
        </DialogActions>
        <DialogContent className="flex flex-col gap-4">
          <h2 className="text-[#2C6975] font-semibold">{notif.title}</h2>
          <p className="capitalize">{notif.header}</p>
          <p>{notif.body}</p>
          <p>{notif.body1}</p>
          <p>{notif.body2}</p>
          <p>{notif.body3}</p>
          <p>{notif.end}</p>
          <p>{notif.name}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CanceledAppointments;
