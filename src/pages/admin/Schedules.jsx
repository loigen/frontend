import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import "../../styles/Schedules.css";
import DeleteIcon from "@mui/icons-material/Delete";
import ReminderIcon from "@mui/icons-material/Alarm"; // Import Reminder Icon

import dayjs from "dayjs";
import {
  CustomTimePicker,
  AppointmentRequest,
  LoadingSpinner,
} from "../../components/custom";
import {
  Card,
  CardContent,
  List,
  ListItem,
  Typography,
  IconButton,
  Tooltip,
  Skeleton,
} from "@mui/material";
import axios from "axios";
import { Close, InfoOutlined } from "@mui/icons-material";

const API_URL = `https://backend-vp67.onrender.com`;

const Schedules = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [freeSchedules, setFreeSchedules] = useState({});
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [freeSlots, setFreeSlots] = useState([]);

  useEffect(() => {
    const handleFetchTodaysAppointment = async () => {
      try {
        const response = await axios.get(
          `https://backend-vp67.onrender.com/Appointments/api/today`
        );
        setTodaysAppointments(response.data);
      } catch (err) {
        setError("Failed to fetch today's appointments.");
      } finally {
        setLoading(false);
      }
    };
    handleFetchTodaysAppointment();
  }, []);

  useEffect(() => {
    const fetchFreeSlots = async () => {
      try {
        const response = await axios.get(`${API_URL}/schedules/slots`);
        setFreeSlots(response.data);
      } catch (error) {
        console.error("Error fetching free slots:", error);
      }
    };

    fetchFreeSlots();

    const intervalId = setInterval(fetchFreeSlots, 1000);

    return () => clearInterval(intervalId);
  }, []);
  const handleShowDetails = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCloseDetails = () => {
    setSelectedAppointment(null);
  };

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
  const handleDeleteFreeSlot = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the selected time slot.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2c6975",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/schedules/slots/${id}`);
        setFreeSlots(freeSlots.filter((slot) => slot._id !== id));
        Swal.fire("Success", "Free time slot deleted", "success");
      } catch (error) {
        console.error("Error deleting free time slot:", error);
        Swal.fire("Error", "Failed to delete free time slot", "error");
      }
    } else {
      Swal.fire("Cancelled", "The time slot was not deleted", "info");
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = async (time) => {
    if (time) {
      if (typeof time !== "string") {
        console.error("Expected time to be a string, but got:", typeof time);
        return;
      }

      const newTimeDate = new Date(`${selectedDate.toDateString()} ${time}`);
      console.log("Constructed New Time Date:", newTimeDate);

      try {
        const response = await axios.get(
          `https://backend-vp67.onrender.com/schedules/slots/check`,
          {
            params: {
              date: selectedDate.toDateString(),
              time,
            },
          }
        );

        if (response.data.exists) {
          Swal.fire({
            icon: "warning",
            title: "Slot Already Exists",
            text: "The selected time slot already exists.",
            confirmButtonColor: "#2c6975",
          });
          return;
        }

        await axios.post(`https://backend-vp67.onrender.com/schedules/slots`, {
          date: selectedDate.toDateString(),
          time,
        });

        setFreeSchedules((prevSchedules) => {
          const dateKey = selectedDate.toDateString();
          const updatedTimes = (prevSchedules[dateKey] || []).concat(time);
          return {
            ...prevSchedules,
            [dateKey]: updatedTimes,
          };
        });

        Swal.fire({
          icon: "success",
          title: "Time Slot Added",
          text: "The time slot has been successfully added.",
          confirmButtonColor: "#2c6975",
        });
      } catch (error) {
        console.error(
          "Error adding time slot:",
          error.response?.data || error.message
        );
        Swal.fire({
          icon: "error",
          title: "Failed to Add Slot",
          text: "There was an issue processing your request. Please try again.",
          confirmButtonColor: "#2c6975",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Please make sure a time is selected.",
        confirmButtonColor: "#2c6975",
      });
    }
  };

  const tileDisabled = ({ date }) => {
    return date < today.setHours(0, 0, 0, 0);
  };

  const minDate = new Date(today.getFullYear(), today.getMonth(), 1);

  return (
    <div className="mainContainer py-16 px-6 flex flex-row gap-[2%]  h-full">
      <div className="firstBox flex flex-col w-full h-full">
        <div className="Calendar h-[100%] w-full p-[5%] bg-white rounded-lg shadow-2xl flex flex-col items-center py-12">
          <Calendar
            onClickDay={handleDateChange}
            tileDisabled={tileDisabled}
            minDetail="month"
            minDate={minDate}
            className="custom-calendar"
          />
        </div>

        <div className="upcomingAppointment w-full mt-4 bg-white p-4 shadow-2xl">
          <div className="card ">
            <h2 className="text-xl text-center uppercase font-mono">
              Today's Appointments
            </h2>
            {loading ? (
              <Skeleton />
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : (
              <ul>
                {todaysAppointments.length === 0 ? (
                  <p>No appointments for today.</p>
                ) : (
                  todaysAppointments.map((appointment, index) => (
                    <li
                      key={index}
                      className="mt-4 p-4 rounded shadow-lg list-none w-full font-poppins"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <strong className="font-normal  text-[#2c6975]">
                          <strong>{appointment.time}</strong>
                        </strong>

                        <div className="flex gap-4">
                          <IconButton
                            onClick={() => handleShowDetails(appointment)}
                            className="text-gray-600 "
                          >
                            <Tooltip title="Show Details" arrow>
                              <InfoOutlined />
                            </Tooltip>
                          </IconButton>
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

                      <p className="text-gray-700 mb-2">
                        <strong>Patient's Name:</strong> {appointment.firstname}{" "}
                        {appointment.lastname}
                      </p>

                      <p className="text-gray-700 mb-4">
                        <strong>Type:</strong> {appointment.appointmentType}
                      </p>
                      <p className="text-gray-700 mb-4">
                        <strong>Consultation Method:</strong>{" "}
                        {appointment.consultationMethod}
                      </p>
                      {appointment.consultationMethod === "face-to-face" && (
                        <>
                          <b>MeetPlace: {appointment.meetPlace}</b>
                        </>
                      )}
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
          </div>
        </div>
      </div>
      <div className="secondBox w-full h-full flex flex-col justify-start">
        <div className="bg-white rounded-lg shadow-2xl p-5">
          <p className="uppercase font-mono px-2">Enter Time</p>
          <h2 className="px-2 text-lg">{selectedDate.toDateString()}</h2>
          <CustomTimePicker
            selectedDate={selectedDate}
            initialStartTime={freeSchedules[selectedDate.toDateString()] || []}
            onTimeChange={handleTimeChange}
            showSaveButton={true}
          />
        </div>

        <Card sx={{ mt: 4, bgcolor: "white", boxShadow: 2, borderRadius: 2 }}>
          <CardContent>
            {freeSlots.length > 0 ? (
              <>
                {freeSlots.filter((slot) =>
                  dayjs(slot.date).isSame(dayjs(selectedDate), "day")
                ).length > 0 ? (
                  <List
                    sx={{
                      maxHeight: "300px",
                      overflowY: "auto",
                      overflowX: "hidden",
                    }}
                  >
                    {freeSlots
                      .filter((slot) =>
                        dayjs(slot.date).isSame(dayjs(selectedDate), "day")
                      )
                      .map((slot) => (
                        <ListItem
                          key={slot._id}
                          sx={{
                            mb: 2,
                            display: "flex",
                            justifyContent: "space-between",
                            p: 2,
                            border: "1px solid #ddd",
                            borderRadius: 1,
                          }}
                        >
                          <Typography sx={{ flexGrow: 1 }}>
                            {dayjs(slot.date).format("YYYY-MM-DD")} at{" "}
                            {slot.time}
                          </Typography>
                          <IconButton
                            onClick={() => handleDeleteFreeSlot(slot._id)}
                            sx={{ color: "#2c6975", ml: 2 }}
                          >
                            <Tooltip title="Delete Time Slot" arrow>
                              <DeleteIcon />
                            </Tooltip>
                          </IconButton>
                        </ListItem>
                      ))}
                  </List>
                ) : (
                  <Typography
                    color="textSecondary"
                    align="center"
                    sx={{ p: 2 }}
                  >
                    No free slots available for {selectedDate.toDateString()}.
                  </Typography>
                )}
              </>
            ) : (
              <Typography color="textSecondary" align="center" sx={{ p: 2 }}>
                No free slots today
              </Typography>
            )}
          </CardContent>
        </Card>
      </div>
      <AppointmentRequest />
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
                {selectedAppointment.firstname} {selectedAppointment.middleName}{" "}
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
                <strong className="font-bold">History of Intervention:</strong>{" "}
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
                <strong className="font-bold">Consultation Method:</strong>{" "}
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
                          console.error("Error downloading receipt:", error);
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
  );
};

export default Schedules;
