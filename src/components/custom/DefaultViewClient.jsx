import React, { useState, useEffect } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { useAuth } from "../../context/AuthProvider";
import { fetchAppointmentsByUserId } from "../../api/appointmentAPI/fetchAppointmentsByUserId";

const ActiveAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const getAppointments = async () => {
      if (!user) return;

      try {
        const data = await fetchAppointmentsByUserId(user._id);
        const today = new Date().setHours(0, 0, 0, 0); // Set today's date to midnight for comparison

        // Filter for accepted appointments that are scheduled for today
        const filteredAppointments = data.filter((appointment) => {
          const appointmentDate = new Date(appointment.date).setHours(
            0,
            0,
            0,
            0
          );
          return appointment.status === "accepted" && appointmentDate === today; // Only include today's accepted appointments
        });

        setAppointments(filteredAppointments); // Store the filtered appointments
      } catch (err) {
        setError("Failed to load appointments"); // Handle API error
      } finally {
        setLoading(false); // Update loading state
      }
    };

    getAppointments();
  }, [user]);

  if (loading) return <div>Loading...</div>; // Loading state
  if (error) return <div>Error: {error}</div>; // Error state

  return (
    <>
      {/* Today's Active Appointments */}
      {appointments.length > 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-md font-semibold mb-4 text-[#2C6975]">
            Today's Active Appointments
          </h3>
          {appointments.map((appointment) => (
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
                  <button className="absolute top-4 right-4 text-[#68B2A0] hover:text-[#2c6975]">
                    <InfoIcon />
                  </button>
                </div>
              </div>
              <p className="text-sm mb-4">{appointment.serviceType}</p>
              <div className="flex justify-end">
                <button
                  className="text-white px-4 py-2 rounded-lg mt-4"
                  style={{
                    backgroundColor: "#2C6975",
                    borderRadius: "20px",
                    width: "auto",
                    height: "40px",
                    padding: "0 20px",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#358898")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#2C6975")
                  }
                >
                  Go to room
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-md font-semibold mb-4 text-[#2C6975]">
            Today's Active Appointments
          </h3>
          <p>No active appointments for today.</p>
        </div>
      )}
    </>
  );
};

export default ActiveAppointments;
