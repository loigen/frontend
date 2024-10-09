import React, { useState, useEffect } from "react";
import { fetchAppointmentsByUserId } from "../../api/appointmentAPI/fetchAppointmentsByUserId";
import { useAuth } from "../../context/AuthProvider";
import Reschedule from "./Reschedule";

const Appointments = () => {
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

        const today = new Date().setHours(0, 0, 0, 0);

        const filteredAppointments = data.filter((appointment) => {
          const appointmentDate = new Date(appointment.date).setHours(
            0,
            0,
            0,
            0
          );
          console.log("Filtering Appointment:", {
            date: appointmentDate,
            status: appointment.status,
            isValidDate: appointmentDate >= today,
            isValidStatus:
              appointment.status === "pending" ||
              appointment.status === "accepted",
          });

          return (
            appointment.status === "pending" ||
            appointment.status === "accepted"
          );
        });

        console.log("Filtered Appointments:", filteredAppointments);

        const sortedAppointments = filteredAppointments.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });

        console.log("Sorted Appointments:", sortedAppointments);

        setAppointments(sortedAppointments);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    getAppointments();
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full shadow-2xl h-full p-5 flex flex-col gap-5 bg-white rounded-lg">
      <h2 className="font-bold font-mono text-gray-500 text-lg">
        My Appointments
      </h2>
      <div className="w-full">
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <ul className="flex flex-col gap-5 w-full">
            {appointments.map((appointment) => {
              const statusBgColor =
                appointment.status === "pending"
                  ? "bg-orange-500"
                  : appointment.status === "rescheduled"
                  ? "bg-yellow-500" // You can customize the color for "rescheduled" if desired
                  : "bg-[#2C6975]";

              return (
                <li
                  key={appointment._id}
                  style={{ borderLeft: "5px solid #2C6975" }}
                  className="shadow-2xl w-full rounded-md p-2"
                >
                  <div className="w-full flex justify-end">
                    <p className={`p-1 text-slate-50 rounded ${statusBgColor}`}>
                      {appointment.status}
                    </p>
                  </div>
                  <div className="capitalize">
                    {appointment.appointmentType}
                  </div>
                  <div className="flex flex-row gap-2">
                    <p>{new Date(appointment.date).toLocaleDateString()},</p>
                    {appointment.time}
                  </div>
                  {appointment.meetLink && (
                    <div className="flex justify-end">
                      <a
                        className="bg-[#2C6975] text-white py-2 px-5 font-bold rounded-md"
                        href={appointment.meetLink}
                      >
                        Go to Room
                      </a>
                    </div>
                  )}

                  {/* Add Reschedule Button conditionally */}
                  {(appointment.status === "rescheduled" ||
                    appointment.status === "accepted") && (
                    <div className="flex justify-end mt-3">
                      <button
                        className="bg-blue-500 text-white py-2 px-5 rounded-md"
                        onClick={() => handleOpenReschedule(appointment._id)}
                      >
                        Reschedule
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
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
