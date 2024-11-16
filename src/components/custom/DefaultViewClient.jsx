import React, { useState, useEffect } from "react";
import InfoIcon from "@mui/icons-material/Info";
import Modal from "@mui/material/Modal";
import LoadingSpinner from "./LoadingSpinner";
import { useAuth } from "../../context/AuthProvider";
import { fetchAppointmentsByUserId } from "../../api/appointmentAPI/fetchAppointmentsByUserId";
import { reqRescheduleAppointment } from "../../api/appointmentAPI/reqReschedule";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  Skeleton,
  Typography,
} from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { fetchAvailableSlots } from "../../api/schedulesAPI/fetchAvailableSlots";
const ActiveAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const { user } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isRescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const today = new Date();
  const todayStr = today.toLocaleDateString();
  useEffect(() => {
    const getAppointments = async () => {
      if (!user) return;

      try {
        const data = await fetchAppointmentsByUserId(user._id);
        setAppointments(data); // Store all appointments
      } catch (err) {
        setError();
      } finally {
        setLoading(false);
      }
    };

    getAppointments();
  }, [user]);
  const todayAppointments = appointments.filter((appointment) => {
    const appointmentDateStr = new Date(appointment.date).toLocaleDateString();
    return appointmentDateStr === todayStr;
  });
  const notTodayAppointments = appointments.filter((appointment) => {
    const appointmentDateStr = new Date(appointment.date).toLocaleDateString();
    return appointmentDateStr !== todayStr;
  });
  const handleOpenModal = (appointment) => {
    setSelectedAppointment(appointment);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleRescheduleAppointment = async () => {
    if (!selectedAppointment || !selectedSlot) return;

    try {
      await reqRescheduleAppointment(
        selectedAppointment._id,
        selectedDate,
        selectedSlot
      );
      closeRescheduleModal();
      window.location.reload();
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
      console.error("Error loading available slots:", error);
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
    setSelectedSlot(null);
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot.time);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  const acceptedAppointments = todayAppointments.filter(
    (appointment) =>
      appointment.status === "accepted" || appointment.status === "rescheduled"
  );

  const rescheduledAppointments = notTodayAppointments.filter(
    (appointment) => appointment.status === "rescheduled"
  );
  const requestedRescheduledAppointments = appointments.filter(
    (appointment) => appointment.status === "ReqRescheduled"
  );
  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "pending"
  );

  return (
    <>
      {/* Active Appointments */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-4 ml-2">
        <h3 className="text-md font-semibold mb-4 text-[#2C6975]">
          Today's Active Appointments
        </h3>
        {acceptedAppointments.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {acceptedAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment._id}
                appointment={appointment}
                onOpenModal={handleOpenModal}
                onOpenRescheduleModal={openRescheduleModal}
                showGoToRoom={true}
              />
            ))}
          </div>
        ) : (
          <p
            style={{
              color: "rgba(44, 105, 117, 0.40)",
            }}
          >
            {" "}
            No active appointments for today.
          </p>
        )}
      </div>

      {/* Rescheduled Appointments */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
        <h3 className="text-md font-semibold mb-4 text-[#2C6975]">
          Rescheduled Appointments
        </h3>
        {rescheduledAppointments.length > 0 ? (
          <div className="grid gap-4">
            {rescheduledAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment._id}
                appointment={appointment}
                onOpenModal={handleOpenModal}
                showGoToRoom={false}
              />
            ))}
          </div>
        ) : (
          <p>No rescheduled</p>
        )}
      </div>

      {/* Requested Rescheduled Appointments */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
        <h3 className="text-md font-semibold mb-4 text-[#2C6975]">
          Requested Rescheduled Appointments
        </h3>
        {requestedRescheduledAppointments.length > 0 ? (
          <div className="grid gap-4">
            {requestedRescheduledAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment._id}
                appointment={appointment}
                onOpenModal={handleOpenModal}
                showGoToRoom={false}
              />
            ))}
          </div>
        ) : (
          <p>No requsted torescheduled</p>
        )}
      </div>

      {/* Pending Appointments */}
      <div className="bg-white ml-2 p-6 mr-2 rounded-lg shadow-lg mb-4">
        <h3 className="text-md font-semibold mb-4 text-[#2C6975]">
          Pending Appointments
        </h3>
        {pendingAppointments.length > 0 ? (
          <div className="grid gap-4">
            {pendingAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment._id}
                appointment={appointment}
                onOpenModal={handleOpenModal}
                onOpenRescheduleModal={openRescheduleModal}
                showGoToRoom={false}
              />
            ))}
          </div>
        ) : (
          <p
            style={{
              color: "rgba(44, 105, 117, 0.40)",
            }}
          >
            No pending appointments
          </p>
        )}
      </div>

      {/* Modal for showing detailed appointment info */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="appointment-info-title"
        aria-describedby="appointment-info-description"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg w-1/3">
          {selectedAppointment && (
            <>
              <h2
                id="appointment-info-title"
                className="text-xl font-semibold mb-4 text-[#2C6975]"
              >
                Appointment Info
              </h2>
              <p
                id="appointment-info-description"
                className="text-sm mb-2 flex flex-col gap-6"
              >
                <p className="capitalize">
                  <strong>Name:</strong> {selectedAppointment.firstname}{" "}
                  {selectedAppointment.lastname}
                </p>
                <p>
                  <strong>Email Address:</strong> {selectedAppointment.email}
                </p>
                <p className="capitalize">
                  <strong>Complaint:</strong>{" "}
                  {selectedAppointment.primaryComplaint}
                </p>
                <p className="capitalize">
                  <strong>Service Availed:</strong>{" "}
                  {selectedAppointment.appointmentType}
                </p>
                <p className="capitalize">
                  <strong>History of Intervention:</strong>{" "}
                  {selectedAppointment.historyOfIntervention !== "false"
                    ? selectedAppointment.historyOfIntervention
                    : "N/A"}
                </p>
                <p className="capitalize">
                  <strong>Preferred Schedule:</strong>{" "}
                  {new Date(selectedAppointment.date).toLocaleString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  <span> - </span>
                  {selectedAppointment.time}
                </p>
                <p className="capitalize">
                  <strong>Preferred Consultation Method:</strong>{" "}
                  {selectedAppointment.consultationMethod}
                </p>
                <p>
                  <strong>Total Payment:</strong> ₱
                  {selectedAppointment.TotalPayment}
                </p>
              </p>

              <button
                onClick={handleCloseModal}
                className="bg-[#2C6975] text-white px-4 py-2 rounded-lg mt-4"
              >
                Close
              </button>
            </>
          )}
        </div>
      </Modal>

      {/* Modal for rescheduling appointments */}

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
    </>
  );
};

