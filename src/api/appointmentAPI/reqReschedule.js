import axios from "axios";

export const reqRescheduleAppointment = async (
  appointmentId,
  newDate,
  newTime
) => {
  try {
    const response = await axios.put(
      `https://backend-vp67.onrender.com/Appointments/api/${appointmentId}/reqReschedule`,
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
    console.error("Error requesting reschedule appointment:", error);

    // Handle axios error with detailed response
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to request reschedule appointment.");
    }
  }
};
