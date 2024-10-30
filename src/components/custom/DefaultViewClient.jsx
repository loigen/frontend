import React, { useState, useEffect } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { useAuth } from "../../context/AuthProvider";
import { fetchAppointmentsByUserId } from "../../api/appointmentAPI/fetchAppointmentsByUserId";
import Modal from "@mui/material/Modal";
import LoadingSpinner from "./LoadingSpinner";

const ActiveAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const { user } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const getAppointments = async () => {
      if (!user) return;

      try {
        const data = await fetchAppointmentsByUserId(user._id);
        setAppointments(data); // Store all appointments
      } catch (err) {
        setError(null);
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

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  // Filter appointments by status
  const acceptedAppointments = appointments.filter(
    (appointment) => appointment.status === "accepted"
  );
  const rescheduledAppointments = appointments.filter(
    (appointment) => appointment.status === "rescheduled"
  );
  const requestedRescheduledAppointments = appointments.filter(
    (appointment) => appointment.status === "requestedReschedule"
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
                showGoToRoom={true}
              />
            ))}
          </div>
        ) : (
          <p>No active appointments for today.</p>
        )}
      </div>

      {/* Rescheduled Appointments */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
        <h3 className="text-md font-semibold mb-4 text-[#2C6975]">
          Rescheduled Appointments
        </h3>
        {rescheduledAppointments.length > 0 ? (
          <div className="grid  gap-4">
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
          <div className="grid  gap-4">
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
                showGoToRoom={false}
              />
            ))}
          </div>
        ) : (
          <p>No pending appointments</p>
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
    </>
  );
};

// Helper component for rendering appointment cards
const AppointmentCard = ({ appointment, onOpenModal, showGoToRoom }) => (
  <div
    key={appointment._id}
    className="bg-[#FFFFFF] p-4 rounded-lg shadow-md border-l-2 border-[#68B2AD] relative mb-4"
  >
    <div className="flex items-center mb-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-teal-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 7V3m8 4V3m-9 8h10m-2 4h2a2 2 0 001.95-1.75L21 12a9 9 0 10-18 0v1a2 2 0 002 2h2m0 4h8m-2 4h-4m0-4h4v-2a2 2 0 00-2-2h-4a2 2 0 00-2 2v2z"
        />
      </svg>
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
      <div className="justify-end">
        <button
          className="absolute top-4 right-4 text-[#68B2A0] hover:text-[#2c6975]"
          onClick={() => onOpenModal(appointment)}
        >
          <InfoIcon />
        </button>
      </div>
    </div>
    <p className="text-sm mb-4">{appointment.serviceType}</p>
    {showGoToRoom && (
      <div className="flex justify-end">
        <a
          href={appointment.meetLink}
          className="text-white text-center px-4 py-2 rounded-lg mt-4"
          style={{
            backgroundColor: "#2C6975",
            borderRadius: "20px",
            width: "auto",
            padding: "10px 20px",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#358898")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#2C6975")}
        >
          Go to Room
        </a>
      </div>
    )}
  </div>
);

export default ActiveAppointments;
