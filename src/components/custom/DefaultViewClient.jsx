import React, { useState, useEffect } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { useAuth } from "../../context/AuthProvider";
import { fetchAppointmentsByUserId } from "../../api/appointmentAPI/fetchAppointmentsByUserId";

const ActiveAppointments = () => {
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
        const data = await fetchAppointmentsByUserId((user._id));
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
    <>
      {/* Active Appointment Today */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {/* Header */}
        <h3 className="text-md font-semibold mb-4 text-[#2C6975]">
          Active Appointment Today
        </h3>

        {/* Appointment Information */}
        <div className="bg-[#FFFFFF] p-4 rounded-lg shadow-md border-l-2 border-[#68B2AD] relative">
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
            <p className="ml-2 text-sm">Saturday 14 September 2024 (9:00 AM)</p>
            <div className="justify-end">
              {/* Info icon positioned at the top-right */}
              <button className="absolute top-4 right-4 text-[#68B2A0] hover:text-[#2c6975]">
                <InfoIcon />
              </button>
            </div>

            
          </div>

          <p className="text-sm mb-4">Individual Counseling</p>

          {/* Button positioned at the bottom right */}
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
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#358898")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#2C6975")}
            >
              Go to room
            </button>
          </div>
        </div>
      </div>

      {/* Pending Appointments */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-md font-semibold mb-4 text-[#2C6975]">
          Pending Appointments
        </h3>
        <div className="bg-[#FFFFFF] p-4 rounded-lg shadow-md border-l-2 border-[#68B2AD] relative">
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
            <p className="ml-2 text-sm">Saturday 14 September 2024 (9:00 AM)</p>
            <div className="justify-end">
              {/* Info icon positioned at the top-right */}
              <button className="absolute top-4 right-4 text-[#68B2A0] hover:text-[#2c6975]">
                <InfoIcon />
              </button>
            </div>
          </div>
          <p className="text-sm mb-4">Individual Counseling</p>
          {/* Button positioned at the bottom right */}
          <div className="flex justify-end">
            <button
              className="text-white px-4 py-2 rounded-lg mt-4"
              style={{
                backgroundColor: "transparent",
                borderRadius: "20px",
                borderStyle: "solid",
                borderColor: "#2C6975",
                color: "#2C6975",
                borderWidth: "1px", // Set border size to 2px
                width: "auto",
                height: "40px",
                padding: "0 20px",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "rgba(44, 105, 117, 0.13)")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              Reschedule
            </button>
          </div>
        </div>
      </div>

      {/* Pending Request */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-md font-semibold mb-4 text-[#2C6975]">
          Pending Request
        </h3>
        <div className="bg-[#FFFFFF] p-4 rounded-lg shadow-md border-l-2 border-[#68B2AD] relative">
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
            <p className="ml-2 text-sm">Saturday 14 September 2024 (9:00 AM)</p>
            <div className="justify-end">
              {/* Info icon positioned at the top-right */}
              <button className="absolute top-4 right-4 text-[#68B2A0] hover:text-[#2c6975]">
                <InfoIcon />
              </button>
            </div>
          </div>
          <p className="text-sm mb-4">Individual Counseling</p>

          {/* Button positioned at the bottom right */}
          <div className="flex justify-end space-x-2">
            <button
              className="text-white px-4 py-2 rounded-lg mt-4"
              style={{
                backgroundColor: "transparent",
                borderRadius: "20px",
                borderStyle: "solid",
                borderColor: "#2C6975",
                color: "#2C6975",
                borderWidth: "1px", // Set border size to 2px
                width: "auto",
                height: "40px",
                padding: "0 20px",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "rgba(44, 105, 117, 0.13)")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              Cancel
            </button>
            <button
              className="text-white px-4 py-2 rounded-lg mt-4"
              style={{
                backgroundColor: "transparent",
                borderRadius: "20px",
                borderStyle: "solid",
                borderColor: "#2C6975",
                color: "#2C6975",
                borderWidth: "1px", // Set border size to 2px
                width: "auto",
                height: "40px",
                padding: "0 20px",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "rgba(44, 105, 117, 0.13)")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
            >
              Reschedule
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActiveAppointments;