// Helper component for rendering appointment cards
const AppointmentCard = ({
  appointment,
  onOpenModal,
  onOpenRescheduleModal,
  showGoToRoom,
}) => (
  <div className="bg-[#FFFFFF] p-4 rounded-lg shadow-md border-l-2 border-[#68B2AD] relative mb-4">
    <div className="flex items-center mb-2">
      <p className="ml-2 text-sm">
        {new Date(appointment.date).toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        <span> - </span>
        {appointment.time}
      </p>
      <button
        className="absolute top-4 right-4 text-[#68B2A0] hover:text-[#2c6975]"
        onClick={() => onOpenModal(appointment)}
      >
        <InfoIcon />
      </button>
    </div>
    <p className="text-sm mb-4">{appointment.appointmentType}</p>
    {showGoToRoom && appointment.consultationMethod !== "face-to-face" && (
      <div className="flex justify-end">
        <a
          href={appointment.meetLink}
          className="text-white text-center px-4 py-2 rounded-lg mt-4"
          style={{ backgroundColor: "#2C6975" }}
        >
          Go to Room
        </a>
      </div>
    )}
    {/* Conditionally render the Request Reschedule button */}

    {(appointment.status === "pending" ||
      appointment.status === "accepted") && (
      <button
        onClick={() => onOpenRescheduleModal(appointment)}
        className="bg-[#2c6975] text-white px-4 py-2 rounded-lg mt-2"
      >
        Request Reschedule
      </button>
    )}
  </div>
);

export default ActiveAppointments;
