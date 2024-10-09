import { data } from "autoprefixer";
import axios from "axios";

export const rescheduleAppointment = async (
  appointmentId,
  newDate,
  newTime
) => {
  try {
    console.log("Appointment ID:", appointmentId); // Debugging line
    console.log("New Date:", newDate); // Debugging line
    console.log("New Time:", newTime); // Debugging line

    const response = await axios.put(
      `https://backend-production-c8da.up.railway.app/Appointments/api/${appointmentId}/reschedule`,
      {
        newDate,
        newTime,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error rescheduling appointment:", error);

    // Handle axios error with detailed response
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to reschedule appointment.");
    }
  }
};
