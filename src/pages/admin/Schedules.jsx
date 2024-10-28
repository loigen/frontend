import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import "../../styles/Schedules.css";
import DeleteIcon from "@mui/icons-material/Delete";
import ReminderIcon from "@mui/icons-material/Alarm"; // Import Reminder Icon

import dayjs from "dayjs";
import { CustomTimePicker, AppointmentRequest } from "../../components/custom";
import {
  Card,
  CardContent,
  List,
  ListItem,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { InfoOutlined } from "@mui/icons-material";

const API_URL = `https://backend-production-c8da.up.railway.app`;

const Schedules = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [freeSchedules, setFreeSchedules] = useState({});
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [freeSlots, setFreeSlots] = useState([]);

  useEffect(() => {
    const handleFetchTodaysAppointment = async () => {
      try {
        const response = await axios.get(
          `https://backend-production-c8da.up.railway.app/Appointments/api/today`
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
    Swal.fire({
      title: "Appointment Details",
      html: `
        <strong>Date:</strong> ${appointment.date}<br>
        <strong>Time:</strong> ${appointment.time}<br>
        <strong>Patient:</strong> ${appointment.firstname} ${appointment.lastname}<br>
        <strong>Type:</strong> ${appointment.appointmentType}
      `,
      icon: "info",
      confirmButtonColor: "#2c6975",
    });
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
          `https://backend-production-c8da.up.railway.app/schedules/slots/check`,
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

        await axios.post(
          `https://backend-production-c8da.up.railway.app/schedules/slots`,
          {
            date: selectedDate.toDateString(),
            time,
          }
        );

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

        <div className="upcomingAppointment mt-4 p-4 shadow-2xl rounded-lg flex justify-center items-center">
          <div className="card flex flex-col justify-center items-center ">
            <h2 className="text-xl font-bold uppercase font-mono ">
              Today's Appointments
            </h2>
            {loading ? (
              <p>Loading...</p>
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
                      className="flex flex-col rounded-lg shadow-lg bg-white p-6 "
                    >
                      <div className="flex justify-between items-center mb-4">
                        <strong className="text-xl text-gray-800">
                          {appointment.time}
                        </strong>

                        <div className="flex gap-4">
                          <IconButton
                            onClick={() => handleRemind(appointment._id)}
                            className="flex items-center bg-blue-500 text-white rounded-md px-3 py-2 transition-colors hover:bg-blue-600"
                          >
                            <Tooltip title="Send Reminder" arrow>
                              <ReminderIcon />
                            </Tooltip>
                          </IconButton>
                          <IconButton
                            onClick={() => handleShowDetails(appointment)}
                            className="text-gray-600 hover:text-blue-500"
                          >
                            <Tooltip title="Show Details" arrow>
                              <InfoOutlined />
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
    </div>
  );
};

export default Schedules;
