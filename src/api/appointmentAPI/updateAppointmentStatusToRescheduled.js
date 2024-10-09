import axios from "axios";

export const updateAppointmentStatusToRescheduled = async (appointmentId) => {
  try {
    const response = await axios.patch(
      `https://backend-production-c8da.up.railway.app/Appointments/api/${appointmentId}/update-status-rescheduled`
    );

    return response.data;
  } catch (error) {
    console.error("Error updating appointment status to rescheduled:", error);

    // Handle axios error with detailed response
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to update appointment status to rescheduled.");
    }
  }
};
