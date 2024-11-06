import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import CustomTimePicker from "../custom/CustomTimePicker";
import Swal from "sweetalert2";
import { reqRescheduleAppointment } from "../../api/appointmentAPI/reqReschedule";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { format } from "date-fns"; // Import date-fns for formatting
import axios from "axios";

const Reschedule = ({ appointmentId, open, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `https://backend-vp67.onrender.com/Appointments/api/get-appointments`,
          {
            params: {
              date: selectedDate.toISOString().split("T")[0],
            },
          }
        );
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const checkTimeConflict = async (newTime) => {
    const formattedTime = `${newTime}`; // Already in "HH:mm AM/PM" format
    try {
      const response = await axios.get(
        `https://backend-vp67.onrender.com/Appointments/api/check-time`,
        {
          params: {
            date: selectedDate.toISOString().split("T")[0],
            time: formattedTime,
          },
        }
      );
      return response.data.conflict; // Assuming the API response has a 'conflict' field
    } catch (error) {
      console.error("Error checking time conflict:", error);
      return true; // Default to conflict on error to prevent scheduling
    }
  };

  const handleSubmit = async () => {
    const conflictExists = await checkTimeConflict(selectedTime);

    if (conflictExists) {
      Swal.fire({
        icon: "error",
        title: "Time Conflict",
        text: "This time slot is already taken for the selected day.",
      });
      return;
    }

    try {
      await reqRescheduleAppointment(
        appointmentId,
        selectedDate.toISOString().split("T")[0],
        selectedTime
      );
      Swal.fire({
        icon: "success",
        title: "Appointment Rescheduled",
        text: "Your appointment has been successfully rescheduled.",
      });
      onClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to reschedule appointment.",
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Reschedule Appointment</DialogTitle>
      <DialogContent>
        <Calendar onChange={handleDateChange} value={selectedDate} />
        <p className="mt-4 text-center text-lg">
          Selected Date: {format(selectedDate, "MMMM d, yyyy")}
        </p>
        <CustomTimePicker
          initialStartTime={selectedTime}
          onTimeChange={handleTimeChange}
          selectedDate={selectedDate.toISOString().split("T")[0]}
          showSaveButton={false}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Confirm Reschedule
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Reschedule;
