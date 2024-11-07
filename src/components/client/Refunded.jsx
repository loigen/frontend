import React, { useState, useEffect } from "react";
import { fetchAppointmentsByUserId } from "../../api/appointmentAPI/fetchAppointmentsByUserId";
import { useAuth } from "../../context/AuthProvider";
import { LoadingSpinner } from "../custom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Close, MoreHoriz } from "@mui/icons-material";

const RefundedAppointments = ({ onBackToActive }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const getAppointments = async () => {
      if (!user) return;
      try {
        const data = await fetchAppointmentsByUserId(user._id);
        const filteredAppointments = data.filter((appointment) => {
          return appointment.status === "refunded";
        });
        setAppointments(filteredAppointments);
      } catch (err) {
        setError(null);
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
  };
  const handleMenuOpen = (event, appointment) => {
    setAnchorEl(event.currentTarget);
    setSelectedAppointment(appointment);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAppointment(null);
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
        Refunded Appointments
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Type of Service</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No refunded appointments found.
                </td>
              </tr>
            ) : (
              appointments.map((appointment) => (
                <tr key={appointment._id} className="border-b">
                  <td className="p-4">
                    {new Date(appointment.date).toLocaleDateString()}
                  </td>
                  <td className="p-4">{appointment.appointmentType}</td>
                  <td className="p-4">
                    <span className="p-1 text-slate-50 rounded bg-green-500">
                      {appointment.status}
                    </span>
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
                          onClick={() => {
                            handleMenuClose();
                            handleOpenDialog(appointment, "receipt");
                          }}
                        >
                          View Receipt
                        </MenuItem>
                      )}
                      {appointment.refundReceipt && (
                        <MenuItem
                          onClick={() => {
                            handleMenuClose();
                            handleOpenDialog(appointment, "Refundreceipt");
                          }}
                        >
                          View Receipt
                        </MenuItem>
                      )}
                      <MenuItem
                        onClick={() => handleOpenDialog(appointment, "notes")}
                      >
                        View Notes
                      </MenuItem>
                    </Menu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
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

              {selectedAppointment.action === "Refundreceipt" && (
                <img src={selectedAppointment.refundReceipt} alt="" />
              )}
            </div>
          ) : (
            <p>Loading details...</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RefundedAppointments;
