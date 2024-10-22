import React, { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import EqualizerOutlinedIcon from "@mui/icons-material/EqualizerOutlined";
import InfoIcon from "@mui/icons-material/Info";

import CancelIcon from "@mui/icons-material/Cancel";
import "../../styles/Home.css";

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
              <div className="text-center flex justify-center items-center text-gray-500 p-10 h-full w-full font-poppins">
                Loading...
              </div>
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
                        <button
                          onClick={() => handleShowDetails(appointment)}
                          className="text-gray-400 hover:text-[#2c6975] mr-2"
                        >
                          <InfoIcon />
                        </button>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 mt-2">
                        <p className="uppercase font-semibold text-[#54595E]">
                          {appointment.firstname} {appointment.lastname}
                        </p>
                      </div>
                      <p className="mt-2 text-gray-700 capitalize">
                        {appointment.appointmentType}
                      </p>

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
                    </li>
                  ))
                )}
              </ul>
            )}

            {selectedAppointment && (
              <div
                className="fixed inset-0 flex justify-center items-center z-50"
                style={{ backgroundColor: "rgba(233, 241, 239, 0.83)" }}
                onClick={handleCloseDetails}
              >
                <div
                  className="bg-white rounded-lg p-6 max-w-lg mx-4 w-full sm:w-11/12 md:w-3/4 lg:w-1/2 shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                    Appointment Details
                  </h2>
                  <p className="mb-2">
                    <strong className="text-gray-700">Date:</strong>{" "}
                    {new Date(selectedAppointment.date).toLocaleDateString()}
                  </p>
                  <p className="mb-2">
                    <strong className="text-gray-700">Time:</strong>{" "}
                    {selectedAppointment.time}
                  </p>
                  <p className="mb-2">
                    <strong className="text-gray-700">Type:</strong>{" "}
                    {selectedAppointment.appointmentType}
                  </p>
                  <p className="mb-2">
                    <strong className="text-gray-700">Firstname:</strong>{" "}
                    {selectedAppointment.firstname}
                  </p>
                  <p className="mb-2">
                    <strong className="text-gray-700">Lastname:</strong>{" "}
                    {selectedAppointment.lastname}
                  </p>
                  <p className="mb-2">
                    <strong className="text-gray-700">Email:</strong>{" "}
                    {selectedAppointment.email}
                  </p>
                  <p className="mb-4">
                    <strong className="text-gray-700">Role:</strong>{" "}
                    {selectedAppointment.role}
                  </p>
                  <div className="mb-4">
                    <strong className="text-gray-700">Receipt:</strong>
                    {selectedAppointment.receipt ? (
                      <div className="mt-2 border border-gray-300 rounded-lg overflow-hidden">
                        <img
                          src={selectedAppointment.receipt}
                          alt="Receipt"
                          className="w-full h-auto"
                        />
                        <div className="mt-2 flex space-x-2">
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
                            className="inline-flex items-center bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition-colors"
                          >
                            Download Receipt
                          </button>
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-500">
                        No receipt available
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleCloseDetails}
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
                  >
                    Close Details
                  </button>
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

