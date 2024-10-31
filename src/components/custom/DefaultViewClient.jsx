import React, { useState, useEffect } from "react";
import InfoIcon from "@mui/icons-material/Info";
import Modal from "@mui/material/Modal";
import LoadingSpinner from "./LoadingSpinner";
import { useAuth } from "../../context/AuthProvider";
import { fetchAppointmentsByUserId } from "../../api/appointmentAPI/fetchAppointmentsByUserId";
import { reqRescheduleAppointment } from "../../api/appointmentAPI/reqReschedule";

const ActiveAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const { user } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");

  useEffect(() => {
    const getAppointments = async () => {
      if (!user) return;

      try {
        const data = await fetchAppointmentsByUserId(user._id);
        setAppointments(data); // Store all appointments
      } catch (err) {
        setError("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    getAppointments();
  }, [user]);

  const handleOpenModal = (appointment) => {
    setSelectedAppointment(appointment);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedAppointment(null);
  };

  const openRescheduleModal = (appointment) => {
    setSelectedAppointment(appointment);
    setRescheduleModalOpen(true);
  };

  const closeRescheduleModal = () => {
    setRescheduleModalOpen(false);
    setSelectedAppointment(null);
    setRescheduleDate("");
    setRescheduleTime("");
  };

  const handleRescheduleAppointment = async () => {
    if (!selectedAppointment || !rescheduleDate || !rescheduleTime) return;

    try {
      await reqRescheduleAppointment(
        selectedAppointment._id,
        rescheduleDate,
        rescheduleTime
      );
      closeRescheduleModal();
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  const acceptedAppointments = appointments.filter(
    (appointment) => appointment.status === "accepted"
  );
  const rescheduledAppointments = appointments.filter(
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <p id="appointment-info-description" className="text-sm mb-2">
                <strong>Date:</strong>{" "}
                {new Date(selectedAppointment.date).toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </p>
              <p className="text-sm mb-2">
                <strong>Service Type:</strong> {selectedAppointment.serviceType}
              </p>
              <p className="text-sm mb-2">
                <strong>Status:</strong> {selectedAppointment.status}
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
      <Modal
        open={isRescheduleModalOpen}
        onClose={closeRescheduleModal}
        aria-labelledby="reschedule-appointment-title"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
          <h2
            id="reschedule-appointment-title"
            className="text-xl font-semibold mb-4"
          >
            Request Reschedule Appointment
          </h2>
          <input
            type="date"
            value={rescheduleDate}
            onChange={(e) => setRescheduleDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]} // Set min to today's date
            className="border p-2 mb-4 w-full"
          />

          <input
            type="time"
            value={rescheduleTime}
            onChange={(e) => setRescheduleTime(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
          <div className="flex flex-row gap-2">
            <button
              onClick={handleRescheduleAppointment}
              className="bg-[#2C6975] text-white px-4 py-2 rounded-lg mt-4"
            >
              Confirm Request
            </button>
            <button
              onClick={closeRescheduleModal}
              className="text-gray-500 px-4 py-2 mt-4  border rounded-lg border-[#2C6975]"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
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
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}
      </p>
      <button
        className="absolute top-4 right-4 text-[#68B2A0] hover:text-[#2c6975]"
        onClick={() => onOpenModal(appointment)}
      >
        <InfoIcon />
      </button>
    </div>
    <p className="text-sm mb-4">{appointment.serviceType}</p>
    {showGoToRoom && (
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
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
      >
        Request Reschedule
      </button>
    )}
  </div>
);

export default ActiveAppointments;
