import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import Swal from "sweetalert2";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { format } from "date-fns"; // Import date-fns for formatting
import { Box, Skeleton, Typography } from "@mui/material";
import axios from "axios";
import { fetchAvailableSlots } from "../../api/schedulesAPI/fetchAvailableSlots";
import { rescheduleAppointment } from "../../api/appointmentAPI/rescheduleAppointment";

const Reschedule = ({ appointmentId, open, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    loadAvailableSlots();
  }, []);

  const loadAvailableSlots = async () => {
    try {
      const slots = await fetchAvailableSlots();
      setAvailableSlots(slots);
    } catch (error) {
      console.error("Error loading available slots:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null); // Reset selected slot when date changes
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot.time);
  };

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

  const handleRescheduleAppointment = async () => {
    if (!selectedSlot) return;

    try {
      await rescheduleAppointment(appointmentId, selectedDate, selectedSlot);
      Swal.fire("Success!", "Appointment rescheduled.", "success");
      onClose(); // Close the dialog after successful reschedule
    } catch (error) {
      Swal.fire("Error!", "Failed to reschedule appointment.", "error");
      console.error("Error rescheduling appointment:", error);
    }
  };

  const getAvailableSlotsForSelectedDate = () => {
    const selectedDateStr = selectedDate.toLocaleDateString();
    return availableSlots.filter(
      (slot) => new Date(slot.date).toLocaleDateString() === selectedDateStr
    );
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select your preferred schedule</DialogTitle>
      <DialogContent>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          minDate={new Date()}
          className="custom-calendar bg-transparent"
        />
        <Typography variant="body2" align="center" mt={2}>
          Selected Date: {format(selectedDate, "MMMM d, yyyy")}
        </Typography>
        <Typography variant="body2" mt={2}>
          Available Time Slots
        </Typography>
        <Box mt={2}>
          {loading ? (
            <Skeleton />
          ) : getAvailableSlotsForSelectedDate().length === 0 ? (
            <Typography
              variant="body2"
              sx={{ textAlign: "center", color: "#888" }}
            >
              No available slots for the selected date.
            </Typography>
          ) : (
            getAvailableSlotsForSelectedDate().map((slot) => (
              <Button
                key={slot._id}
                variant={selectedSlot === slot.time ? "contained" : "outlined"}
                onClick={() => handleSlotClick(slot)}
                sx={{
                  margin: "5px",
                  backgroundColor:
                    selectedSlot === slot.time ? "#2c6975" : "inherit",
                  color: selectedSlot === slot.time ? "#fff" : "inherit",
                }}
              >
                {slot.time}
              </Button>
            ))
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleRescheduleAppointment}
          disabled={!selectedSlot}
          sx={{
            backgroundColor: selectedSlot ? "#2c6975" : "gray",
            color: selectedSlot ? "white" : "",
          }}
        >
          Confirm Reschedule
        </Button>
        <Button variant="outlined" onClick={onClose} sx={{ color: "#4a8e8b" }}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Reschedule;
