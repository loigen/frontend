import React, { useState, useEffect } from "react";
import { fetchAppointmentsByUserId } from "../../api/appointmentAPI/fetchAppointmentsByUserId";
import { useAuth } from "../../context/AuthProvider";
import { LoadingSpinner } from "../custom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Menu,
  MenuItem,
  Button,
  IconButton,
  Box,
  Typography,
  Skeleton,
} from "@mui/material";
import { Close, MoreHoriz } from "@mui/icons-material";
import { fetchAvailableSlots } from "../../api/schedulesAPI/fetchAvailableSlots";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { reqRescheduleAppointment } from "../../api/appointmentAPI/reqReschedule";

const Appointments = ({ onBack }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isRescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleRescheduleAppointment = async () => {
    if (!selectedAppointment || !selectedSlot) return;

    try {
      await reqRescheduleAppointment(
        selectedAppointment._id,
        selectedDate,
        selectedSlot
      );
      closeRescheduleModal();
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const openRescheduleModal = (appointment) => {
    setSelectedAppointment(appointment);
    setRescheduleModalOpen(true);
  };

  const closeRescheduleModal = () => {
    setRescheduleModalOpen(false);
    setSelectedAppointment(null);
    setSelectedDate(new Date());
    setSelectedSlot(null);
  };

  useEffect(() => {
    loadAvailableSlots();
  }, []);

  const loadAvailableSlots = async () => {
    try {
      const slots = await fetchAvailableSlots();
      setAvailableSlots(slots);
    } catch (error) {
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const getAvailableSlotsForSelectedDate = () => {
    const selectedDateStr = selectedDate.toLocaleDateString();
    return availableSlots.filter(
      (slot) => new Date(slot.date).toLocaleDateString() === selectedDateStr
    );
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null); // Reset selected slot when date changes
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot.time);
  };

  useEffect(() => {
    const getAppointments = async () => {
      if (!user) return;

      try {
        const data = await fetchAppointmentsByUserId(user._id);
        const filteredAppointments = data.filter(
          (appointment) => appointment.status === "accepted"
        );
        setAppointments(filteredAppointments);
      } catch (err) {
        setError();
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

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen p-8 bg-white ml-5 mr-5 rounded-md">
      <div className="mb-6 pt-8">
        <button
          className="flex items-center p-3 rounded-md"
          style={{
            backgroundColor: isHovered ? "rgba(44, 105, 117, 0.13)" : "white",
            color: "#2C6975",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onBack}
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

      <h2 className="text-2xl font-semibold text-[#2C6975] mb-8">
        Accepted Appointments
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Type of Service</th>
              <th className="p-4 font-semibold">Consultation Method</th>
              <th className="p-4 font-semibold">Action</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500">
                  No accepted appointments found
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
                    <IconButton onClick={handleMenuOpen}>
                      <MoreHoriz className="text-[#2D4B40]" />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem
                        onClick={() => {
                          handleMenuClose();
                          handleOpenDialog(appointment, "details");
                        }}
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
                      <MenuItem
                        onClick={() => {
                          handleMenuClose();
                          handleOpenDialog(appointment, "notes");
                        }}
                      >
                        View Notes
                      </MenuItem>
                      <MenuItem
                        onClick={() => openRescheduleModal(appointment)}
                      >
                        Request Reschedule
                      </MenuItem>
                    </Menu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Dialog
        open={isRescheduleModalOpen}
        onClose={closeRescheduleModal}
        maxWidth="sm"
      >
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
              <Skeleton />
            ) : getAvailableSlotsForSelectedDate().length === 0 ? (
              <Typography
                variant="body2"
                sx={{ textAlign: "center", margin: "10px", color: "#888" }}
              >
                No available slots for the selected date.
              </Typography>
            ) : (
              getAvailableSlotsForSelectedDate().map((slot) => (
                <Button
                  key={slot._id}
                  variant={
                    selectedSlot === slot.time ? "contained" : "outlined"
                  }
                  onClick={() => handleSlotClick(slot)}
                  sx={{
                    margin: "5px",
                    backgroundColor:
                      selectedSlot === slot.time ? "#2c6975" : "inherit",
                    color: selectedSlot === slot.time ? "#fff" : "inherit",
                  }}
                >
                  {slot.time}
                </Button>
              ))
            )}
          </Box>

          <DialogActions>
            <Button
              onClick={handleRescheduleAppointment}
              disabled={!selectedSlot}
              sx={{
                backgroundColor: selectedSlot ? "#2c6975" : "gray",
                color: selectedSlot ? "white" : "",
              }}
            >
              Confirm Reschedule
            </Button>
            <Button
              variant="outlined"
              onClick={closeRescheduleModal}
              sx={{ color: "#4a8e8b" }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm">
        <div className="flex justify-end">
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              <Close className="text-[#2D4B40]" />
            </Button>
          </DialogActions>
        </div>
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
                      <strong>Total Payment:</strong>₱
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
                  {selectedAppointment.notes || "No notes available."}
                </p>
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

export default Appointments;
