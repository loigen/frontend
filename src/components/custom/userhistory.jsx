import React, { useEffect, useState } from "react";
import { fetchAppointmentsByUserId } from "../../api/appointmentAPI/fetchAppointmentsByUserId"; // Update with the actual path
import {
  CircularProgress,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import LoadingSpinner from "./LoadingSpinner";
import dayjs from "dayjs";

const UserAppointments = ({ userId }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await fetchAppointmentsByUserId(userId);
        setAppointments(data);
      } catch (err) {
        setError("Failed to fetch appointments. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [userId]);

  if (loading) {
    <LoadingSpinner />;
  }

  if (error) {
    return (
      <Typography variant="body1" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        My Appointments
      </Typography>
      {appointments.length === 0 ? (
        <Typography>No appointments found.</Typography>
      ) : (
        <List>
          {appointments.map((appointment) => (
            <ListItem
              key={appointment.id}
              sx={{ borderBottom: "1px solid #ccc" }}
            >
              <ListItemText
                primary={
                  <Typography variant="subtitle1">
                    {appointment.title}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">
                      Schedule : {dayjs(appointment.date).format("MMM D, YYYY")}
                      <span>, </span>
                      {appointment.time}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status: {appointment.status}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Appointment Type:{" "}
                      {appointment.appointmentType || "No additional details."}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default UserAppointments;
