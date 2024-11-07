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
import { Close, MoreHoriz } from "@mui/icons-material";
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
                      {appointment.receipt && (
                        <MenuItem
                          onClick={() =>
                            window.open(appointment.receipt, "_blank")
                          }
                        >
                          View Receipt
                        </MenuItem>
                      )}
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
          <h3 className="text-lg font-semibold">
            Request Refund for Appointment
          </h3>
          <p>
            Refund Request: Upload Your GCash or PayPal QR Code Dear Patient, To
            process your refund, kindly upload the QR code for your preferred
            payment method. We accept refunds via: GCash PayPal Please ensure
            the QR code is clear and accurate so that we can process your refund
            swiftly. If you have any questions, feel free to reach out.
          </p>
          <input
            type="file"
            onChange={handleQrCodeUpload}
            accept="image/*"
            className="mt-4"
          />
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
          <Button
            variant="contained"
            color="primary"
            className="mt-4"
            onClick={handleRequestRefund}
          >
            Submit Refund Request
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CanceledAppointments;
