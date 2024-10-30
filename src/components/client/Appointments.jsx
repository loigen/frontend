import React, { useState, useEffect } from "react";
import { fetchAppointmentsByUserId } from "../../api/appointmentAPI/fetchAppointmentsByUserId";
import { useAuth } from "../../context/AuthProvider";
import Reschedule from "./Reschedule";
import { LoadingSpinner } from "../custom";

const Appointments = ({ onBack }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [openReschedule, setOpenReschedule] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  const handleOpenReschedule = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setOpenReschedule(true);
  };

  const handleCloseReschedule = () => {
    setOpenReschedule(false);
    setSelectedAppointmentId(null);
  };

  useEffect(() => {
    const getAppointments = async () => {
      if (!user) return;

      try {
        const data = await fetchAppointmentsByUserId(user._id);
        console.log("API Response:", data);

        const filteredAppointments = data.filter((appointment) => {
          return appointment.status === "accepted"; // Only fetch accepted appointments
        });

        console.log("Filtered Appointments:", filteredAppointments);

        setAppointments(filteredAppointments);
      } catch (err) {
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    getAppointments();
  }, [user]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      {/* Back Button */}
      <div className="mb-6">
        <button
          className="text-[#2C6975] flex items-center"
          onClick={onBack} // Call the back function passed as prop
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
        Accepted Appointments
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Type of Service</th>
              <th className="p-4 font-semibold">Consultation Method</th>
              <th className="p-4 font-semibold">Receipt</th>{" "}
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No accepted appointments found.
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
                    {appointment.receipt ? (
                      <a
                        href={appointment.receipt}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View Receipt
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      className="text-gray-500"
                      onClick={() => handleOpenReschedule(appointment._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 12h12M6 12l-3 3m3-3l-3-3"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Reschedule Modal */}
      {selectedAppointmentId && (
        <Reschedule
          appointmentId={selectedAppointmentId}
          open={openReschedule}
          onClose={handleCloseReschedule}
        />
      )}
    </div>
  );
};

export default Appointments;
