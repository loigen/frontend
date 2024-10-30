import React, { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import EqualizerOutlinedIcon from "@mui/icons-material/EqualizerOutlined";
import InfoIcon from "@mui/icons-material/Info";
import ReminderIcon from "@mui/icons-material/Alarm"; // Import Reminder Icon
import Swal from "sweetalert2";
import axios from "axios";

import CancelIcon from "@mui/icons-material/Cancel";
import "../../styles/Home.css";
import { IconButton, Tooltip } from "@mui/material";
import {
  WorkloadChart,
  AppointmentRequest,
  AvailabilityCard,
  LoadingSpinner,
  HighestWeeklyAppointments,
} from "../../components/custom";
import {
  countFreeSlots,
  countPendingSlots,
} from "../../api/appointmentAPI/countFreeAndPendingSlots";
import { fetchTodaysAppointments } from "../../api/appointmentAPI/fetchTodayAppointments";
import { fetchUserCount } from "../../api/appointmentAPI/fetchUserCount";
import { fetchCancellationRate } from "../../api/appointmentAPI/fetchCancellationRate";
import { fetchCompletionRate } from "../../api/appointmentAPI/fetchCompletionRate";
import { Close } from "@mui/icons-material";
const API_URL = `https://backend-production-c8da.up.railway.app`;

const Home = () => {
  const [userCount, setUserCount] = useState(0);
  const [cancellationRate, setCancellationRate] = useState(null);
  const [completionRate, setCompletionRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [freeSlotCount, setFreeSlotCount] = useState(0);
  const [pendingSlotCount, setpendingSlotCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleShowDetails = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCloseDetails = () => {
    setSelectedAppointment(null);
  };

  useEffect(() => {
    const fetchFreeSlots = async () => {
      try {
        const count = await countFreeSlots();
        setFreeSlotCount(count);
      } catch (error) {
        console.error("Error fetching free slots:", error);
      }
    };

    fetchFreeSlots();
  }, []);

  useEffect(() => {
    const fetchPendingSlots = async () => {
      try {
        const count = await countPendingSlots();
        setpendingSlotCount(count);
      } catch (error) {
        console.error("Error fetching pending slots:", error);
      }
    };

    fetchPendingSlots();
  }, []);

  useEffect(() => {
    const handleFetchTodaysAppointment = async () => {
      try {
        const appointments = await fetchTodaysAppointments();
        setTodaysAppointments(appointments);
      } catch (err) {
        setError("Failed to fetch today's appointments.");
      } finally {
        setLoading(false);
      }
    };
    handleFetchTodaysAppointment();
  }, []);

  useEffect(() => {
    const handleFetchUserCount = async () => {
      try {
        const count = await fetchUserCount();
        setUserCount(count);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    handleFetchUserCount();
  }, []);

  useEffect(() => {
    const handleFetchCancellationRate = async () => {
      try {
        const rate = await fetchCancellationRate();
        setCancellationRate(rate);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cancellation rate:", error);
        setLoading(false);
      }
    };

    handleFetchCancellationRate();
  }, []);

  useEffect(() => {
    const handlefetchCompletionRate = async () => {
      try {
        const rate = await fetchCompletionRate();
        console.log(rate);
        setCompletionRate(rate);
      } catch (error) {
        console.error("Error fetching completion rate:", error);
      } finally {
        setLoading(false);
      }
    };

    handlefetchCompletionRate();
  }, []);
  const handleRemind = async (appointmentId) => {
    try {
      const response = await axios.post(
        `${API_URL}/Appointments/api/remind/${appointmentId}`
      );
      Swal.fire("Success", response.data.message, "success");
    } catch (error) {
      console.error("Error sending reminder:", error);
      Swal.fire("Error", "Failed to send reminder", "error");
    }
  };
  return (
    <>
      <div className="min-h-screen w-full h-full pt-16 pr-14 pl-14 pb-14">
        {/* Top Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <div className="w-full max-w-[333px] h-[119px] bg-[#FFFFFF] p-4 rounded-lg flex items-center justify-center shadow-lg">
            <div className="relative w-16 h-16 rounded overflow-hidden">
              <PersonIcon
                sx={{
                  color: "#2C6975",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "45px",
                  backgroundColor: "rgba(164, 205, 195, 0.27)",
                  padding: "4px",
                  borderRadius: "3px",
                }}
              />
            </div>

            <div className="flex flex-col items-start justify-center ml-4">
              <b className="flex items-center justify-center h-full w-fit text-left text-1xl font-poppins">
                {userCount}
              </b>
              <p className="text-sm capitalize font-poppins">patients</p>
            </div>
          </div>

          <div className="w-full max-w-[333px] h-[119px] bg-[#FFFFFF] p-4 rounded-lg flex items-center justify-center shadow-lg">
            <HighestWeeklyAppointments />
          </div>

          <div className="w-full max-w-[333px] h-[119px] bg-[#FFFFFF] p-4 rounded-lg flex items-center justify-center shadow-lg">
            <div className="relative w-16 h-16 rounded overflow-hidden text-[#2C6975]">
              <EqualizerOutlinedIcon
                sx={{
                  color: "#2C6975",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "45px",
                  backgroundColor: "rgba(164, 205, 195, 0.27)",
                  padding: "4px",
                  borderRadius: "3px",
                }}
              />
            </div>
            <div className="flex flex-col items-start justify-center ml-4">
              {loading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <b className="flex items-center justify-center h-full w-fit text-left text-1xl font-poppins">
                    {completionRate}
                  </b>
                  <p className="text-sm capitalize font-poppins">
                    Conversion Rate
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="w-full max-w-[333px] h-[119px] bg-[#FFFFFF] p-4 rounded-lg flex items-center justify-center shadow-lg">
            <div className="relative w-16 h-16 rounded overflow-hidden text-[#2C6975]">
              <CancelIcon
                sx={{
                  color: "#9D5E5A",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "45px",
                  backgroundColor: "rgba(157, 94, 90, 0.27)",
                  padding: "4px",
                  borderRadius: "3px",
                }}
              />
            </div>

            <div className="flex flex-col items-start justify-center ml-4">
              {loading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <strong>
                    <p className="flex items-center justify-center h-full w-fit text-left text-1xl font-poppins">
                      {cancellationRate}
                    </p>
                  </strong>
                  <p className="text-sm capitalize font-poppins">
                    Cancellation Rate
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 md:grid-cols-2">
          {/* Workload Chart */}
          <div className="bg-white rounded-lg shadow-md p-6 col-span-1 sm:col-span-2 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Workload</h3>
            <div className="h-fit bg-gray-100 rounded-lg">
              <WorkloadChart />
            </div>
          </div>

          {/* Availability and Appointments */}
          <div className="bg-white rounded-lg shadow-md p-6 col-span-1 md:col-span-2 w-full">
            <div className="flex justify-center items-center w-full">
              <div className="w-full bg-white rounded-lg shadow-2xl">
                <AvailabilityCard
                  availableSlots={freeSlotCount}
                  totalSlots={pendingSlotCount}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Request and Today's Appointment */}
        <div className="flex flex-col xl:flex-row  p-4 gap-4">
          {/* Appointment Request */}
          <div className="bg-white rounded-lg shadow-md p-6 w-full">
            <h3
              className="text-lg font-semibold mb-4 font-poppins"
              style={{ color: "rgba(0,0,0,0.78)" }}
            >
              Appointment Request
            </h3>
            <div className="p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center">
              <AppointmentRequest />
            </div>
          </div>

          {/* Today's Appointment */}
          <div className="thirdBox w-full mt-4 bg-white p-4 shadow-2xl">
            <h2
              className="text-xl text-center uppercase font-mono"
              style={{ color: "rgba(0,0,0,0.78)" }}
            >
              Today's Appointments
            </h2>

            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <div className="text-center flex justify-center items-center text-red-500 p-10 h-full w-full font-poppins">
                {error}
              </div>
            ) : (
              <ul className="list-disc pl-5 mt-4">
                {todaysAppointments.length === 0 ? (
                  <div className="text-center flex justify-center items-center text-gray-500 p-10 h-full w-full font-poppins">
                    No appointments for today.
                  </div>
                ) : (
                  todaysAppointments.map((appointment, index) => (
                    <li
                      key={index}
                      className="mt-4 p-4 rounded shadow-lg list-none w-full font-poppins"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <span className="text-[#2c6975] font-normal font-poppins">
                          <strong>{appointment.time}</strong>
                        </span>
                        <div>
                          <button
                            onClick={() => handleShowDetails(appointment)}
                            className="text-gray-400 hover:text-[#2c6975] mr-2"
                          >
                            <Tooltip title="Show Details" arrow>
                              {" "}
                              <InfoIcon />
                            </Tooltip>
                          </button>
                          <IconButton
                            onClick={() => handleRemind(appointment._id)}
                            className="flex items-center bg-blue-500 text-white rounded-md px-3 py-2 transition-colors hover:bg-blue-600"
                          >
                            <Tooltip title="Send Reminder" arrow>
                              <ReminderIcon />
                            </Tooltip>
                          </IconButton>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 mt-2">
                        <p className="uppercase font-semibold text-[#54595E]">
                          {appointment.firstname} {appointment.lastname}
                        </p>
                      </div>
                      <p className="mt-2 text-gray-700 capitalize">
                        {appointment.appointmentType}
                      </p>

                      {appointment.consultationMethod !== "face-to-face" && (
                        <>
                          <div
                            className="mt-4 flex justify-end items-center font-poppins"
                            style={{ height: "40px" }}
                          >
                            <a
                              href={appointment.meetLink}
                              className="text-white font-semibold shadow-md transition-colors text-center flex items-center justify-center"
                              style={{
                                backgroundColor: "#2C6975",
                                borderRadius: "20px",
                                width: "auto",
                                height: "40px",
                                padding: "0 20px", // Adjust the horizontal padding here
                              }}
                              onMouseEnter={(e) =>
                                (e.target.style.backgroundColor = "#358898")
                              }
                              onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = "#2C6975")
                              }
                            >
                              Go to room
                            </a>
                          </div>
                        </>
                      )}
                    </li>
                  ))
                )}
              </ul>
            )}

            {selectedAppointment && (
              <div
                className="fixed inset-0 flex justify-center items-center z-50 p-4 sm:p-6 md:p-8 lg:p-12"
                style={{ backgroundColor: "rgba(233, 241, 239, 0.83)" }}
                onClick={handleCloseDetails}
              >
                <div
                  className="bg-white relative flex flex-col md:flex-row gap-4 p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg shadow-lg max-w-full md:max-w-3xl w-full md:w-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={handleCloseDetails}
                    className="bg-gray-500 absolute right-4 top-4 text-white font-semibold py-1 px-2 rounded-full shadow-md hover:bg-gray-600 transition-colors"
                  >
                    <Close />
                  </button>

                  <div className="text-[#2c6975] flex flex-col gap-4 w-full">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 border-b pb-2">
                      Appointment Details
                    </h2>

                    <div className="capitalize">
                      <strong className="font-bold">Full Name:</strong>{" "}
                      {selectedAppointment.firstname}{" "}
                      {selectedAppointment.middleName}{" "}
                      {selectedAppointment.lastname}{" "}
                    </div>

                    <p className="mb-2">
                      <strong className="font-bold">Email:</strong>{" "}
                      {selectedAppointment.email}
                    </p>

                    <p className="mb-2">
                      <strong className="font-bold">Appointment Date:</strong>{" "}
                      {new Date(selectedAppointment.date).toLocaleDateString()}
                    </p>

                    <p className="mb-2">
                      <strong className="font-bold">Time:</strong>{" "}
                      {selectedAppointment.time}
                    </p>

                    <p className="mb-2">
                      <strong className="font-bold">Primary Complaint:</strong>{" "}
                      {selectedAppointment.primaryComplaint}
                    </p>

                    <p className="mb-2">
                      <strong className="font-bold">Service Availed:</strong>{" "}
                      {selectedAppointment.appointmentType}
                    </p>

                    <p className="mb-2">
                      <strong className="font-bold">
                        History of Intervention:
                      </strong>{" "}
                      {selectedAppointment.historyOfIntervention !== "false"
                        ? selectedAppointment.historyOfIntervention
                        : "None"}
                    </p>

                    {selectedAppointment.briefDetails ? (
                      <p className="mb-2">
                        <strong className="font-bold">Brief Details:</strong>{" "}
                        {selectedAppointment.briefDetails}
                      </p>
                    ) : null}

                    <p className="mb-2">
                      <strong className="font-bold">
                        Consultation Method:
                      </strong>{" "}
                      {selectedAppointment.consultationMethod}
                    </p>
                  </div>

                  <div className="mt-4 w-full">
                    {selectedAppointment.receipt ? (
                      <div className="mt-2 border border-gray-300 rounded-lg overflow-hidden">
                        <img
                          src={selectedAppointment.receipt}
                          alt="Receipt"
                          className="w-full h-auto object-contain"
                        />
                        <div className="mt-2 space-x-2 flex items-center justify-center">
                          <button
                            onClick={async () => {
                              try {
                                const response = await fetch(
                                  selectedAppointment.receipt
                                );
                                if (response.ok) {
                                  const blob = await response.blob();
                                  const url = URL.createObjectURL(blob);
                                  const link = document.createElement("a");
                                  link.href = url;
                                  link.download = "receipt.jpg";
                                  document.body.appendChild(link);
                                  link.click();
                                  document.body.removeChild(link);
                                  URL.revokeObjectURL(url);
                                } else {
                                  console.error("Failed to fetch receipt");
                                }
                              } catch (error) {
                                console.error(
                                  "Error downloading receipt:",
                                  error
                                );
                              }
                            }}
                            className="inline-flex items-center underline text-blue-500"
                          >
                            Download Receipt
                          </button>
                        </div>
                      </div>
                    ) : (
                      <span className="font-bold">No receipt available</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
