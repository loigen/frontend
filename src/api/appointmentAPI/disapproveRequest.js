import axios from "axios";

export const disapproveRescheduleRequest = async (appointmentId) => {
  try {
    const response = await axios.put(
      `https://backend-vp67.onrender.com/Appointments/api/${appointmentId}/disapprove`
    );

    return response.data;
  } catch (error) {
    console.error("Error disapproving reschedule request:", error);

    // Handle axios error with detailed response
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to disapprove reschedule request.");
    }
  }
};
